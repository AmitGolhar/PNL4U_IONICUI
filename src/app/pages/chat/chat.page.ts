import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild('content', { static: false }) content!: IonContent;

  conversationId!: number;
  currentUserId!: any;
  username = '';

  messages: any[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService
  ) {}

  ngOnInit() {
    this.conversationId = Number(this.route.snapshot.paramMap.get('id'));
    this.currentUserId = Number(localStorage.getItem('userId'));

    this.chatService.connect(this.conversationId);

    this.chatService.liveMessage$.subscribe((msg) => {
      if (!msg) return;
      this.messages.push(msg);

      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    });

    this.loadMessages(); // initial load
  }

  ionViewWillLeave() {
    this.chatService.disconnect();
  }

 async reconnectSocket() {
  console.log("🔄 Reconnecting WebSocket...");

  try {
    await this.chatService.disconnectFully();   // <-- Important
    setTimeout(() => {
       this.chatService.connect(this.conversationId); // <-- Fresh connection
      this.loadMessages();
      console.log("🔌 Reconnected!");
    }, 200); // give time to close
  } catch (err) {
    console.error("Reconnect failed:", err);
  }
}



  loadMessages() {
    this.chatService.getMessages(this.conversationId).subscribe((res: any) => {
      this.messages = Array.isArray(res) ? res : res.messages || [];
      setTimeout(() => this.scrollToBottom(), 150);
    });
  }

  send() {
    if (!this.newMessage.trim()) return;

    const dto = {
      conversationId: this.conversationId,
      senderId: this.currentUserId,
      senderName: this.username,
      message: this.newMessage,
      sentAt: new Date().toISOString() 
    };

    this.chatService.sendMessage(dto).subscribe((saved: any) => {
      this.messages.push(saved);
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 100);
    });
  }

  scrollToBottom() {
    if (this.content) {
      this.content.scrollToBottom(200);
    }
  }
}
