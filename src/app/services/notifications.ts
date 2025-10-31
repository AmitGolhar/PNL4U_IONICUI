import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { NotificationMaster } from '../models/notification.model';
 
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private dummyNotifications: NotificationMaster[] = [
    {
      id: 1,
      userId: 101,
      title: '🎉 New Offer Available!',
      message: 'Get 25% off on entry at Club Infinity this weekend.',
      type: 'OFFER',
      isRead: false,
      createdAt: new Date(Date.now() - 60 * 60 * 1000),
      icon: 'gift-outline',
      actionLink: '/offers',
      scope: 'USER'
    },
    {
      id: 2,
      userId: 101,
      title: '📅 Event Reminder',
      message: 'Tonight: DJ Marshmello Live at PNL4U Club — 9PM onwards!',
      type: 'EVENT',
      isRead: false,
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      icon: 'calendar-outline',
      actionLink: '/events',
      scope: 'USER'
    },
    {
      id: 3,
      userId: 500,
      title: '✅ Offer Approved',
      message: 'Your “Ladies Night Special” offer was approved successfully.',
      type: 'APPROVAL',
      isRead: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      icon: 'checkmark-circle-outline',
      scope: 'CLUBADMIN'
    },
    {
      id: 4,
      userId: 999,
      title: '⚙️ System Update',
      message: 'Backend sync completed successfully.',
      type: 'SYSTEM',
      isRead: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      icon: 'settings-outline',
      scope: 'APPADMIN'
    }
  ];

  constructor() {}

  /** Get notifications for specific user */
  getUserNotifications(userId: number): Observable<NotificationMaster[]> {
    const filtered = this.dummyNotifications.filter(n => n.userId === userId || n.scope === 'APPADMIN');
    return of(filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
  }

  /** Mark notification as read */
  markAsRead(id: number): Observable<NotificationMaster[]> {
    const notif = this.dummyNotifications.find(n => n.id === id);
    if (notif) notif.isRead = true;
    return of(this.dummyNotifications);
  }

  /** Simulate sending notification (for APPADMIN or CLUBADMIN) */
  sendNotification(notification: NotificationMaster): Observable<NotificationMaster> {
    const newNotif = {
      ...notification,
      id: this.dummyNotifications.length + 1,
      createdAt: new Date(),
      isRead: false
    };
    this.dummyNotifications.unshift(newNotif);
    console.log('🔔 Sent notification:', newNotif);
    return of(newNotif);
  }
}
