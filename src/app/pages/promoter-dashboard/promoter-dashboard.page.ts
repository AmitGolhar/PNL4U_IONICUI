import { Component, OnInit } from '@angular/core';

interface PromoterStats {
  totalEvents: number;
  activePromotions: number;
  totalBookings: number;
  earnings: number;
  payoutPending: number;
}

interface Activity {
  id: number;
  message: string;
  time: string;
  type: 'booking' | 'payout' | 'event';
}

interface TopEvent {
  id: number;
  title: string;
  date: string;
  conversions: number;
  revenue: number;
  image: string;
}
@Component({
  selector: 'app-promoter-dashboard',
  templateUrl: './promoter-dashboard.page.html',
  styleUrls: ['./promoter-dashboard.page.scss'],
})
export class PromoterDashboardPage implements OnInit {
  promoterName = 'Amit ';
  stats: PromoterStats = {
    totalEvents: 14,
    activePromotions: 4,
    totalBookings: 328,
    earnings: 54000,
    payoutPending: 7500,
  };

  recentActivities: Activity[] = [
    { id: 1, message: 'New booking confirmed for Neon Nights', time: '2h ago', type: 'booking' },
    { id: 2, message: 'Payout of ₹3,000 processed successfully', time: '5h ago', type: 'payout' },
    { id: 3, message: 'Promoted event “Glow Fest” reached 120 attendees', time: '1d ago', type: 'event' },
  ];

  topEvents: TopEvent[] = [
    {
      id: 1,
      title: 'Neon Nights 2.0',
      date: '2025-11-10',
      conversions: 82,
      revenue: 24000,
      image: 'assets/images/event1.jpg',
    },
    {
      id: 2,
      title: 'Glow Fest Mumbai',
      date: '2025-11-17',
      conversions: 60,
      revenue: 19000,
      image: 'assets/images/event2.jpg',
    },
    {
      id: 3,
      title: 'PNL4U Weekender',
      date: '2025-12-01',
      conversions: 45,
      revenue: 11000,
      image: 'assets/images/event3.jpg',
    },
  ];

  constructor() {}

  ngOnInit() {}

  getGreeting(): string {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    else if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  }
}

