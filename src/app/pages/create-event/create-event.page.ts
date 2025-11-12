import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import {
  EVENT_CATEGORIES,
  EVENT_CROWD_TYPES,
  EVENT_DRESS_CODES,
  EVENT_GENRES,
  EVENT_SUBCATEGORIES,
  EVENT_TYPES,
} from 'src/app/constants/event.constants';
import { ClubService } from 'src/app/services/club.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage implements OnInit {
  eventForm!: FormGroup;
  submitting = false;
  flyerFile: File | null = null;
  flyerPreview: string | ArrayBuffer | null = null;
  clubId!: number;
  eventCategories = EVENT_CATEGORIES;
  eventSubCategories = EVENT_SUBCATEGORIES;
  eventGenres = EVENT_GENRES;
  eventCrowdTypes = EVENT_CROWD_TYPES;
  eventDressCodes = EVENT_DRESS_CODES;
  eventTypes = EVENT_TYPES;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private eventService: EventService,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.initForm();

    // ✅ Get clubId from localStorage
    const storedClubId = localStorage.getItem('clubId');
    if (storedClubId) {
      this.clubId = Number(storedClubId);
      this.eventForm.patchValue({ clubId: this.clubId });
      this.loadClubInfo(this.clubId);
    } else {
      this.showToast('No Club ID found in localStorage ⚠️', 'warning');
    }
  }

  initForm() {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // yyyy-MM-dd format

    this.eventForm = this.fb.group({
      clubId: [this.clubId, Validators.required],
      eventName: ['', Validators.required],
      category: ['Party,Concert,Live Show,Ladies Night,Techno Night,Open Mic'],
      subCategory: ['Bollywood'],
      genre: ['EDM,Bollywood,Techno,Hip-Hop,House,Pop'],
      tags: [
        'Dance,Fun,Weekend,Live DJ,Neon Lights,Bar Night,Unlimited Drinks',
      ],
      locationCity: [''],
      venueName: [''],
      startDate: [formattedDate],
      endDate: [formattedDate],
      startTime: ['20:00'],
      duration: ['5 hours'],
      description: [
        'Join us for a high-energy weekend party with the best DJs in town. Enjoy Bollywood... 🍸💃🕺',
      ],
      artistName: [''],
      eventType: ['FREE'],
      bannerType: ['NORMAL'],
      isFreeEntry: [false],
      isTonight: [false],
      isWeekend: [false],
      hasOffers: [false],
      offers: ['🍻'],
      crowdType: ['Luxury,Corporate,Young Professionals,Students'],
      entryPolicy: [''],
      dressCode: ['Smart Casuals,Trendy Outfits,Which Best Fit For You'],
      refundPolicy: ['Tickets are non-refundable'],
      kidsFriendly: ['No'],
      petsFriendly: ['No'],
      indoorOrOutdoor: ['Indoor'],
      latitude: [''],
      longitude: [''],
      tickets: this.fb.array([]),
    });
  }

  // ✅ Fetch club info from backend and auto-fill form fields
  loadClubInfo(clubId: number) {
    this.clubService.getClubInfoById(clubId).subscribe({
      next: (club) => {
        if (club) {
          this.eventForm.patchValue({
            locationCity: club.city || '',
            venueName: club.clubName || '',
            latitude: club.latitude || '',
            longitude: club.longitude || '',
          });
          this.showToast(`Club info synced for ${club.clubName} ✅`, 'success');
        }
      },
      error: (err) => {
        console.error('Error fetching club info:', err);
        this.showToast('Failed to fetch club info', 'danger');
      },
    });
  }

  get tickets(): FormArray {
    return this.eventForm.get('tickets') as FormArray;
  }

  addTicket() {
    this.tickets.push(
      this.fb.group({
        name: ['Regular', Validators.required],
        price: [0, Validators.required],
        quantity: [0, Validators.required],
      })
    );
  }

  removeTicket(i: number) {
    this.tickets.removeAt(i);
  }

  onFlyerSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const maxSizeMB = 2;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    // ✅ Check file size
    if (file.size > maxSizeBytes) {
      this.showToast(
        `File too large! Max allowed size is ${maxSizeMB} MB.`,
        'danger'
      );
      event.target.value = ''; // clear file input
      this.flyerFile = null;
      this.flyerPreview = null;
      return;
    }

    // ✅ Optional: check file type
    if (!file.type.startsWith('image/')) {
      this.showToast('Invalid file type! Please upload an image.', 'danger');
      event.target.value = '';
      this.flyerFile = null;
      this.flyerPreview = null;
      return;
    }

    // ✅ All good → store and preview
    this.flyerFile = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.flyerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeFlyer() {
    this.flyerFile = null;
    this.flyerPreview = null;
  }

  triggerFlyerUpload() {
    const input = document.getElementById('flyerUpload') as HTMLInputElement;
    input?.click();
  }

  async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      color,
      duration: 2000,
    });
    toast.present();
  }

  async submitEvent() {
    if (this.eventForm.invalid) {
      this.showToast('Please fill all required fields!', 'danger');
      return;
    }

    this.submitting = true;

    // ✅ Clone the current form value
    //eventCategories = EVENT_CATEGORIES;
 

    const formValue = { ...this.eventForm.value };

    // ✅ Convert multi-select arrays to comma-separated strings
    const arrayFields = ['category', 'genre', 'crowdType', 'dressCode','bannerType','subCategory','eventType'];
    arrayFields.forEach((key) => {
      if (Array.isArray(formValue[key])) {
        formValue[key] = formValue[key].join(',');
      }
    });

    // ✅ Convert startDate & endDate to proper ISO strings (backend expects LocalDateTime)
    if (formValue.startDate) {
      formValue.startDate = new Date(formValue.startDate).toISOString();
    }
    if (formValue.endDate) {
      formValue.endDate = new Date(formValue.endDate).toISOString();
    }

    // ✅ Convert the cleaned form object to JSON
    const eventJson = JSON.stringify(formValue);

    // ✅ Prepare multipart/form-data
    const formData = new FormData();
    formData.append(
      'event',
      new Blob([eventJson], { type: 'application/json' })
    );

    if (this.flyerFile) {
      formData.append('flyer', this.flyerFile, this.flyerFile.name);
    }

    // ✅ Submit to backend
    this.eventService.createEvent(formData).subscribe({
      next: async () => {
        this.submitting = false;
        this.showToast('Event created successfully 🎉', 'success');
        this.eventForm.reset();
        this.flyerFile = null;
      },
      error: async (err) => {
        this.submitting = false;
        console.error('Event creation failed:', err);
        this.showToast('Failed to create event: ' + err.message, 'danger');
      },
    });
  }

  onEventTypeChange(event: any) {
    const selectedType = event.detail.value;
    const freeEntryCtrl = this.eventForm.get('isFreeEntry');

    if (selectedType === 'PAID') {
      // 🔒 Disable Free Entry for PAID events
      freeEntryCtrl?.setValue(false);
      freeEntryCtrl?.disable({ emitEvent: false });
      // this.showToast('Free Entry disabled for paid events.', 'warning');
    } else if (selectedType === 'FREE') {
      // 🟢 Enable Free Entry automatically for FREE events
      freeEntryCtrl?.enable({ emitEvent: false });
      freeEntryCtrl?.setValue(true);
      //this.showToast('Free Entry enabled for free events.', 'success');
    } else {
      // 🟡 INVITE or other types
      freeEntryCtrl?.enable({ emitEvent: false });
      freeEntryCtrl?.setValue(false);
    }
  }
}
