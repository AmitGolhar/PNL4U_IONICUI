import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone:false
})
export class EventsPage implements OnInit {
  events = [
    {
      title: 'Bollywood Night Fever',
      club: 'Sky Lounge',
      date: 'Oct 27, 2025',
      price: 'Free Entry',
      img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Techno After Dark',
      club: 'Basement Club',
      date: 'Oct 28, 2025',
      price: '₹999',
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Ladies Night Special',
      club: 'Vibe Bar',
      date: 'Oct 29, 2025',
      price: 'Free Entry (Before 10 PM)',
      img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=60',
    },
    {
      title: 'Neon Party Vol.2',
      club: 'Club Mirage',
      date: 'Oct 31, 2025',
      price: '₹799',
      img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=800&q=60',
    },
  ];

  constructor() {}

  ngOnInit() {}
}
