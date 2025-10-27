import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
 
interface MenuItem {
  icon: string;
  label: string;
  route?: string;
  roles: string[]; // Roles that can see this menu
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone:false
})
export class TabsPage  {
   menuItems: MenuItem[] = [];
  userRole: string = 'APPADMIN'; 
    activePageTitle = 'Home';

  constructor(private menu: MenuController) {
      this.loadMenuItems();
  }



 loadMenuItems() {
  const allMenuItems: MenuItem[] = [
  // 🧭 Common Items
  { icon: 'home-outline', label: 'Home', route: '/home', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'calendar-outline', label: 'Events', route: '/events', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'wine-outline', label: 'Clubs', route: '/clubs', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'star-outline', label: 'My Passes / Bookings', route: '/bookings', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'person-outline', label: 'Profile', route: '/profile', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },

  { icon: 'cash-outline', label: 'Wallet & Rewards', route: '/wallet', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'notifications-outline', label: 'Notifications', route: '/notifications', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'gift-outline', label: 'Offers & Promo Codes', route: '/offers', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'people-outline', label: 'Refer & Earn', route: '/refer', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'heart-outline', label: 'Favorites / Wishlisted Clubs', route: '/favorites', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'map-outline', label: 'Change City / Location', route: '/change-city', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'call-outline', label: 'Customer Support', route: '/support', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'settings-outline', label: 'Settings', route: '/settings', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'document-text-outline', label: 'Terms & Privacy', route: '/terms', roles: ['USER','CLUBADMIN','APPADMIN'] },

  // 🍸 CLUBADMIN-only
  { icon: 'analytics-outline', label: 'Dashboard', route: '/club-dashboard', roles: ['CLUBADMIN'] },
  { icon: 'calendar-outline', label: 'Manage Events', route: '/manage-events', roles: ['CLUBADMIN'] },
  { icon: 'wine-outline', label: 'Manage Tables / Guestlists', route: '/manage-tables', roles: ['CLUBADMIN'] },
  { icon: 'cash-outline', label: 'Sales & Revenue', route: '/sales', roles: ['CLUBADMIN'] },
  { icon: 'megaphone-outline', label: 'Promotions', route: '/promotions', roles: ['CLUBADMIN'] },
  { icon: 'person-add-outline', label: 'Staff Hiring', route: '/staff-hiring', roles: ['CLUBADMIN'] },
  { icon: 'globe-outline', label: 'Influencer Promotions', route: '/influencer-promotions', roles: ['CLUBADMIN'] },
  { icon: 'camera-outline', label: 'Upload Flyers', route: '/upload-flyers', roles: ['CLUBADMIN'] },
  { icon: 'settings-outline', label: 'Venue Settings', route: '/venue-settings', roles: ['CLUBADMIN'] },

  // 🧑‍💼 APPADMIN-only
  { icon: 'business-outline', label: 'All Venues & Approvals', route: '/admin-venues', roles: ['APPADMIN'] },
  { icon: 'analytics-outline', label: 'Platform Analytics', route: '/platform-analytics', roles: ['APPADMIN'] },
  { icon: 'cash-outline', label: 'Payout Reports', route: '/payout-reports', roles: ['APPADMIN'] },
  { icon: 'star-outline', label: 'Featured / Spotlight Events', route: '/featured-events', roles: ['APPADMIN'] },
  { icon: 'construct-outline', label: 'Admin Tools', route: '/admin-tools', roles: ['APPADMIN'] },

  // 🔑 Auth & Dashboards
  { icon: 'log-in-outline', label: 'Login', route: '/login', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'speedometer-outline', label: 'Admin Dashboard', route: '/admin-dashboard', roles: ['APPADMIN'] },

  // 🎉 Detail / Job Pages
  { icon: 'calendar-outline', label: 'Event Detail', route: '/event-detail', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'business-outline', label: 'Club Detail', route: '/club-detail', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'megaphone-outline', label: 'Promoter Dashboard', route: '/promoter-dashboard', roles: ['PROMOTER'] },
  { icon: 'people-outline', label: 'Influencer Dashboard', route: '/influencer-dashboard', roles: ['INFLUENCER'] },
  { icon: 'briefcase-outline', label: 'Jobs', route: '/jobs', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'document-text-outline', label: 'Job Applications', route: '/job-applications', roles: ['USER','CLUBADMIN','APPADMIN'] },
];


  // ✅ Apply role-based filtering + tab prefixing
  this.menuItems = allMenuItems
    .filter(item => item.roles.includes(this.userRole))
    .map(item => {
      const tabRoutes = ['home', 'events', 'clubs', 'bookings', 'profile'];

      // Automatically prefix tabs with /tabs
      if (item.route && tabRoutes.includes(item.route.replace('/', ''))) {
        item.route = '/tabs' + item.route;
      }

      return item;
    });
}



   async navigate(item: any) {
 
    await this.menu.close('first'); // 'first' is your menuId
  }
   setActiveTitle(title: string) {
    this.activePageTitle = title;
  }
}
