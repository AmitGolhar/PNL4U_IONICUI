import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface EventRequest {
  eventId: number;
  eventName: string;
  approvalStatus: string;
  locationCity: string;
  venueName: string;
}
export interface EventResponseDTO {
  eventId: number;
  clubId: number;
  eventName: string;
  category?: string;
  subCategory?: string;
  genre?: string;
  tags?: string;
  locationCity?: string;
  venueName?: string;
  latitude?: number;
  longitude?: number;
  startDate?: string;
  endDate?: string;
  startTime?: string;
  duration?: string;
  artistName?: string;
  eventType?: string;
  approvalStatus?: string;
  eventStatus?: string;
  isFeatured?: boolean;
  verified?: boolean;
  isFreeEntry?: boolean;
  isTonight?: boolean;
  isWeekend?: boolean;
  hasOffers?: boolean;
  offers?: string;
  crowdType?: string;
  entryPolicy?: string;
  dressCode?: string;
  refundPolicy?: string;
  kidsFriendly?: string;
  petsFriendly?: string;
  indoorOrOutdoor?: string;
  rating?: number;
  trendingScore?: number;
  popularityScore?: number;
  liveCrowdLevel?: number;
  ticketsLeft?: number;
  imagesBase64?: string[];
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}
@Injectable({ providedIn: 'root' })
export class EventService {
     private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  createEvent(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events`, payload);
  }

  getEvents(filter: any = {}): Observable<any> {
    let params = new HttpParams();

    Object.keys(filter).forEach(key => {
      if (filter[key] !== null && filter[key] !== undefined && filter[key] !== '') {
        params = params.set(key, filter[key]);
      }
    });

    return this.http.get(`${this.baseUrl}/events`, { params });
  }

   getEventsByStatus(status: string): Observable<any> {
    const params = new HttpParams().set('status', status);
    return this.http.get(`${this.baseUrl}/events/admin/list`, { params });
  }

  approve(eventId: number, notes: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/${eventId}/approve?approve=true&notes=${notes}`, {});
  }

  reject(eventId: number, notes: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/events/${eventId}/approve?approve=false&notes=${notes}`, {});
  }

   getUpcomingEventsByClubId(clubId: number): Observable<EventResponseDTO[]> {
    return this.http.get<EventResponseDTO[]>(`${this.baseUrl}/events/club/${clubId}`);
  }

  getEventById(eventId: number): Observable<EventResponseDTO> {
    return this.http.get<EventResponseDTO>(`${this.baseUrl}/events/${eventId}`);
  }
 
}
