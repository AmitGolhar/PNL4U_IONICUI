import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClubRequestService } from 'src/app/services/club-request.service';
import { ModalController, ToastController } from '@ionic/angular';
import { PackagesModalComponent } from '../packages-modal/packages-modal.component';

@Component({
  selector: 'app-club-request-form',
  templateUrl: './club-request-form.component.html',
  styleUrls: ['./club-request-form.component.scss']
})
export class ClubRequestFormComponent {

  clubForm: FormGroup;
  selectedFile: File | null = null;
  packageTypes = [
    'FREEMIUM',
    'TIERED_PRICING',
    'BUNDLE_PLAN',
    'PROMOTIONAL_PACKAGE',
    'ALL_INCLUSIVE'
  ];
/** 🌆 Major Maharashtra + Top Indian Cities */
cities = [
  // Maharashtra
  'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Kolhapur', 'Solapur',
  'Amravati', 'Sangli', 'Satara', 'Ahmednagar', 'Ratnagiri', 'Latur', 'Chandrapur',
  'Nanded', 'Wardha', 'Beed', 'Jalgaon', 'Parbhani',

  // Metro & Tier-1 Indian Cities
  'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad',
  'Indore', 'Goa', 'Surat', 'Vadodara', 'Lucknow', 'Bhopal', 'Chandigarh', 'Noida',
  'Gurugram', 'Vishakhapatnam', 'Coimbatore', 'Patna', 'Ranchi', 'Dehradun',
  'Trivandrum', 'Kochi', 'Guwahati', 'Mysuru', 'Udaipur', 'Shimla', 'Manali', 'Agra'
];

/** 🎧 Club & Venue Types */
clubTypes = [
  // Core Nightlife Venues
  'Lounge', 'Bar', 'Pub', 'Nightclub', 'Rooftop Lounge', 'Beach Club', 'Open-Air Club',
  'Poolside Lounge', 'Microbrewery', 'Brewpub',

  // Restaurant & Dining
  'Restaurant & Bar', 'Fine Dining Lounge', 'Casual Diner', 'Gastro Pub',

  // Experience & Theme Venues
  'Sports Bar', 'Music Cafe', 'Live Music Venue', 'Karaoke Bar', 'Dance Club',
  'Cocktail Lounge', 'Speakeasy Bar', 'Luxury Nightclub', 'Members Only Club',

  // Outdoor & Destination
  'Resort Club', 'Hilltop Lounge', 'Sky Lounge', 'Private Party Venue', 'Afterparty Spot'
];

  constructor(
    private fb: FormBuilder,
    private clubRequestService: ClubRequestService,
    private toastCtrl: ToastController,
      private modalCtrl: ModalController

  ) {
    this.clubForm = this.fb.group({
      clubName: ['', Validators.required],
      ownerName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      clubType: [[], Validators.required],  
      description: ['', Validators.required],
      instagramHandle: [''],
      website: [''],
      wantWebsite: ['Yes', Validators.required],
      preferredPackage: ['FREEMIUM', Validators.required]
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async onSubmit() {
    if (this.clubForm.invalid || !this.selectedFile) {
      this.showToast('Please fill all required fields and attach a photo.');
      return;
    }

    const formData = new FormData();
      Object.keys(this.clubForm.value).forEach((key) => {
      if (key === 'clubType') {
        formData.append(key, this.clubForm.value[key].join(', '));
      } else {
        formData.append(key, this.clubForm.value[key]);
      }
    });

    formData.append('photo', this.selectedFile);

    this.clubRequestService.submitClubRequest(formData).subscribe({
      next: async () => {
        await this.showToast('Your club request has been submitted successfully!');
        this.clubForm.reset();
        this.selectedFile = null;
      },
      error: async (err) => {
        console.error(err);
        await this.showToast(err.error.text);
      }
    });
  }

  private async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2500,
      position: 'bottom',
      color: 'primary'
    });
    toast.present();
  }

  async openPackagesModal() {
  const modal = await this.modalCtrl.create({
    component: PackagesModalComponent,
    cssClass: 'packages-modal'
  });
  await modal.present();
}

}
