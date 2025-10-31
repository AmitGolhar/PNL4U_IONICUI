import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { City, Area } from '../models/location.model';
 
@Injectable({ providedIn: 'root' })
export class LocationService {
  private cities: City[] = [
    { id: 1, name: 'Mumbai', state: 'Maharashtra', country: 'India' },
    { id: 2, name: 'Pune', state: 'Maharashtra', country: 'India' },
    { id: 3, name: 'Bengaluru', state: 'Karnataka', country: 'India' },
    { id: 4, name: 'Delhi', state: 'Delhi NCR', country: 'India' },
    { id: 5, name: 'Hyderabad', state: 'Telangana', country: 'India' }
  ];

  private areas: Area[] = [
    { id: 1, name: 'Bandra', cityId: 1 },
    { id: 2, name: 'Andheri', cityId: 1 },
    { id: 3, name: 'Khar West', cityId: 1 },
    { id: 4, name: 'Viman Nagar', cityId: 2 },
    { id: 5, name: 'Koregaon Park', cityId: 2 },
    { id: 6, name: 'Koramangala', cityId: 3 },
    { id: 7, name: 'Indiranagar', cityId: 3 },
    { id: 8, name: 'Connaught Place', cityId: 4 },
    { id: 9, name: 'Banjara Hills', cityId: 5 },
  ];

  constructor() {}

  getCities(): Observable<City[]> {
    return of(this.cities);
  }

  getAreasByCity(cityId: number): Observable<Area[]> {
    return of(this.areas.filter(a => a.cityId === cityId));
  }

  detectLocation(): Observable<{ city: string; area: string }> {
    // Simulate GPS detection (you can integrate Geolocation API later)
    return of({ city: 'Mumbai', area: 'Bandra' });
  }
}
