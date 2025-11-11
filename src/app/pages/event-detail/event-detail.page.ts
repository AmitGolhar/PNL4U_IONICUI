import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
import { EventResponseDTO, EventService } from 'src/app/services/event.service';

interface EventDetail {
  id: number;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  image: string;
  entryFee: number;
  attendees: number;
  bookedTables: number;
  totalTables: number;
  amenities: string[];
  organizer: string;
}

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage  implements OnInit {
  eventId!: number;
  event?: EventResponseDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.eventId = Number(this.route.snapshot.paramMap.get('eventId'));
    this.loadEvent();
  }

  loadEvent() {
    this.loading = true;
    this.eventService.getEventById(this.eventId).subscribe({
      next: (data) => {
        this.event = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading event details', err);
        this.loading = false;
      },
    });
  }

  formatDateTime(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  async openBookingModal(event:any, type: 'GUESTLIST' | 'TABLE') {
     console.log(event)
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { event, bookingType: type },
      cssClass: 'booking-modal'
    });
    await modal.present();
  }
   
}