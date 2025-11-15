import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-event-filters',
  templateUrl: './event-filters.component.html',
  styleUrls: ['./event-filters.component.scss']
})
export class EventFiltersComponent {
  @Output() filterChanged = new EventEmitter<any>();

  activeSelect: string | null = null;
  selected: any = {};

  // 🔹 Define filters centrally
  filterList = [
    { key: 'category', label: 'Category', icon: 'shapes-outline' },
    { key: 'genre', label: 'Genre', icon: 'musical-notes-outline' },
    { key: 'crowdType', label: 'Crowd', icon: 'people-outline' },
    { key: 'dressCode', label: 'Dress', icon: 'color-palette-outline' },
    { key: 'eventType', label: 'Type', icon: 'cash-outline' },
  ];

  // Dummy data (replace with your API data)
  categories = [
    { label: 'Nightclub', value: 'nightclub' },
    { label: 'Bar', value: 'bar' },
    { label: 'Lounge', value: 'lounge' }
  ];
  genres = [
    { label: 'EDM', value: 'edm' },
    { label: 'Bollywood', value: 'bollywood' },
    { label: 'Techno', value: 'techno' }
  ];
  crowdTypes = [
    { label: 'Students', value: 'students' },
    { label: 'Ladies', value: 'ladies' },
    { label: 'Corporate', value: 'corporate' }
  ];
  dressCodes = [
    { label: 'Casual', value: 'casual' },
    { label: 'Party', value: 'party' },
    { label: 'Formal', value: 'formal' }
  ];
  eventTypes = [
    { label: 'Free Entry', value: 'free' },
    { label: 'Ticketed', value: 'ticket' },
    { label: 'VIP', value: 'vip' }
  ];

  openSelect(key: string) {
    this.activeSelect = key;
  }

  selectFilter(key: string, value: string) {
    this.selected[key] = value;
    this.activeSelect = null;
    this.filterChanged.emit(this.selected);
  }

  getOptions(key: string): any[] {
    switch (key) {
      case 'category': return this.categories;
      case 'genre': return this.genres;
      case 'crowdType': return this.crowdTypes;
      case 'dressCode': return this.dressCodes;
      case 'eventType': return this.eventTypes;
      default: return [];
    }
  }
}
