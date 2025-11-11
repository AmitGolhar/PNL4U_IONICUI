import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService, ClubResponseDTO } from 'src/app/services/club.service';
import { EventResponseDTO, EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailsPage implements OnInit {
  clubId!: number;
  club?: ClubResponseDTO;
  loading = true;

  events: EventResponseDTO[] = [];

  loadingEvents = false;
  constructor(
    private route: ActivatedRoute,
    private clubService: ClubService,
    private eventService: EventService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clubId = Number(this.route.snapshot.paramMap.get('clubId'));
    this.loadClub();
    this.loadEvents();
  }

  loadClub() {
    this.loading = true;

    this.clubService.getClubById(this.clubId).subscribe({
      next: (club) => {
        this.club = club;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading club details', err);
        this.loading = false;
      },
    });
  }

  bookTable() {
    console.log('Book Table clicked');
    // open modal or navigate to booking page
  }

  bookGuestList() {
    console.log('Guest List clicked');
  }
  loadEvents() {
    this.loadingEvents = true;
    this.eventService.getUpcomingEventsByClubId(this.clubId).subscribe({
      next: (data) => {
        this.events = data;
        this.loadingEvents = false;
      },
      error: (err) => {
        console.error('Error loading events', err);
        this.loadingEvents = false;
      },
    });
  }

  formatDateTime(dateStr: string): string {
    return new Date(dateStr).toLocaleString('en-IN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  openEventDetails(eventId: number) {
  console.log('Navigating to event details:', eventId);
  // Navigate when event detail page exists
  this.router.navigate(['tabs/event-detail', eventId]);
}
 

}
