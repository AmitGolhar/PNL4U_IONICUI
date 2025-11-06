import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
    city: '',
    genre: '',
    sortBy: 'trendingScore',
    sortOrder: 'desc',
  };

  constructor(private clubService: ClubService, private router: Router) {}

  ngOnInit() {
    this.loadClubs();
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
