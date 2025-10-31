import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  user: any = {};
  loading = true;
  editMode = false;
  editableUser: any = {};
  selectedImageFile: File | null = null;

  constructor(
    private profileService: UserProfileService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.loading = true;
    this.profileService.getMyProfile().subscribe({
      next: (res) => {
        this.user = res;
        this.editableUser = { ...res };
        this.loading = false;
      },
      error: async (err) => {
        this.loading = false;
        const msg = err.status === 401 ? 'Unauthorized. Please login again.' : 'Failed to load profile.';
        this.showToast(msg, 'danger');
        if (err.status === 401) this.router.navigate(['/login']);
      },
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  triggerFileUpload() {
    this.fileInput.nativeElement.click();
  }

  // ✅ Preview and store selected file
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editableUser.profileImageUrl = e.target.result; // preview Base64
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile() {
    const updatedUser = { ...this.editableUser };

    // ✅ Convert YYYY-MM-DD → ISO-8601 UTC
    if (updatedUser.dateOfBirth) {
      const date = new Date(updatedUser.dateOfBirth);
      if (!isNaN(date.getTime())) {
        updatedUser.dateOfBirth = date.toISOString(); // "2025-10-30T00:00:00.000Z"
      }
    }

    this.profileService.saveProfile(updatedUser).subscribe({
      next: async (res) => {
        this.user = res;
        this.editMode = false;
        this.showToast('Profile updated successfully!', 'success');
      },
      error: async (err) => {
        let msg = 'Failed to update profile.';
        if (
          err.error &&
          typeof err.error === 'string' &&
          err.error.includes('dateOfBirth')
        ) {
          msg = 'Invalid date format. Please select a valid date.';
        }
        this.showToast(msg, 'danger');
      },
    });
  }

  async deleteProfile() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Profile?',
      message: 'This action cannot be undone.',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Delete',
          handler: () => {
            this.profileService.deleteMyProfile().subscribe(() => {
              localStorage.clear();
              this.router.navigate(['/login']);
              this.showToast('Profile deleted successfully.', 'success');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  async showToast(message: string, color: string) {
    const toast = await this.toastCtrl.create({ message, duration: 2000, color });
    toast.present();
  }
}
