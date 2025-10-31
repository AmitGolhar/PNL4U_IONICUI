import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

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
export class EventDetailPage implements OnInit {
  event: EventDetail | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const eventId = this.route.snapshot.paramMap.get('id');
    this.loadEventDetails(eventId ? +eventId : 1);
  }

  loadEventDetails(id: number) {
    // Mock event details (you can replace this with API call)
    this.event = {
      id,
      title: 'PNL4U Neon Nights',
      date: '2025-11-02',
      time: '21:00',
      venue: 'Skyline Lounge, Mumbai',
      description:
        'Experience an electrifying night at PNL4U — where beats, lights, and luxury meet. Enjoy top DJs, exclusive cocktails, and a vibrant crowd.',
      image: 'assets/images/event-banner.jpg',
      entryFee: 2500,
      attendees: 180,
      bookedTables: 22,
      totalTables: 30,
      amenities: ['VIP Lounge', 'Dance Floor', 'Cocktail Bar', 'Live DJ', 'Valet Parking'],
      organizer: 'PNL4U Club Admin',
    };
  }

  getAvailability() {
    if (!this.event) return '';
    const available = this.event.totalTables - this.event.bookedTables;
    return available > 0 ? `${available} Tables Available` : 'Fully Booked';
  }
}
