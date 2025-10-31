import { Component, OnInit } from '@angular/core';


interface SpotlightFeature {
  id: number;
  title: string;
  description: string;
  icon: string;
  image?: string;
  videoUrl?: string;
  expanded?: boolean;
}
@Component({
  selector: 'app-featured-events',
  templateUrl: './featured-events.page.html',
  styleUrls: ['./featured-events.page.scss'],
})
export class FeaturedEventsPage implements OnInit {
  features: SpotlightFeature[] = [];

  ngOnInit() {
    this.features = [
      {
        id: 1,
        title: 'Smart Table Booking',
        description:
          'Intelligent seat allocation and live availability tracking to enhance guest experience and club efficiency.',
        icon: 'calendar-outline',
        image: 'assets/images/booking-preview.jpg',
      },
      {
        id: 2,
        title: 'Influencer Dashboard',
        description:
          'Track influencer campaigns, engagement stats, and payouts — all in one sleek dashboard.',
        icon: 'sparkles-outline',
        videoUrl: 'assets/videos/influencer-demo.mp4',
      },
      {
        id: 3,
        title: 'Real-time Analytics',
        description:
          'View instant performance metrics with platform-wide insights on revenue, visitors, and campaigns.',
        icon: 'analytics-outline',
        image: 'assets/images/analytics-preview.jpg',
      },
      {
        id: 4,
        title: 'Automated Event Promotion',
        description:
          'Let the AI engine auto-promote your events across connected channels to boost audience engagement.',
        icon: 'megaphone-outline',
      },
    ];
  }

  toggleExpand(feature: SpotlightFeature) {
    feature.expanded = !feature.expanded;
  }
}
