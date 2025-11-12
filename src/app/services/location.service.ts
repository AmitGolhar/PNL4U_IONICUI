import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LocationService {
  private cities: string[] = [
    // Maharashtra
    'Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane', 'Aurangabad', 'Kolhapur', 'Solapur',
    'Amravati', 'Sangli', 'Satara', 'Ahmednagar', 'Ratnagiri', 'Latur', 'Chandrapur',
    'Nanded', 'Wardha', 'Beed', 'Jalgaon', 'Parbhani',

    // Metro & Major Cities
    'Delhi', 'Bengaluru', 'Hyderabad', 'Chennai', 'Kolkata', 'Jaipur', 'Ahmedabad',
    'Indore', 'Goa', 'Surat', 'Vadodara', 'Lucknow', 'Bhopal', 'Chandigarh',
    'Noida', 'Gurugram', 'Vishakhapatnam', 'Coimbatore', 'Patna', 'Ranchi',
    'Dehradun', 'Trivandrum', 'Kochi', 'Guwahati', 'Mysuru', 'Udaipur',
    'Shimla', 'Manali', 'Agra'
  ];

  constructor() {}

  /** ✅ Returns list of available cities */
  getCities(): Observable<string[]> {
    return of(this.cities);
  }

  /** ✅ Simulated location detection */
  detectLocation(): Observable<{ city: string }> {
    // Simulate GPS detection (you can integrate Geolocation API later)
    return of({ city: 'Pune' });
  }
}
