import { AfterViewInit, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
 
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {
  selectedSegment: 'trending' | 'nearby' = 'trending';

  bannerSlideOpts = {
    slidesPerView: 1,
    loop: true,
    autoplay: { delay: 4000 },
    speed: 800,
  };

  // Same data as before (shortened here)
  featuredEvents = [
    {
      title: 'Halloween Bash 2025',
      location: 'Sky Lounge, Mumbai',
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800',
      countdown: new Date(new Date().getTime() + 5 * 60 * 60 * 1000),
    },
    {
      title: 'Neon Glow Night',
      location: 'Basement Club, Pune',
      img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
      countdown: new Date(new Date().getTime() + 48 * 60 * 60 * 1000),
    },
  ];

  events = [
    { title: 'Bollywood Night', location: 'Bandra', price: 'Free Entry', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', popularity: 120 },
    { title: 'Techno After Dark', location: 'Parel', price: '₹999', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800', popularity: 85 },
    { title: 'Ladies Night', location: 'Andheri', price: 'Free Entry', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800', popularity: 200 },
  ];

  nearbyEvents = [
    { title: 'Rooftop EDM', location: 'Lower Parel', distance: 3, vibe: 'EDM, Chill', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800' },
    { title: 'Salsa Night', location: 'Bandra', distance: 2, vibe: 'Live Band', img: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=800' },
  ];

  offers = [
    { title: 'Free Entry Friday', details: 'Entry free before 11 PM', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800' },
    { title: 'Happy Hour', details: '50% off cocktails 7–9 PM', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800' },
  ];

  djs = [
    { name: 'DJ A', nextEvent: 'Glow Party, Oct 31', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800' },
    { name: 'DJ B', nextEvent: 'Neon Night Bash, Nov 5', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800' },
  ];

  socialPosts = [
    { img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800', likes: 120, comments: 15 },
    { img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=800', likes: 85, comments: 8 },
  ];

  vipRewards = [
    { title: 'VIP Access', points: 500 },
    { title: 'Priority Table', points: 300 },
  ];

  interactiveActions = ['Vote Party', 'Share Event', 'Scan QR'];

  constructor(private modalCtrl: ModalController) {}

  ngAfterViewInit() {}

  async openBookingModal(event: any, type: 'GUESTLIST' | 'TABLE') {
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { event, bookingType: type },
      cssClass: 'booking-modal',
      mode: 'ios',
    });
    await modal.present();
  }
}
