import { Component, OnInit } from '@angular/core';

interface ClubStat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface Event {
  id: number;
  title: string;
  date: Date;
  attendees: number;
  revenue: number;
  image: string;
}

interface Transaction {
  id: number;
  description: string;
  amount: number;
  date: Date;
  type: 'CREDIT' | 'DEBIT';
}

@Component({
  selector: 'app-club-dashboard',
  templateUrl: './club-dashboard.page.html',
  styleUrls: ['./club-dashboard.page.scss'],
})
export class ClubDashboardPage implements OnInit {
  clubName = 'Club Infinity';
  stats: ClubStat[] = [];
  events: Event[] = [];
  transactions: Transaction[] = [];
  quickActions: { icon: string; label: string; color: string; route: string }[] = [];

  ngOnInit() {
    this.stats = [
      { title: 'Total Revenue', value: '₹4.2M', icon: 'cash-outline', color: '#ffd700' },
      { title: 'This Month', value: '₹820K', icon: 'trending-up-outline', color: '#00f0ff' },
      { title: 'Active Offers', value: 5, icon: 'pricetag-outline', color: '#ff4da6' },
      { title: 'Followers', value: '3.4K', icon: 'people-outline', color: '#8e2de2' }
    ];

    this.events = [
      {
        id: 1,
        title: 'Techno Vibes Night',
        date: new Date('2025-10-28'),
        attendees: 280,
        revenue: 180000,
        image: 'https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=900&q=60'
      },
      {
        id: 2,
        title: 'Ladies Glow Party',
        date: new Date('2025-11-02'),
        attendees: 340,
        revenue: 240000,
        image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=900&q=60'
      }
    ];

    this.transactions = [
      { id: 1, description: 'Ticket Sales - Techno Night', amount: 120000, date: new Date(), type: 'CREDIT' },
      { id: 2, description: 'Referral Cashback', amount: -5000, date: new Date(), type: 'DEBIT' },
      { id: 3, description: 'Offer Redemption', amount: -2000, date: new Date(), type: 'DEBIT' },
      { id: 4, description: 'Event Sponsorship', amount: 30000, date: new Date(), type: 'CREDIT' }
    ];

    this.quickActions = [
      { icon: 'add-circle-outline', label: 'Create Offer', color: '#ff4da6', route: '/offers/create' },
      { icon: 'calendar-outline', label: 'Add Event', color: '#00f0ff', route: '/events/create' },
      { icon: 'cash-outline', label: 'View Transactions', color: '#ffd700', route: '/wallet' },
      { icon: 'people-outline', label: 'Manage Staff', color: '#8e2de2', route: '/staff' }
    ];
  }

  openAction(action: any) {
    console.log('Navigating to:', action.route);
  }
}