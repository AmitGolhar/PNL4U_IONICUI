import { Component } from '@angular/core';
import { IonHeader } from "@ionic/angular/standalone";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {

  selectedSegment = 'trending';
// Horizontal slider options for influencers
influencerSlideOpts = {
  slidesPerView: 1.2,
  spaceBetween: 15,
  freeMode: true,
  grabCursor: true,
  loop: false
};

  banners = [
    'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=900&q=60',
    'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=900&q=60'
  ];

  events = [
    { title: 'Bollywood Night at Sky Lounge', location: 'Bandra, Mumbai', price: 'Free Entry', img: 'https://picsum.photos/400/250?random=2', desc: 'Dance all night to Bollywood hits with amazing cocktails!' },
    { title: 'Techno After Dark', location: 'Basement Club, Parel', price: '₹999', img: 'https://picsum.photos/400/250?random=2', desc: 'Experience a high-energy techno night with top DJs.' },
    { title: 'Ladies Night Special', location: 'Vibe Bar, Andheri', price: 'Free Entry Before 10 PM', img: 'https://picsum.photos/400/250?random=2', desc: 'Free drinks for ladies and amazing dance vibes!' }
  ];

influencerEvents = [
  {
    title: 'Glow Party with DJ A',
    location: 'Sky Lounge, Mumbai',
    date: 'Oct 31, 2025',
    time: '9 PM - 2 AM',
    price: '₹999',
    desc: 'Exclusive influencer hosted event. Dance with your favorite DJ!',
    img: 'https://picsum.photos/400/250?random=2'
  },
  {
    title: 'Neon Night Bash',
    location: 'Basement Club, Pune',
    date: 'Nov 5, 2025',
    time: '8 PM - 1 AM',
    price: '₹799',
    desc: 'Dance with your favorite influencers and enjoy neon lights!',
    img: 'https://picsum.photos/400/250?random=2'
  },
  {
    title: 'VIP Ladies Night',
    location: 'Vibe Bar, Bangalore',
    date: 'Nov 12, 2025',
    time: '7 PM - 12 AM',
    price: 'Free Entry Before 10 PM',
    desc: 'Special influencer promotions. VIP entry for early guests!',
    img: 'https://picsum.photos/400/250?random=2'
  },
    {
    title: 'Glow Party with DJ A',
    location: 'Sky Lounge, Pue',
    date: 'Oct 31, 2025',
    time: '9 PM - 2 AM',
    price: '₹99',
    desc: 'Exclusive influencer hosted event. Dance with your favorite DJ!',
    img: 'https://picsum.photos/400/250?random=2'
  },
  {
    title: 'Neon Night Bash',
    location: 'Basement Club, Pune',
    date: 'Nov 5, 2025',
    time: '8 PM - 1 AM',
    price: '₹599',
    desc: 'Dance with your favorite influencers and enjoy neon lights!',
    img: 'https://picsum.photos/400/250?random=2'
  },
  {
    title: 'Ladies Night',
    location: 'Vibe Bar, Pune',
    date: 'Nov 12, 2025',
    time: '7 PM - 12 AM',
    price: 'Free Entry Before 10:30 PM',
    desc: 'Special influencer promotions. VIP entry for early guests!',
    img: 'https://picsum.photos/400/250?random=2'
  }
];

  nearbyEvents = [
    { title: 'Neon Party Downtown', location: 'Colaba, Mumbai', img: 'https://picsum.photos/200/200?random=8', desc: 'Glow in neon lights and party all night.' },
    { title: 'Rooftop EDM', location: 'Lower Parel', img: 'https://picsum.photos/200/200?random=8', desc: 'EDM beats on the rooftop with city view.' },
    { title: 'Salsa Night', location: 'Bandra West', img: 'https://picsum.photos/200/200?random=8', desc: 'Learn salsa moves with live band music.' }
  ];

  constructor() {}
}
