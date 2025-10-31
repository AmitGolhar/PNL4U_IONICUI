import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface ChatMessage {
  id?: number;
  sender: string;
  role: 'USER' | 'CLUBADMIN' | 'APPADMIN';
  message: string;
  timestamp?: Date;
}

interface ChatRoom {
  id: number;
  venueId: number;
  messages: ChatMessage[];
}

interface SupportTicket {
  id?: number;
  userId: number;
  subject: string;
  message: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'RESOLVED';
}

@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.page.html',
  styleUrls: ['./chat-support.page.scss'],
})
export class ChatSupportPage implements OnInit {
  currentRole: 'USER' | 'CLUBADMIN' | 'APPADMIN' = 'USER';
  venueId: number = 101;
  chatRoom: ChatRoom | null = null;
  supportTickets: SupportTicket[] = [];

  newMessage: string = '';
  newTicket: Partial<SupportTicket> = { subject: '', message: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadChat();
    if (this.currentRole === 'USER') {
      this.loadTickets();
    }
  }

  // ======== VENUE CHAT ========
  loadChat() {
    this.http.get<ChatRoom>(`/api/chat/venue/${this.venueId}`).subscribe({
      next: (data) => (this.chatRoom = data),
      error: (err) => console.error('Chat load error', err),
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    const msg: ChatMessage = {
      sender: this.currentRole,
      role: this.currentRole,
      message: this.newMessage,
      timestamp: new Date(),
    };

    this.http.post(`/api/chat/venue/${this.venueId}`, msg).subscribe({
      next: () => {
        this.chatRoom?.messages.push(msg);
        this.newMessage = '';
      },
      error: (err) => console.error('Send error', err),
    });
  }

  // ======== SUPPORT TICKET ========
  loadTickets() {
    this.http.get<SupportTicket[]>(`/api/support/ticket`).subscribe({
      next: (data) => (this.supportTickets = data),
      error: (err) => console.error('Ticket load error', err),
    });
  }

  submitTicket() {
    if (!this.newTicket.subject || !this.newTicket.message) {
      alert('Please fill all fields.');
      return;
    }

    const ticket: SupportTicket = {
      userId: 1,
      subject: this.newTicket.subject!,
      message: this.newTicket.message!,
      status: 'OPEN',
    };

    this.http.post(`/api/support/ticket`, ticket).subscribe({
      next: () => {
        alert('Support ticket submitted!');
        this.newTicket = { subject: '', message: '' };
        this.loadTickets();
      },
      error: (err) => console.error('Ticket submit error', err),
    });
  }
}
