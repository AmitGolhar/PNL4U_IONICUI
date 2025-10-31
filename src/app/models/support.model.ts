export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface SupportTicket {
  id: number;
  subject: string;
  message: string;
  date: Date;
  status: 'Open' | 'Resolved' | 'Pending';
}
