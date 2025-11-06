import { AfterViewInit, Component } from '@angular/core';
import { BookingModalComponent } from '../components/booking-modal/booking-modal.component';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements AfterViewInit{

  selectedSegment = 'trending';

  influencerSlideOpts = {
    slidesPerView: 1.2,
    spaceBetween: 10,
    freeMode: true,
    grabCursor: true,
    loop: false
  };
slideOpts = {
  initialSlide: 0,
  speed: 500,
  autoplay: {
    delay: 3000,
  },
  loop: true,
  slidesPerView: 1,
  centeredSlides: true,
};

  // 🔝 Top Banner / Featured Events
  featuredEvents = [
    { 
      title: 'Halloween Bash 2025', 
      location: 'Sky Lounge, Mumbai', 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60', 
      countdown: new Date(new Date().getTime() + 5*60*60*1000)
    },
    { 
      title: 'Neon Glow Night', 
      location: 'Basement Club, Pune', 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60', 
      countdown: new Date(new Date().getTime() + 48*60*60*1000)
    }
  ];

  // 🎉 Trending events
  events = [
    { title: 'Bollywood Night', location: 'Bandra, Mumbai', price: 'Free Entry', img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=60', desc: 'Dance all night to Bollywood hits!', popularity: 120 },
    { title: 'Techno After Dark', location: 'Basement Club, Parel', price: '₹999', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&auto=format&fit=crop&q=60', desc: 'High-energy techno night with top DJs.', popularity: 85 },
    { title: 'Ladies Night Special', location: 'Vibe Bar, Andheri', price: 'Free Entry Before 10 PM', img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&auto=format&fit=crop&q=60', desc: 'Free drinks for ladies and amazing dance vibes!', popularity: 200 }
  ];

  // 🗺 Nearby Events
  nearbyEvents = [
    { title: 'Neon Party Downtown', location: 'Colaba, Mumbai', img: 'https://images.unsplash.com/photo-1507878866276-a947ef722fee?w=400&auto=format&fit=crop&q=60', desc: 'Glow in neon lights and party all night.', distance: 2, vibe: 'EDM, Dance' },
    { title: 'Rooftop EDM', location: 'Lower Parel', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop&q=60', desc: 'EDM beats on the rooftop with city view.', distance: 4, vibe: 'EDM, Chill' },
    { title: 'Salsa Night', location: 'Bandra West', img: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?w=400&auto=format&fit=crop&q=60', desc: 'Learn salsa moves with live band music.', distance: 3, vibe: 'Live Band, Salsa' }
  ];

  // 👤 Influencer Promoted Events
  influencerEvents = [
    { title: 'Glow Party with DJ A', location: 'Sky Lounge', date: 'Oct 31, 2025', time: '9 PM - 2 AM', price: '₹999', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60' },
    { title: 'Neon Night Bash', location: 'Basement Club', date: 'Nov 5, 2025', time: '8 PM - 1 AM', price: '₹799', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60' }
  ];

  // 🛍 Exclusive Offers
  offers = [
    { title: 'Free Entry Friday', details: 'Entry free before 11 PM', img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&auto=format&fit=crop&q=60' },
    { title: 'Happy Hour Special', details: '50% off cocktails 7-9 PM', img: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&auto=format&fit=crop&q=60' },
    { title: 'VIP Upgrade', details: 'Get priority table & free drinks', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60' }
  ];

  categories = ['EDM', 'Hip-Hop', 'Live Bands', 'Ladies Night', 'College Night', 'Silent Disco', 'Rooftop', 'Poolside', 'Underground'];

  guestListEvents = [
    { title: 'Glow Party', location: 'Sky Lounge', availableSpots: 5 },
    { title: 'Neon Night Bash', location: 'Basement Club', availableSpots: 8 }
  ];

  ticketEvents = [
    { title: 'Techno After Dark', price: '₹999', status: 'Available' },
    { title: 'Bollywood Night', price: 'Free Entry', status: 'RSVP Open' }
  ];

  updates = [
    { message: 'Neon Night Bash sold out! Get tickets fast.' },
    { message: 'Glow Party: Free drinks for first 50 entries.' }
  ];

  socialPosts = [
    { img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&auto=format&fit=crop&q=60', likes: 120, comments: 15 },
    { img: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?w=400&auto=format&fit=crop&q=60', likes: 85, comments: 8 }
  ];

  djs = [
    { name: 'DJ A', img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60', nextEvent: 'Glow Party, Oct 31' },
    { name: 'DJ B', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&auto=format&fit=crop&q=60', nextEvent: 'Neon Night Bash, Nov 5' }
  ];

  filters = ['EDM', 'Hip-Hop', 'Live Band', 'Ladies Night', 'Rooftop', 'Free Entry', 'Near Me Now'];

  vipRewards = [
    { title: 'VIP Access', points: 500 },
    { title: 'Priority Table', points: 300 }
  ];

  interactiveActions = ['Vote for Next Party', 'Share Event', 'Scan QR Code'];

  safetyGuidelines = [
    'Follow age verification rules.',
    'COVID safety protocols in place.',
    'Emergency contacts available at the venue.'
  ];

  constructor(private modalCtrl: ModalController) {}


   ngAfterViewInit() {
    const container = document.querySelector('.scroll-container') as HTMLElement;
    let index = 0;
    setInterval(() => {
      index = (index + 1) % this.featuredEvents.length;
      container.scrollTo({
        left: container.offsetWidth * index,
        behavior: 'smooth'
      });
    }, 4000);
  }

async openBookingModal(event:any, type: 'GUESTLIST' | 'TABLE') {
  const modal = await this.modalCtrl.create({
    component: BookingModalComponent,
    componentProps: { event, bookingType: type },
    cssClass: 'booking-modal'
  });
  await modal.present();
}

}
