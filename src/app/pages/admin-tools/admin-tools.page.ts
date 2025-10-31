import { Component, OnInit } from '@angular/core';

interface AdminShortcut {
  title: string;
  icon: string;
  route: string;
  color: string;
  description: string;
}

interface AdminStat {
  label: string;
  value: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

@Component({
  selector: 'app-admin-tools',
  templateUrl: './admin-tools.page.html',
  styleUrls: ['./admin-tools.page.scss'],
})
export class AdminToolsPage implements OnInit {
  shortcuts: AdminShortcut[] = [];
  stats: AdminStat[] = [];

  ngOnInit() {
    this.shortcuts = [
      {
        title: 'Manage Events',
        icon: 'calendar-outline',
        route: '/manage-events',
        color: '#ff4da6',
        description: 'Create, edit and publish your upcoming club events.',
      },
      {
        title: 'Venue Settings',
        icon: 'business-outline',
        route: '/venue-settings',
        color: '#ffb700',
        description: 'Customize floor layout, amenities and seating capacity.',
      },
      {
        title: 'Promotions',
        icon: 'megaphone-outline',
        route: '/promotions',
        color: '#8e2de2',
        description: 'Manage global offers, influencer deals and campaigns.',
      },
      {
        title: 'Payout Report',
        icon: 'cash-outline',
        route: '/payout-report',
        color: '#00ff9d',
        description: 'Track and export financial reports and payouts.',
      },
      {
        title: 'Analytics',
        icon: 'analytics-outline',
        route: '/platform-analytics',
        color: '#00bfff',
        description: 'Monitor performance, revenue and engagement insights.',
      },
      {
        title: 'Staff Hiring',
        icon: 'people-outline',
        route: '/staff-hiring',
        color: '#ffaa00',
        description: 'Post openings and manage incoming job applications.',
      },
    ];

    this.stats = [
      { label: 'Active Events', value: 14, icon: 'sparkles-outline', trend: 'up' },
      { label: 'Total Clubs', value: 28, icon: 'home-outline', trend: 'neutral' },
      { label: 'Pending Payouts', value: 7, icon: 'cash-outline', trend: 'down' },
      { label: 'Active Users', value: 5421, icon: 'people-circle-outline', trend: 'up' },
    ];
  }

  getTrendColor(trend: 'up' | 'down' | 'neutral') {
    switch (trend) {
      case 'up':
        return '#00ff9d';
      case 'down':
        return '#ff4d4d';
      default:
        return '#ffd966';
    }
  }
}
