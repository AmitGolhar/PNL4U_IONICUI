import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EventService {
  private baseUrl = 'http://localhost:8080/api/events';

  constructor(private http: HttpClient) {}

  createEvent(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, payload);
  }

  getEvents(filter: any = {}): Observable<any> {
    let params = new HttpParams();

    Object.keys(filter).forEach(key => {
      if (filter[key] !== null && filter[key] !== undefined && filter[key] !== '') {
        params = params.set(key, filter[key]);
      }
    });

    return this.http.get(this.baseUrl, { params });
  }
  
}
