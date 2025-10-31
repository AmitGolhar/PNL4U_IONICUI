import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FAQ, SupportTicket } from '../models/support.model';

@Injectable({ providedIn: 'root' })
export class SupportService {
  private faqs: FAQ[] = [
    {
      id: 1,
      question: 'How do I redeem my cashback?',
      answer:
        'Go to your wallet and tap “Redeem Cashback”. It will automatically deduct from your wallet balance.',
    },
    {
      id: 2,
      question: 'How do I reset my password?',
      answer:
        'Click on “Forgot Password” on the login screen and follow the email link sent to you.',
    },
    {
      id: 3,
      question: 'Can I contact a club directly?',
      answer:
        'Yes, visit any club profile and tap “Contact Venue” to call or message directly.',
    },
    {
      id: 4,
      question: 'How long does a ticket take to resolve?',
      answer:
        'Most issues are resolved within 24–48 hours by our support team.',
    },
  ];

  private tickets: SupportTicket[] = [];

  constructor() {}

  getFAQs(): Observable<FAQ[]> {
    return of(this.faqs);
  }

  createTicket(ticket: SupportTicket): Observable<SupportTicket> {
    const newTicket: SupportTicket = {
      ...ticket,
      id: this.tickets.length + 1,
      date: new Date(),
      status: 'Pending',
    };
    this.tickets.push(newTicket);
    return of(newTicket);
  }

  getTickets(): Observable<SupportTicket[]> {
    return of(this.tickets);
  }
}
