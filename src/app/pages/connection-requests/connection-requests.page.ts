import { Component, OnInit } from '@angular/core';
import { ChatRequestService, ChatRequest } from '../../services/chat-request.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-connection-requests',
  templateUrl: './connection-requests.page.html',
  styleUrls: ['./connection-requests.page.scss'],
})
export class ConnectionRequestsPage implements OnInit {
  currentUserId = 1; // replace with real logged-in userId
  requests: ChatRequest[] = [];
  loading = true;

  constructor(
    private requestService: ChatRequestService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadRequests();
  }

  loadRequests() {
    this.loading = true;
    this.requestService.getPendingRequests(this.currentUserId).subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: (err) => console.error('Error loading requests', err),
    });
  }

  accept(req: ChatRequest) {
    this.requestService.acceptRequest(req.id).subscribe({
      next: (conversation: any) => {
        // redirect to chat with created conversation
        this.navCtrl.navigateForward(`/tabs/chat/${conversation.id}`);
      },
      error: (err) => console.error('Accept error', err),
    });
  }

  reject(req: ChatRequest) {
    this.requestService.rejectRequest(req.id).subscribe({
      next: () => {
        this.requests = this.requests.filter((r) => r.id !== req.id);
      },
      error: (err) => console.error('Reject error', err),
    });
  }
}
