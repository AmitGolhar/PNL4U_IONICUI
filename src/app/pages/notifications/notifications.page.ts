import { Component, OnInit } from '@angular/core';
import { NotificationMaster } from 'src/app/models/notification.model';
import { NotificationService } from 'src/app/services/notifications';
 
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss']
})
export class NotificationsPage implements OnInit {
  notifications: NotificationMaster[] = [];
  userId: number = 101; // simulate logged-in user
  userRole: 'USER' | 'CLUBADMIN' | 'APPADMIN' = 'USER';

  constructor(private notifService: NotificationService) {}

  ngOnInit() {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notifService.getUserNotifications(this.userId).subscribe(data => {
      this.notifications = data;
    });
  }

  markAsRead(id: number) {
    this.notifService.markAsRead(id).subscribe(() => this.loadNotifications());
  }

  sendAdminNotification() {
    const newNotif: NotificationMaster = {
      id: 0,
      userId: 101,
      title: '🎊 Admin Broadcast',
      message: 'Welcome to the PNL4U VIP Club experience!',
      type: 'SYSTEM',
      isRead: false,
      createdAt: new Date(),
      scope: 'USER'
    };
    this.notifService.sendNotification(newNotif).subscribe(() => this.loadNotifications());
  }
}
