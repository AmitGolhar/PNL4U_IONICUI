import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {
  @Input() event: any;
  @Input() mode: 'scroll' | 'grid' | 'banner' = 'scroll';

  // 🧠 Prevent rendering empty cards
  isValidEvent(event: any): boolean {
    if (!event) return false;
    const hasTitle = !!event.eventName && event.eventName.trim().length > 0;
    const hasImage = !!event.imagesBase64?.[0];
    const hasCity = !!event.locationCity;
    const hasGenre = !!event.genre;
    return hasTitle || hasImage || hasCity || hasGenre;
  }
}
