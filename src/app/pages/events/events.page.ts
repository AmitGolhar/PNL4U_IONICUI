import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BookingModalComponent } from 'src/app/components/booking-modal/booking-modal.component';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.page.html',
  styleUrls: ['./events.page.scss'],
  standalone:false
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

  categories = ['Party',  'Ladies Night','Live Music','Comedy','Music','Food and Drink','Live DJ',];
  cities = ['Mumbai', 'Pune', 'Delhi', 'Bangalore'];
  
  filteredEvents = this.events;
  searchTerm: any;

  constructor(private eventService: EventService,private modalCtrl: ModalController) {}

  ngOnInit() {
    this.loadEvents();
  }

   loadEvents(event?: any) {
    if (this.loading) return; // prevent multiple loads
    this.loading = true;

    const params = { page: this.page, size: this.size };

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
      }
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
      size: this.size
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
 
async openBookingModal(event:any, type: 'GUESTLIST' | 'TABLE') {
   const modal = await this.modalCtrl.create({
    component: BookingModalComponent,
    componentProps: { event, bookingType: type },
    cssClass: 'booking-modal'
  });
  await modal.present();
}
 
 
}
