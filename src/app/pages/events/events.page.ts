import { Component, OnInit } from '@angular/core';
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
    // Sample categories data (This can be dynamically fetched from an API)
 

 
 /*  events = [
    { 
      id: 1, title: 'Wine Tasting Evening', club: 'The Wine Lounge', date: '2025-12-01', price: '₹1500', categoryId: 1, 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60'
    },
    { 
      id: 2, title: 'Stand-up Comedy Night', club: 'Comedy Club', date: '2025-12-05', price: '₹500', categoryId: 2, 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60'
    },
    { 
      id: 3, title: 'Jazz Music Night', club: 'Live Music Venue', date: '2025-12-10', price: '₹800', categoryId: 3, 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60'
    },
    { 
      id: 4, title: 'Rock Concert', club: 'ABC Arena', date: '2025-12-15', price: '₹1200', categoryId: 4, 
      img: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=400&auto=format&fit=crop&q=60'
    },
    { 
      id: 5, title: 'Cultural Festival', club: 'Festival Grounds', date: '2025-12-20', price: '₹1000', categoryId: 5, 
      img: 'https://images.unsplash.com/photo-1506748686211-f02acfd8b209'
    },
    { 
      id: 6, title: 'Indie Music Fest', club: 'Music Park', date: '2025-12-25', price: '₹1500', categoryId: 6, 
      img: 'https://images.unsplash.com/photo-1505685298690-118444d1669d'
    },
    { 
      id: 7, title: 'DJ Night at Club', club: 'Nightlife Zone', date: '2025-12-27', price: '₹700', categoryId: 7, 
      img: 'https://images.unsplash.com/photo-1603344777942-5c4b0b8c825b'
    },
    { 
      id: 8, title: 'Backpacking Through Europe', club: 'Travel Adventures', date: '2025-12-30', price: '₹3000', categoryId: 8, 
      img: 'https://images.unsplash.com/photo-1522101473514-3d1396a2499e'
    },
    { 
      id: 9, title: 'Creative Writing Workshop', club: 'Creative Arts Studio', date: '2025-12-02', price: '₹1200', categoryId: 9, 
      img: 'https://images.unsplash.com/photo-1582150267770-b2b49140993a'
    },
  ];
 */
  // Store the filtered events based on category selection
  filteredEvents = this.events;
  searchTerm: any;

  constructor(private eventService: EventService) {}

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
 


  
}
