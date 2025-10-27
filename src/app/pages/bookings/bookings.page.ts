import { Component } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone:false
})
export class BookingsPage {
bookings = [
  { 
    event: 'Party Night', 
    club: 'Club Neon', 
    date: '27 Oct 2025', 
    type: 'Guestlist', 
    status: 'Confirmed', 
  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=80&w=80', 
      qr: 'QR1' 
  },
  { 
    event: 'Live DJ', 
    club: 'Sky Lounge', 
    date: '30 Oct 2025', 
    type: 'Table', 
    status: 'Pending', 
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=80&w=80', 
    qr: 'QR2' 
  },
  { 
    event: 'Ladies Night', 
    club: 'The Velvet Room', 
    date: '31 Oct 2025', 
    type: 'Ticket', 
    status: 'Cancelled', 
  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=80&w=80', 
    qr: 'QR3' 
  },
  { 
    event: 'Techno Night', 
    club: 'Pulse Club', 
    date: '1 Nov 2025', 
    type: 'Guestlist', 
    status: 'Confirmed', 
  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=80&w=80', 
    qr: 'QR4' 
  },
  { 
    event: 'Bollywood Bash', 
    club: 'Mirage Lounge', 
    date: '2 Nov 2025', 
    type: 'Ticket', 
    status: 'Pending', 
  image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?crop=entropy&cs=tinysrgb&fit=crop&h=80&w=80', 
    qr: 'QR5' 
  }
];

}
