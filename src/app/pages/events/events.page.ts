import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
import { EVENT_GENRES } from 'src/app/constants/event.constants';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone: false,
})
export class EventsPage implements OnInit {
  events: any[] = [];
  loading = false;
  page = 0;
  size = 3;
  totalPages = 0;
  hasMore = true;
  // 🎯 Filters
  selectedCategory: string | null = null;
  selectedCity: string | null = null;
  isWeekend = false;
  hasOffers = false;

  categories = [
    'Party',
    'Ladies Night',
    'Live Music',
    'Comedy',
    'Music',
    'Food and Drink',
    'Live DJ',
  ];

  filteredEvents = this.events;
  searchTerm: any;

  filters: any = {
    locationCity: localStorage.getItem('userCity'),
    category: '',
    genre: '',
    sortBy: '',
    sortOrder: 'desc',
  };
  cities = [
    'Mumbai',
    'Pune',
    'Nagpur',
    'Nashik',
    'Thane',
    'Aurangabad',
    'Kolhapur',
    'Solapur',
    'Amravati',
    'Sangli',
    'Satara',
    'Ahmednagar',
    'Ratnagiri',
    'Latur',
    'Chandrapur',
    'Nanded',
    'Wardha',
    'Beed',
    'Jalgaon',
    'Parbhani',
    'Delhi',
    'Bengaluru',
    'Hyderabad',
    'Chennai',
    'Kolkata',
    'Jaipur',
    'Ahmedabad',
    'Indore',
    'Goa',
    'Surat',
    'Vadodara',
    'Lucknow',
    'Bhopal',
    'Chandigarh',
    'Noida',
    'Gurugram',
    'Vishakhapatnam',
    'Coimbatore',
    'Patna',
    'Ranchi',
    'Dehradun',
    'Trivandrum',
    'Kochi',
    'Guwahati',
    'Mysuru',
    'Udaipur',
    'Shimla',
    'Manali',
    'Agra',
  ];
  clubTypes = [
    // Core Nightlife Venues
    'Lounge',
    'Bar',
    'Pub',
    'Nightclub',
    'Rooftop Lounge',
    'Beach Club',
    'Open-Air Club',
    'Poolside Lounge',
    'Microbrewery',
    'Brewpub',

    // Restaurant & Dining
    'Restaurant & Bar',
    'Fine Dining Lounge',
    'Casual Diner',
    'Gastro Pub',

    // Experience & Theme Venues
    'Sports Bar',
    'Music Cafe',
    'Live Music Venue',
    'Karaoke Bar',
    'Dance Club',
    'Cocktail Lounge',
    'Speakeasy Bar',
    'Luxury Nightclub',
    'Members Only Club',

    // Outdoor & Destination
    'Resort Club',
    'Hilltop Lounge',
    'Sky Lounge',
    'Private Party Venue',
    'Afterparty Spot',
  ];

  eventGenres = EVENT_GENRES;
 
  constructor(
    private eventService: EventService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.loadSavedCity();
    this.loadEvents();
  }


  loadSavedCity() {
  const savedCity = localStorage.getItem('userCity');
  if (savedCity) {
    this.selectedCity = savedCity;
    // Optionally, apply the filter right away
    this.applyFilters('locationCity', savedCity);
  }
}
  applyFilters(key: string, value: any) {
    this.filters[key] = value;
    this.page = 0;
    this.events = [];
    this.hasMore = true;
    this.loadEvents(); // reload with updated filters
  }

  resetFilters() {
    // Reset all filters
    this.filters = {
      locationCity: '',
      category: '',
      genre: '',
      sortBy: '',
      sortOrder: 'desc',
    };

    // Reset dropdown selections if needed
    this.selectedCategory = null;
    this.selectedCity = null;
    this.isWeekend = false;
    this.hasOffers = false;

    // Reload all events
    this.page = 0;
    this.events = [];
    this.hasMore = true;
    this.loadEvents();
  }

  loadEvents(event?: any) {
    if (this.loading) return; // prevent multiple loads
    this.loading = true;

    const params = { page: this.page, size: this.size, ...this.filters };

    this.eventService.getEvents(params).subscribe({
      next: (res) => {
        const newEvents = res.content || [];
        this.events = [...this.events, ...newEvents];
        this.totalPages = res.totalPages;
        this.hasMore = this.page < this.totalPages - 1;
        this.loading = false;

        if (event) event.target.complete();
      },
      error: (err) => {
        console.error('Error loading events:', err);
        this.loading = false;
        if (event) event.target.complete();
      },
    });
  }

  loadMore(event: any) {
    if (this.hasMore) {
      this.page++;
      this.loadEvents(event);
    } else {
      event.target.disabled = true;
    }
  }

  buildFilters() {
    return {
      category: this.selectedCategory,
      locationCity: this.selectedCity,
      isWeekend: this.isWeekend,
      hasOffers: this.hasOffers,
      page: this.page,
      size: this.size,
    };
  }

  // 🧠 Filter Toggles
  toggleCategory(cat: string) {
    this.selectedCategory = this.selectedCategory === cat ? null : cat;
    this.refresh();
  }

  toggleCity(city: string) {
    this.selectedCity = this.selectedCity === city ? null : city;
    this.refresh();
  }

  toggleWeekend() {
    this.isWeekend = !this.isWeekend;
    this.refresh();
  }

  toggleOffers() {
    this.hasOffers = !this.hasOffers;
    this.refresh();
  }

  refresh() {
    this.page = 0;
    this.events = [];
    this.hasMore = true;
    this.loadEvents();
  }

  async openBookingModal(event: any, type: 'GUESTLIST' | 'TABLE') {
    const modal = await this.modalCtrl.create({
      component: BookingModalComponent,
      componentProps: { event, bookingType: type },
      cssClass: 'booking-modal',
    });
    await modal.present();
  }
}
