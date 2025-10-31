export interface NotificationMaster {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'EVENT' | 'OFFER' | 'APPROVAL' | 'SYSTEM';
  isRead: boolean;
  createdAt: Date;
  actionLink?: string;
  icon?: string;
  scope?: 'USER' | 'CLUBADMIN' | 'APPADMIN';
}


