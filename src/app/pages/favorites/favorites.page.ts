import { Component, OnInit } from '@angular/core';
import { Club } from 'src/app/models/club.model';
import { FavouritesService } from 'src/app/services/favourites.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  clubs: Club[] = [];
  activeTab: string = 'favourites';
  userRole: 'USER' | 'CLUBADMIN' | 'APPADMIN' = 'USER';

  constructor(private favService: FavouritesService) {}

  ngOnInit() {
    this.loadClubs();
  }

  loadClubs() {
    this.favService.getAllClubs().subscribe(data => (this.clubs = data));
  }

  toggleFavourite(id: number) {
    this.favService.toggleFavourite(id).subscribe(data => (this.clubs = data));
  }

  toggleWishlist(id: number) {
    this.favService.toggleWishlist(id).subscribe(data => (this.clubs = data));
  }

  getFilteredList(): Club[] {
    if (this.activeTab === 'favourites') return this.clubs.filter(c => c.isFavourite);
    if (this.activeTab === 'wishlist') return this.clubs.filter(c => c.isWishlisted);
    return this.clubs;
  }
}