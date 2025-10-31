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

  filters: any = {
    city: '',
    genre: '',
    sortBy: 'trendingScore',
    sortOrder: 'desc',
  };
  constructor(private clubService: ClubService,private router: Router) {}

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs(filters?: any) {
    this.loading = true;
    this.clubService.getAllClubs(filters).subscribe({
      next: (data) => {
        this.clubs = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading clubs:', err);
        this.loading = false;
      },
    });
  }
  openClubDetail(clubId: number) {
this.router.navigate(['tabs/clubs/club', clubId]);
  }
  applyFilters(key: string, value: string) {
    this.filters[key] = value;
    this.loadClubs(this.filters);
  }

  onRefresh(event: any) {
    this.loadClubs();
    setTimeout(() => event.target.complete(), 1000);
  }
  bookTable(club: any) {
  console.log('Table booking clicked for:', club.clubName);
  // Navigate or open modal here later
}

bookGuestList(club: any) {
  console.log('Guest list clicked for:', club.clubName);
  // Navigate or open modal here later
}


}
