import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';

import { Client } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

export interface ChatMessageDTO {
  conversationId: number;
  senderId: number;
  senderName: string;
  message: string;
  sentAt?: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private baseUrl = environment.apiUrl;
  stompClient: Client | null = null;

  private liveMessageSubject = new BehaviorSubject<any>(null);
  liveMessage$ = this.liveMessageSubject.asObservable();

  constructor(private http: HttpClient) {}

  // REST
  getMessages(conversationId: number) {
    return this.http.get<any>(
      `${this.baseUrl}/chat/conversation/${conversationId}`
    );
  }

  sendMessage(dto: ChatMessageDTO) {
    return this.http.post(`${this.baseUrl}/chat/message`, dto);
  }

  getUserConversations(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/chat/user/${userId}`);
  }

  // WEBSOCKET
  connect(conversationId: number) {
    console.log('Connecting WebSocket:', environment.serverUrl);

    const socket = new SockJS(environment.serverUrl);

    this.stompClient = new Client({
      webSocketFactory: () => socket as any,
      reconnectDelay: 3000,
      debug: () => {},
    });

    this.stompClient!.onConnect = () => {
      console.log('🔗 WebSocket Connected!');

      this.stompClient!.subscribe(
        `/topic/conversation/${conversationId}`,
        (msg) => {
          const received = JSON.parse(msg.body);
          console.log('🔥 LIVE message:', received);
          this.liveMessageSubject.next(received);
        }
      );
    };

    this.stompClient!.onStompError = (err) =>
      console.error('❌ STOMP ERROR', err);

    this.stompClient!.activate();
  }

  async disconnectFully() {
    if (this.stompClient) {
      console.log('🔌 Deactivating Stomp...');
      await this.stompClient.deactivate(); // <-- correct method
      this.stompClient = null; // <-- important
      console.log('❌ STOMP fully disconnected');
    }
  }

  disconnect() {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('❌ WebSocket disconnected');
    }
  }
}
