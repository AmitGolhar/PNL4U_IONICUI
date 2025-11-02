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
  tickets: this.fb.array([])
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
        quantity: [0, Validators.required]
      })
    );
  }

  removeTicket(i: number) {
    this.tickets.removeAt(i);
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
    const payload = this.eventForm.value;

    this.eventService.createEvent(payload).subscribe({
      next: async () => {
        this.submitting = false;
        const toast = await this.toastCtrl.create({
          message: 'Event created successfully 🎉',
          color: 'success',
          duration: 2000,
        });
        toast.present();
        this.eventForm.reset();
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
