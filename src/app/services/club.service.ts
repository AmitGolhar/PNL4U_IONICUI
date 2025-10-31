import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HappyHourDTO {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  offerDetails: string;
}

export interface ClubResponseDTO {
  clubId: number;
  clubName: string;
  city: string;
  address: string;
  category: string;
  contactNumber: string;
  rating: number;
  isFeatured: boolean;
  description: string;
  approvalStatus: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  genre: string[];
  crowdType: string[];
  bannerType: string[];
  popularityScore: number;
  liveCrowdLevel: number;
  hasHappyHours: boolean;
  verified: boolean;
  websiteLink: string;
  instagramHandle: string;
  mapLocation: string;
  latitude: number;
  longitude: number;
  mapLocationUrl: string;
  trendingScore: number;
  happyHours: HappyHourDTO[];
  imagesBase64: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ClubService {

  private apiUrl = 'http://localhost:8080/api/clubs/public/list'; 

  constructor(private http: HttpClient) {}

  getAllClubs(filters?: {
    city?: string;
    genre?: string;
    crowdType?: string;
    bannerType?: string;
    sortBy?: string;
    sortOrder?: string;
  }): Observable<ClubResponseDTO[]> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params = params.set(key, value);
      });
    }
    return this.http.get<ClubResponseDTO[]>(this.apiUrl, { params });
  }
}
