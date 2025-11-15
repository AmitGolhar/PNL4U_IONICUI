import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ChatRequest {
  id: number;
  senderId: number;
  receiverId: number;
  status: string; // PENDING, ACCEPTED
}



@Injectable({ providedIn: 'root' })
export class ChatRequestService {
      private baseUrl = environment.apiUrl;
    
  //private baseUrl = '/api/chat';

  constructor(private http: HttpClient) {}

  getPendingRequests(userId: number): Observable<ChatRequest[]> {
    return this.http.get<ChatRequest[]>(`${this.baseUrl}/chat/request/pending/${userId}`);
  }

  acceptRequest(reqId: number) {
    return this.http.post(`${this.baseUrl}/chat/request/accept/${reqId}`, {});
  }

  rejectRequest(reqId: number) {
    return this.http.post(`${this.baseUrl}/chat/request/reject/${reqId}`, {});
  }

  sendChatRequest(senderId: number, receiverId: number) {
    return this.http.post(`${this.baseUrl}/chat/request`, null, {
      params: { senderId, receiverId },
    });
  }

 

}
