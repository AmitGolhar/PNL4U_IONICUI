import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EVENT_GENRES } from 'src/app/constants/event.constants';
import { ClubService, ClubResponseDTO } from 'src/app/services/club.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
  standalone: false,
})
export class ClubsPage implements OnInit {
  clubs: ClubResponseDTO[] = [];
  loading = true;

  // 🧩 Pagination state
  page = 0;
  size = 3;
  totalPages = 0;
  totalItems = 0;

  filters: any = {
    city: localStorage.getItem('userCity'),
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
  selectedCity!: string;
  eventGenres = EVENT_GENRES;

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit() {
    this.loadSavedCity();
    this.loadClubs();
  }
  loadSavedCity() {
    const savedCity = localStorage.getItem('userCity');
    if (savedCity) {
      this.selectedCity = savedCity;
    }
  }
  loadClubs(filters?: any, reset: boolean = false) {
    if (reset) {
      this.page = 0;
      this.clubs = [];
    }

    this.loading = true;

    const query = {
      ...this.filters,
      ...filters,
      page: this.page,
      size: this.size,
    };

    this.clubService.getAllClubs(query).subscribe({
      next: (response) => {
        if (this.page === 0) {
          this.clubs = response.clubs;
        } else {
          this.clubs = [...this.clubs, ...response.clubs]; // append for infinite scroll
        }

        this.totalPages = response.totalPages;
        this.totalItems = response.totalItems;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
        this.loading = false;
      },
    });
  }

  // 🔹 When filter changes
  applyFilters(key: string, value: string) {
    this.filters[key] = value;
    this.loadClubs(this.filters, true); // reset pagination
  }

  // 🔹 Navigate to detail page
  openClubDetail(clubId: number) {
    this.router.navigate(['tabs/clubs/club', clubId]);
  }

  // 🔹 Pull-to-refresh
  onRefresh(event: any) {
    this.loadClubs(this.filters, true);
    setTimeout(() => event.target.complete(), 1000);
  }

  // 🔹 Load next page (infinite scroll or “Load More” button)
  loadMore(event?: any) {
    if (this.page + 1 < this.totalPages) {
      this.page++;
      this.loadClubs(this.filters);
    }
    if (event) event.target.complete();
  }

  // 🔹 Optional: buttons for “Book Table / Guest List”
  bookTable(club: any) {
    console.log('Table booking clicked for:', club.clubName);
  }

  bookGuestList(club: any) {
    console.log('Guest list clicked for:', club.clubName);
  }
}
