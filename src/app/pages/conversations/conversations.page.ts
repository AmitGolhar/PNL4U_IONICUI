import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.page.html',
  styleUrls: ['./conversations.page.scss'],
})
export class ConversationsPage implements OnInit {

  currentUserId = 1; // TODO: replace with real logged-in userId
  conversations: any[] = [];
  loading = true;

  constructor(
    private chatService: ChatService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loadConversations();
  }

  loadConversations() {
    this.loading = true;
    this.chatService.getUserConversations(this.currentUserId).subscribe({
      next: (res: any[]) => {
        this.conversations = res || [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load conversations', err);
        this.loading = false;
      }
    });
  }

  openChat(conv: any) {
    this.navCtrl.navigateForward(`/tabs/chat/${conv.id}`);
  }
}
