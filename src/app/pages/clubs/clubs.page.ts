import { Component } from '@angular/core';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.page.html',
  styleUrls: ['./clubs.page.scss'],
  standalone:false
})
export class ClubsPage {
  viewMode: 'list' | 'map' = 'list';

  clubs = [
    {
      name: 'Sky Lounge',
      rating: 4.8,
      genre: 'Bollywood • Rooftop',
      location: 'Bandra, Mumbai',
      offers: 'Happy Hours 6–9 PM',
      img: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Basement Club',
      rating: 4.6,
      genre: 'Techno • Underground',
      location: 'Lower Parel',
      offers: 'Free Entry Before 10 PM',
      img: 'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Vibe Bar & Kitchen',
      rating: 4.5,
      genre: 'Live DJ • Chill',
      location: 'Andheri West',
      offers: '2+1 on Cocktails',
      img: 'https://images.unsplash.com/photo-1543900694-133f37abaaa5?auto=format&fit=crop&w=800&q=60',
    },
    {
      name: 'Club Mirage',
      rating: 4.7,
      genre: 'EDM • VIP Zone',
      location: 'Worli, Mumbai',
      offers: 'Free Entry for Couples',
      img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=60',
    },
  ];

  toggleView() {
    this.viewMode = this.viewMode === 'list' ? 'map' : 'list';
  }
}
