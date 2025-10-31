import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'events',
        loadChildren: () => import('../pages/events/events.module').then(m => m.EventsPageModule)
      },
      {
        path: 'clubs',
        loadChildren: () => import('../pages/clubs/clubs.module').then(m => m.ClubsPageModule)
      },
      {
        path: 'bookings',
        loadChildren: () => import('../pages/bookings/bookings.module').then(m => m.BookingsPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../pages/profile/profile.module').then(m => m.ProfilePageModule)
      },


        // Non-tab pages
        { path: 'login', loadChildren: () => import('../pages/login/login.module').then(m => m.LoginPageModule) },
        { path: 'club-dashboard', loadChildren: () => import('../pages/club-dashboard/club-dashboard.module').then(m => m.ClubDashboardPageModule) },
        { path: 'admin-dashboard', loadChildren: () => import('../pages/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardPageModule) },
        { path: 'event-detail', loadChildren: () => import('../pages/event-detail/event-detail.module').then(m => m.EventDetailPageModule) },
        { path: 'club-detail', loadChildren: () => import('../pages/club-detail/club-detail.module').then(m => m.ClubDetailPageModule) },
        { path: 'promoter-dashboard', loadChildren: () => import('../pages/promoter-dashboard/promoter-dashboard.module').then(m => m.PromoterDashboardPageModule) },
        { path: 'influencer-dashboard', loadChildren: () => import('../pages/influencer-dashboard/influencer-dashboard.module').then(m => m.InfluencerDashboardPageModule) },
        { path: 'jobs', loadChildren: () => import('../pages/jobs/jobs.module').then(m => m.JobsPageModule) },
         {
          path: 'wallet',
          loadChildren: () => import('../pages/wallet/wallet.module').then( m => m.WalletPageModule)
        },
        {
          path: 'notifications',
          loadChildren: () => import('../pages/notifications/notifications.module').then( m => m.NotificationsPageModule)
        },
        {
          path: 'offers',
          loadChildren: () => import('../pages/offers/offers.module').then( m => m.OffersPageModule)
        },
        {
          path: 'refer',
          loadChildren: () => import('../pages/refer/refer.module').then( m => m.ReferPageModule)
        },
        {
          path: 'favorites',
          loadChildren: () => import('../pages/favorites/favorites.module').then( m => m.FavoritesPageModule)
        },
        {
          path: 'change-city',
          loadChildren: () => import('../pages/change-city/change-city.module').then( m => m.ChangeCityPageModule)
        },
        {
          path: 'support',
          loadChildren: () => import('../pages/support/support.module').then( m => m.SupportPageModule)
        },
        {
          path: 'settings',
          loadChildren: () => import('../pages/settings/settings.module').then( m => m.SettingsPageModule)
        },
        {
          path: 'terms',
          loadChildren: () => import('../pages/terms/terms.module').then( m => m.TermsPageModule)
        },
        {
          path: 'manage-events',
          loadChildren: () => import('../pages/manage-events/manage-events.module').then( m => m.ManageEventsPageModule)
        },
        {
          path: 'manage-tables',
          loadChildren: () => import('../pages/manage-tables/manage-tables.module').then( m => m.ManageTablesPageModule)
        },
        {
          path: 'sales',
          loadChildren: () => import('../pages/sales/sales.module').then( m => m.SalesPageModule)
        },
        {
          path: 'promotions',
          loadChildren: () => import('../pages/promotions/promotions.module').then( m => m.PromotionsPageModule)
        },
        {
          path: 'staff-hiring',
          loadChildren: () => import('../pages/staff-hiring/staff-hiring.module').then( m => m.StaffHiringPageModule)
        },
        {
          path: 'influencer-promotions',
          loadChildren: () => import('../pages/influencer-promotions/influencer-promotions.module').then( m => m.InfluencerPromotionsPageModule)
        },
        {
          path: 'upload-flyers',
          loadChildren: () => import('../pages/upload-flyers/upload-flyers.module').then( m => m.UploadFlyersPageModule)
        },
        {
          path: 'venue-settings',
          loadChildren: () => import('../pages/venue-settings/venue-settings.module').then( m => m.VenueSettingsPageModule)
        },
        {
          path: 'admin-venues',
          loadChildren: () => import('../pages/admin-venues/admin-venues.module').then( m => m.AdminVenuesPageModule)
        },
        {
          path: 'platform-analytics',
          loadChildren: () => import('../pages/platform-analytics/platform-analytics.module').then( m => m.PlatformAnalyticsPageModule)
        },
        {
          path: 'payout-reports',
          loadChildren: () => import('../pages/payout-reports/payout-reports.module').then( m => m.PayoutReportsPageModule)
        },
        {
          path: 'featured-events',
          loadChildren: () => import('../pages/featured-events/featured-events.module').then( m => m.FeaturedEventsPageModule)
        },
        {
          path: 'admin-tools',
          loadChildren: () => import('../pages/admin-tools/admin-tools.module').then( m => m.AdminToolsPageModule)
        },
        {
            path: 'chat-support',
            loadChildren: () => import('../pages/chat-support/chat-support.module').then( m => m.ChatSupportPageModule)
          },
          {
          path: 'club-request',
          loadChildren: () => import('../pages/club-request/club-request-module').then(m => m.ClubRequestModule)
        },
       

      
      // Default redirect
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Wildcard redirect (optional, prevents 404)
  { path: '**', redirectTo: 'home' },
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
