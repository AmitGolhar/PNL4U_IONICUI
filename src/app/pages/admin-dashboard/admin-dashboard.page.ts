import { Component, OnInit } from '@angular/core';

interface AdminStat {
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

interface Club {
  id: number;
  name: string;
  location: string;
  rating: number;
  followers: number;
  category: string;
  image: string;
}

interface SystemLog {
  id: number;
  message: string;
  timestamp: Date;
  type: 'INFO' | 'WARNING' | 'ERROR';
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.page.html',
  styleUrls: ['./admin-dashboard.page.scss'],
})
export class AdminDashboardPage implements OnInit {

  adminName = 'Amit';
  stats: AdminStat[] = [];
  topClubs: Club[] = [];
  systemLogs: SystemLog[] = [];
  quickActions: { icon: string; label: string; color: string; route: string }[] = [];

  ngOnInit() {
    // Dashboard stats
    this.stats = [
      { title: 'Active Users', value: '12.4K', icon: 'people-outline', color: '#00f0ff' },
      { title: 'Registered Clubs', value: 142, icon: 'business-outline', color: '#ff4da6' },
      { title: 'Total Revenue', value: '₹7.3M', icon: 'cash-outline', color: '#ffd700' },
      { title: 'Live Offers', value: 86, icon: 'pricetag-outline', color: '#8e2de2' }
    ];

    // Top clubs data
    this.topClubs = [
      {
        id: 1,
        name: 'Club Infinity',
        location: 'Bandra, Mumbai',
        rating: 4.9,
        followers: 1920,
        category: 'Luxury Lounge',
        image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 2,
        name: 'Neon Vibe',
        location: 'Khar, Mumbai',
        rating: 4.7,
        followers: 1650,
        category: 'Live Music Bar',
        image: 'https://images.unsplash.com/photo-1528701800489-20be01c0e2aa?auto=format&fit=crop&w=800&q=60'
      },
      {
        id: 3,
        name: 'Electric Dreams',
        location: 'Andheri, Mumbai',
        rating: 4.8,
        followers: 2100,
        category: 'Techno Club',
        image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?auto=format&fit=crop&w=800&q=60'
      }
    ];

    // System logs
    this.systemLogs = [
      { id: 1, message: 'User “rahul23” created an offer at Club Infinity.', timestamp: new Date(), type: 'INFO' },
      { id: 2, message: 'Revenue sync completed successfully.', timestamp: new Date(), type: 'INFO' },
      { id: 3, message: 'New club “Havana Nights” registered.', timestamp: new Date(), type: 'INFO' },
      { id: 4, message: 'System warning: High traffic detected.', timestamp: new Date(), type: 'WARNING' }
    ];

    // Admin quick actions
    this.quickActions = [
      { icon: 'add-circle-outline', label: 'Create Offer', color: '#ff4da6', route: '/offers/create' },
      { icon: 'cash-outline', label: 'Manage Wallet', color: '#ffd700', route: '/wallet' },
      { icon: 'analytics-outline', label: 'Reports', color: '#00f0ff', route: '/reports' },
      { icon: 'settings-outline', label: 'System Settings', color: '#ffffff', route: '/settings' }
    ];
  }

  openAction(action: any) {
    console.log('Navigating to:', action.route);
  }
}