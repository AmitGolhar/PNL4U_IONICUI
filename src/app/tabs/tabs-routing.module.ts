import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { RoleGuard } from '../guards/role.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('../pages/home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('../pages/events/events.module').then(
            (m) => m.EventsPageModule
          ),
      },
      {
        path: 'clubs',
        loadChildren: () =>
          import('../pages/clubs/clubs.module').then((m) => m.ClubsPageModule),
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('../pages/bookings/bookings.module').then(
            (m) => m.BookingsPageModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('../pages/profile/profile.module').then(
            (m) => m.ProfilePageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },

      // Non-tab pages
      {
        path: 'login',
        loadChildren: () =>
          import('../pages/login/login.module').then((m) => m.LoginPageModule),
      },
      {
        path: 'club-dashboard',
        loadChildren: () =>
          import('../pages/club-dashboard/club-dashboard.module').then(
            (m) => m.ClubDashboardPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'admin-dashboard',
        loadChildren: () =>
          import('../pages/admin-dashboard/admin-dashboard.module').then(
            (m) => m.AdminDashboardPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_APPADMIN'] },
      },
      {
        path: 'event-detail',
        loadChildren: () =>
          import('../pages/event-detail/event-detail.module').then(
            (m) => m.EventDetailPageModule
          ),
      },
      {
        path: 'club-detail',
        loadChildren: () =>
          import('../pages/club-detail/club-detail.module').then(
            (m) => m.ClubDetailPageModule
          ),
      },
      {
        path: 'promoter-dashboard',
        loadChildren: () =>
          import('../pages/promoter-dashboard/promoter-dashboard.module').then(
            (m) => m.PromoterDashboardPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_APPADMIN'] },
      },
      {
        path: 'influencer-dashboard',
        loadChildren: () =>
          import(
            '../pages/influencer-dashboard/influencer-dashboard.module'
          ).then((m) => m.InfluencerDashboardPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'jobs',
        loadChildren: () =>
          import('../pages/jobs/jobs.module').then((m) => m.JobsPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'wallet',
        loadChildren: () =>
          import('../pages/wallet/wallet.module').then(
            (m) => m.WalletPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('../pages/notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('../pages/offers/offers.module').then(
            (m) => m.OffersPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'refer',
        loadChildren: () =>
          import('../pages/refer/refer.module').then((m) => m.ReferPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../pages/favorites/favorites.module').then(
            (m) => m.FavoritesPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'change-city',
        loadChildren: () =>
          import('../pages/change-city/change-city.module').then(
            (m) => m.ChangeCityPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'support',
        loadChildren: () =>
          import('../pages/support/support.module').then(
            (m) => m.SupportPageModule
          ),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('../pages/settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'terms',
        loadChildren: () =>
          import('../pages/terms/terms.module').then((m) => m.TermsPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'manage-events',
        loadChildren: () =>
          import('../pages/manage-events/manage-events.module').then(
            (m) => m.ManageEventsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'manage-tables',
        loadChildren: () =>
          import('../pages/manage-tables/manage-tables.module').then(
            (m) => m.ManageTablesPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'sales',
        loadChildren: () =>
          import('../pages/sales/sales.module').then((m) => m.SalesPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'promotions',
        loadChildren: () =>
          import('../pages/promotions/promotions.module').then(
            (m) => m.PromotionsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'staff-hiring',
        loadChildren: () =>
          import('../pages/staff-hiring/staff-hiring.module').then(
            (m) => m.StaffHiringPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'influencer-promotions',
        loadChildren: () =>
          import(
            '../pages/influencer-promotions/influencer-promotions.module'
          ).then((m) => m.InfluencerPromotionsPageModule),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'upload-flyers',
        loadChildren: () =>
          import('../pages/upload-flyers/upload-flyers.module').then(
            (m) => m.UploadFlyersPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'venue-settings',
        loadChildren: () =>
          import('../pages/venue-settings/venue-settings.module').then(
            (m) => m.VenueSettingsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'admin-venues',
        loadChildren: () =>
          import('../pages/admin-venues/admin-venues.module').then(
            (m) => m.AdminVenuesPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_APPADMIN'] },
      },
      {
        path: 'platform-analytics',
        loadChildren: () =>
          import('../pages/platform-analytics/platform-analytics.module').then(
            (m) => m.PlatformAnalyticsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'payout-reports',
        loadChildren: () =>
          import('../pages/payout-reports/payout-reports.module').then(
            (m) => m.PayoutReportsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'featured-events',
        loadChildren: () =>
          import('../pages/featured-events/featured-events.module').then(
            (m) => m.FeaturedEventsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN', 'ROLE_USER'] },
      },
      {
        path: 'admin-tools',
        loadChildren: () =>
          import('../pages/admin-tools/admin-tools.module').then(
            (m) => m.AdminToolsPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_APPADMIN'] },
      },
      {
        path: 'chat-support',
        loadChildren: () =>
          import('../pages/chat-support/chat-support.module').then(
            (m) => m.ChatSupportPageModule
          ),
      },
      {
        path: 'club-request',
        loadChildren: () =>
          import('../pages/club-request/club-request-module').then(
            (m) => m.ClubRequestModule
          ),
      },
      {
        path: 'discovery',
        loadChildren: () =>
          import('../pages/discovery/discovery.module').then(
            (m) => m.DiscoveryPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_APPADMIN','ROLE_CLUBADMIN','ROLE_USER'] },
      },
      {
        path: 'create-event',
        loadChildren: () =>
          import('../pages/create-event/create-event.module').then(
            (m) => m.CreateEventPageModule
          ),
        canActivate: [RoleGuard],
        data: { roles: ['ROLE_CLUBADMIN', 'ROLE_APPADMIN'] },
      },
      {
        path: 'connection-requests',
        loadChildren: () =>
          import(
            '../pages/connection-requests/connection-requests.module'
          ).then((m) => m.ConnectionRequestsPageModule),
      },
        {
        path: 'chat/:id',
        loadChildren: () =>
          import('../pages/chat/chat.module').then(m => m.ChatPageModule)
      },
      { 
          path: 'conversations',
          loadChildren: () =>
              import('../pages/conversations/conversations.module')
                  .then((m) => m.ConversationsPageModule),
        },

      {
        path: 'unauthorized',
        loadChildren: () =>
          import('../pages/unauthorized/unauthorized.module').then(
            (m) => m.UnauthorizedPageModule
          ),
      },

      // 🧭 FALLBACK ROUTES
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: '/tabs/home' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
