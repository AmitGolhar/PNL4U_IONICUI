import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService, ClubResponseDTO } from 'src/app/services/club.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailsPage implements OnInit {

  clubId!: number;
  club?: ClubResponseDTO;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService
  ) {}

  ngOnInit() {
    this.clubId = Number(this.route.snapshot.paramMap.get('clubId'));
    this.loadClub();
  }

  loadClub() {
    this.loading = true;
    this.clubService.getAllClubs().subscribe({
      next: (clubs) => {
        this.club = clubs.find(c => c.clubId === this.clubId);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading club details', err);
        this.loading = false;
      }
    });
  }

  bookTable() {
    console.log('Book Table clicked');
    // open modal or navigate to booking page
  }

  bookGuestList() {
    console.log('Guest List clicked');
  }
}
