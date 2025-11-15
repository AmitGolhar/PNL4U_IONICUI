import { Component, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-event-section',
  templateUrl: './event-section.component.html',
  styleUrls: ['./event-section.component.scss']
})
export class EventSectionComponent implements OnChanges {
  @Input() title!: string;
  @Input() events: any[] = [];
  @Input() layout: 'banner' | 'scroll' | 'grid' = 'scroll';

  validEvents: any[] = [];

  ngOnChanges() {
    this.validEvents = (this.events || []).filter(e => this.isValidEvent(e));
  }

  isValidEvent(e: any): boolean {
    if (!e) return false;
    return !!(e.eventName || e.imagesBase64?.[0] || e.locationCity || e.genre);
  }
}
