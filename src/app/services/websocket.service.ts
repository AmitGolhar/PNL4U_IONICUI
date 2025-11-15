import { Injectable } from '@angular/core';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/environments/environment';
import { Client, IMessage, Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private stompClient: any;
  private serverUrl = environment.serverUrl;

  connect(callback: any) {
    const socket = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(socket);
    this.stompClient.heartbeat.incoming = 10000; // expect heartbeat every 10s
    this.stompClient.heartbeat.outgoing = 10000; // send heartbeat every 10s
    
    this.stompClient.connect({}, () => {
      callback();
    });
  }

  subscribe(conversationId: number, onMessage: any) {
    this.stompClient.subscribe(`/topic/conversation/${conversationId}`, (msg: any) => {
      onMessage(JSON.parse(msg.body));
    });
  }

  sendMessage(msg: any) {
    this.stompClient.send('/app/sendMessage', {}, JSON.stringify(msg));
  }
}
