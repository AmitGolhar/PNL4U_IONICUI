import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, AlertController } from '@ionic/angular';
import { UserProfileService } from 'src/app/services/user-profile.service';
 import { IonModal } from '@ionic/angular';
 
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  @ViewChild('galleryInput') galleryInput!: ElementRef<HTMLInputElement>;
@ViewChild('slides', { static: false }) slides!: any;
  @ViewChild('imageModal') imageModal!: IonModal;

user: any = {};
  loading = true;
  editMode = false;
  editableUser: any = {};
  selectedImageFile: File | null = null;
  selectedGalleryFiles: any[] = [];
  isModalOpen = false;
  galleryPreviewImages: string[] = [];

  constructor(
    private profileService: UserProfileService,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private router: Router
  ) {}

    // ✅ Trigger modal preview
  openPreview(img: string) {
    this.galleryPreviewImages = this.user.galleryImagesBase64 || [];
    const index = this.galleryPreviewImages.indexOf(img);
    this.isModalOpen = true;
    setTimeout(() => {
      if (index >= 0) this.slides.slideTo(index);
    }, 200);
  }

  closeModal() {
    this.isModalOpen = false;
  }

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
        const msg =
          err.status === 401
            ? 'Unauthorized. Please login again.'
            : 'Failed to load profile.';
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

  triggerGalleryUpload() {
    this.galleryInput.nativeElement.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editableUser.profileImageBase64 = e.target.result; // preview Base64
      };
      reader.readAsDataURL(file);
    }
  }

  onGallerySelected(event: any) {
    const files = Array.from(event.target.files);
    this.selectedGalleryFiles = files;
    this.editableUser.galleryImages = []; // ✅ matches backend field name

    files.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.editableUser.galleryImages.push(e.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

 removeGalleryImage(img: string) {
  this.editableUser.galleryImagesBase64 =
    this.editableUser.galleryImagesBase64.filter((i: string) => i !== img);
}

closePopover(event: any) {
  const popover = document.querySelector('ion-popover');
  if (popover) (popover as any).dismiss();
}


 

  saveProfile() {
    const updatedUser = { ...this.editableUser };

    if (updatedUser.dateOfBirth) {
      const date = new Date(updatedUser.dateOfBirth);
      if (!isNaN(date.getTime())) {
        updatedUser.dateOfBirth = date.toISOString();
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
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    toast.present();
  }
}
