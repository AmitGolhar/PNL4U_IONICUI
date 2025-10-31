import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


interface ClubDetail {
  id: number;
  name: string;
  location: string;
  city: string;
  description: string;
  image: string;
  amenities: string[];
  managerName: string;
  managerContact: string;
  totalEvents: number;
  activeEvents: number;
  rating: number;
  followers: number;
}
@Component({
  selector: 'app-club-detail',
  templateUrl: './club-detail.page.html',
  styleUrls: ['./club-detail.page.scss'],
})
export class ClubDetailPage implements OnInit {
  club: ClubDetail | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const clubId = this.route.snapshot.paramMap.get('id');
    this.loadClubDetails(clubId ? +clubId : 1);
  }

  loadClubDetails(id: number) {
    // Mock data; replace with API call later
    this.club = {
      id,
      name: 'PNL4U Lounge & Bar',
      location: '5th Avenue, Bandra West',
      city: 'Mumbai',
      description:
        'PNL4U Lounge is a premium nightlife destination offering immersive light shows, curated cocktails, and world-class DJs every weekend.',
      image: 'assets/images/club-banner.jpg',
      amenities: ['VIP Zone', 'Cocktail Bar', 'Dance Floor', 'Valet Parking', 'Outdoor Seating'],
      managerName: 'Rohit Kapoor',
      managerContact: '+91 98765 43210',
      totalEvents: 42,
      activeEvents: 5,
      rating: 4.7,
      followers: 12500,
    };
  }
}