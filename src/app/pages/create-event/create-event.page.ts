import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.page.html',
  styleUrls: ['./create-event.page.scss'],
})
export class CreateEventPage {
  eventForm!: FormGroup;
  submitting = false;
  flyerFile: File | null = null; // ✅ Store selected flyer file
  flyerPreview: string | ArrayBuffer | null = null; // ✅ Add preview variable

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private eventService: EventService
  ) {
    this.initForm();
  }

  initForm() {
    this.eventForm = this.fb.group({
      clubId: [1, Validators.required],
      eventName: ['', Validators.required],
      category: ['Party'],
      subCategory: ['Bollywood'],
      genre: ['EDM'],
      tags: [''],
      locationCity: [''],
      venueName: [''],
      startDate: [''],
      endDate: [''],
      startTime: [''],
      duration: [''],
      description: [''],
      artistName: [''],
      eventType: ['PAID'],
      bannerType: ['NORMAL'],
      isFreeEntry: [false],
      isTonight: [false],
      isWeekend: [false],
      hasOffers: [false],
      offers: [''],
      crowdType: ['Luxury'],
      entryPolicy: [''],
      dressCode: [''],
      refundPolicy: [''],
      kidsFriendly: ['No'],
      petsFriendly: ['No'],
      indoorOrOutdoor: ['Indoor'],
      latitude: [''],
      longitude: [''],
      tickets: this.fb.array([]),
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
  if (file) {
    this.flyerFile = file;

    // ✅ Generate a preview URL
    const reader = new FileReader();
    reader.onload = () => {
      this.flyerPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
removeFlyer() {
  this.flyerFile = null;
  this.flyerPreview = null;
}

  async submitEvent() {
    if (this.eventForm.invalid) {
      const toast = await this.toastCtrl.create({
        message: 'Please fill all required fields!',
        color: 'danger',
        duration: 2000,
      });
      toast.present();
      return;
    }

    this.submitting = true;

    const eventJson = JSON.stringify(this.eventForm.value); // ✅ Convert to JSON string
    const formData = new FormData();
    formData.append('event', new Blob([eventJson], { type: 'application/json' }));

    if (this.flyerFile) {
      formData.append('flyer', this.flyerFile, this.flyerFile.name);
    }

    this.eventService.createEvent(formData).subscribe({
      next: async () => {
        this.submitting = false;
        const toast = await this.toastCtrl.create({
          message: 'Event created successfully 🎉',
          color: 'success',
          duration: 2000,
        });
        toast.present();
        this.eventForm.reset();
        this.flyerFile = null;
      },
      error: async (err) => {
        this.submitting = false;
        const toast = await this.toastCtrl.create({
          message: 'Failed to create event: ' + err.message,
          color: 'danger',
          duration: 3000,
        });
        toast.present();
      },
    });
  }
}
