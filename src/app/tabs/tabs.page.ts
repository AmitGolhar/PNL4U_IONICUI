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

navigate(item: any) {
    this.menu.close(); // close menu after click
    
  }

 loadMenuItems() {
  const allMenuItems: MenuItem[] = [
  // 🧭 Common Itemshttp://localhost:8100/tabs/bookings
  { icon: 'home-outline', label: 'Home', route: '/home', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'person-outline', label: 'Profile', route: '/profile', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'log-in-outline', label: 'Login', route: '/tabs/login', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'calendar-outline', label: 'Events', route: '/tabs/events', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'wine-outline', label: 'Clubs', route: '/clubs', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'star-outline', label: 'My Passes / Bookings', route: '/tabs/bookings', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'business-outline', label: 'Add Club Request', route: '/tabs/club-request', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'calendar-outline', label: 'Create Event', route: '/tabs/create-event', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'map-outline', label: 'Change City / Location', route: '/tabs/change-city', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'calendar-outline', label: 'Club Event Detail', route: '/tabs/event-detail', roles: ['CLUBADMIN','APPADMIN'] },
  { icon: 'business-outline', label: 'Club Detail', route: '/tabs/club-detail', roles: ['CLUBADMIN','APPADMIN'] },
  { icon: 'analytics-outline', label: 'Club Admin Dashboard', route: '/tabs/club-dashboard', roles: ['CLUBADMIN','APPADMIN'] },
  { icon: 'calendar-outline', label: 'Manage Events', route: '/tabs/manage-events', roles: ['CLUBADMIN','APPADMIN'] },
  { icon: 'wine-outline', label: 'Manage Tables / Guestlists', route: '/tabs/manage-tables', roles: ['CLUBADMIN','APPADMIN'] },
  { icon: 'camera-outline', label: 'Upload Flyers', route: '/tabs/upload-flyers', roles: ['CLUBADMIN','APPADMIN'] },

  { icon: 'cash-outline', label: 'Wallet & Rewards', route: '/tabs/wallet', roles: ['USER','CLUBADMIN','APPADMIN'] },
 // { icon: 'notifications-outline', label: 'Notifications', route: '/tabs/notifications', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
 //{ icon: 'gift-outline', label: 'Offers & Promo Codes', route: '/tabs/offers', roles: ['USER','CLUBADMIN','APPADMIN'] },
  //{ icon: 'people-outline', label: 'Refer & Earn', route: '/tabs/refer', roles: ['USER','CLUBADMIN','APPADMIN'] },
  //{ icon: 'heart-outline', label: 'Favorites / Wishlisted Clubs', route: '/tabs/favorites', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'call-outline', label: 'Customer Support', route: '/tabs/support', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'settings-outline', label: 'Settings', route: '/tabs/settings', roles: ['USER','CLUBADMIN','APPADMIN'] },
  { icon: 'document-text-outline', label: 'Terms & Privacy', route: '/tabs/terms', roles: ['USER','CLUBADMIN','APPADMIN'] },


  // 🍸 CLUBADMIN-only
  //{ icon: 'analytics-outline', label: 'Club Admin Dashboard', route: '/tabs/club-dashboard', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'calendar-outline', label: 'Manage Events', route: '/tabs/manage-events', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'wine-outline', label: 'Manage Tables / Guestlists', route: '/tabs/manage-tables', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'cash-outline', label: 'Sales & Revenue', route: '/tabs/sales', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'megaphone-outline', label: 'Promotions', route: '/tabs/promotions', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'person-add-outline', label: 'Staff Hiring', route: '/tabs/staff-hiring', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'globe-outline', label: 'Influencer Promotions', route: '/tabs/influencer-promotions', roles: ['CLUBADMIN','APPADMIN'] },
  //{ icon: 'settings-outline', label: 'Venue Settings', route: '/tabs/venue-settings', roles: ['CLUBADMIN','APPADMIN'] },

  // 🧑‍💼 APPADMIN-only
  { icon: 'business-outline', label: 'All Venues & Approvals', route: '/tabs/admin-venues', roles: ['APPADMIN'] },
  //{ icon: 'analytics-outline', label: 'Platform Analytics', route: '/tabs/platform-analytics', roles: ['APPADMIN'] },
  //{ icon: 'cash-outline', label: 'Payout Reports', route: '/tabs/payout-reports', roles: ['APPADMIN'] },
  //{ icon: 'star-outline', label: 'Featured / Spotlight Events', route: '/tabs/featured-events', roles: ['APPADMIN'] },
  //{ icon: 'construct-outline', label: 'Admin Tools', route: '/tabs/admin-tools', roles: ['APPADMIN'] },

  // 🔑 Auth & Dashboards
  //{ icon: 'log-in-outline', label: 'Login', route: '/tabs/login', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  { icon: 'speedometer-outline', label: 'Admin Dashboard', route: '/tabs/admin-dashboard', roles: ['APPADMIN'] },

  // 🎉 Detail / Job Pages
  //{ icon: 'calendar-outline', label: 'Event Detail', route: '/tabs/event-detail', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER'] },
  //{ icon: 'business-outline', label: 'Club Detail', route: '/tabs/club-detail', roles: ['USER','CLUBADMIN','APPADMIN'] },
 // { icon: 'megaphone-outline', label: 'Promoter Dashboard', route: '/tabs/promoter-dashboard', roles: ['PROMOTER','APPADMIN'] },
  //{ icon: 'people-outline', label: 'Influencer Dashboard', route: '/tabs/influencer-dashboard', roles: ['INFLUENCER','APPADMIN'] },
  //{ icon: 'briefcase-outline', label: 'ChatSopprt', route: '/tabs/chat-support', roles: ['USER','CLUBADMIN','APPADMIN','PROMOTER','INFLUENCER','APPADMIN'] },

  

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



   
   setActiveTitle(title: string) {
    this.activePageTitle = title;
  }
}
