import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface BookingItem {
  itemName: string;
  quantity: number;
  price: number;
}

export interface Booking {
  bookingId: number;
  eventId: number;
  clubId: number;
  bookingType: string;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  qrCode?: string;
  items: BookingItem[];
  createdAt?: string;
  eventDate :string;
  eventTime:string;
  username:string
}

@Injectable({
  providedIn: 'root'
})
export class BookingService {
       private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMyBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings/my`);
  }

   
   getClubBookingsByDate(clubId: number, date?: string): Observable<Booking[]> {
    const params = date ? `?date=${date}` : '';
    return this.http.get<Booking[]>(`${this.baseUrl}/bookings/club/${clubId}${params}`);
  }

}
