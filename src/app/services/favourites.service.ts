import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Club } from '../models/club.model';
 

@Injectable({ providedIn: 'root' })
export class FavouritesService {
 private clubs: Club[] = [
  {
    id: 1,
    name: 'Club Infinity',
    location: 'Bandra, Mumbai',
    image: 'https://images.unsplash.com/photo-1558611848-73f7eb4001a1?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    isFavourite: true,
    isWishlisted: true,
    followers: 1280,
    category: 'Premium Lounge'
  },
  {
    id: 2,
    name: 'Neon Vibe Bar',
    location: 'Khar West, Mumbai',
    image: 'https://images.unsplash.com/photo-1570211776045-2a8d113e1e0e?auto=format&fit=crop&w=1200&q=80',
    rating: 4.6,
    isFavourite: true,
    isWishlisted: true,
    followers: 980,
    category: 'Live Music'
  },
  {
    id: 3,
    name: 'Electric Dreams',
    location: 'Andheri East, Mumbai',
    image: 'https://images.unsplash.com/photo-1567593810070-4b73d86e0f7b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    isFavourite: true,
    isWishlisted: true,
    followers: 2020,
    category: 'Techno Nightclub'
  },
  {
    id: 4,
    name: 'Dreams Lounge',
    location: 'Viman Nagar, Pune',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=1200&q=80',
    rating: 4.7,
    isFavourite: false,
    isWishlisted: true,
    followers: 1640,
    category: 'Retro Bar'
  },
  {
    id: 5,
    name: 'Bassline',
    location: 'Koramangala, Bengaluru',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?auto=format&fit=crop&w=1200&q=80',
    rating: 4.5,
    isFavourite: true,
    isWishlisted: false,
    followers: 1870,
    category: 'DJ Night'
  },
  {
    id: 6,
    name: 'Skyfall Rooftop',
    location: 'Connaught Place, Delhi',
    image: 'https://images.unsplash.com/photo-1567443024551-f3e41e475b4b?auto=format&fit=crop&w=1200&q=80',
    rating: 4.8,
    isFavourite: false,
    isWishlisted: false,
    followers: 2430,
    category: 'Rooftop Bar'
  },
  {
    id: 7,
    name: 'Pulse Arena',
    location: 'Banjara Hills, Hyderabad',
    image: 'https://images.unsplash.com/photo-1570508680368-3bd35a2b4c09?auto=format&fit=crop&w=1200&q=80',
    rating: 4.9,
    isFavourite: true,
    isWishlisted: true,
    followers: 3120,
    category: 'Electronic Club'
  },
  {
    id: 8,
    name: 'Midnight Tales',
    location: 'Camp, Pune',
    image: 'https://images.unsplash.com/photo-1581417310105-9d43a7aaf9f1?auto=format&fit=crop&w=1200&q=80',
    rating: 4.4,
    isFavourite: false,
    isWishlisted: false,
    followers: 950,
    category: 'Lounge & Pub'
  }
];


  constructor() {}

  getAllClubs(): Observable<Club[]> {
    return of(this.clubs);
  }

  toggleFavourite(id: number): Observable<Club[]> {
    const club = this.clubs.find(c => c.id === id);
    if (club) club.isFavourite = !club.isFavourite;
    return of(this.clubs);
  }

  toggleWishlist(id: number): Observable<Club[]> {
    const club = this.clubs.find(c => c.id === id);
    if (club) club.isWishlisted = !club.isWishlisted;
    return of(this.clubs);
  }

  getFavourites(): Observable<Club[]> {
    return of(this.clubs.filter(c => c.isFavourite));
  }

  getWishlist(): Observable<Club[]> {
    return of(this.clubs.filter(c => c.isWishlisted));
  }
}
