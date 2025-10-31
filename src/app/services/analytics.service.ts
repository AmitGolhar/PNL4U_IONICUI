// src/app/services/analytics.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

export interface KPI {
  label: string;
  value: number | string;
  delta: number; // percent change vs previous period
  trend: number[]; // sparkline data points
}

export interface TimePoint {
  date: string; // ISO
  value: number;
}

export interface TopEntity {
  id: number;
  name: string;
  metric: number;
  extra?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor() {}

  getKPIs(): Observable<KPI[]> {
    const kpis: KPI[] = [
      { label: 'Revenue (30d)', value: '₹1,248,400', delta: 8.6, trend: [120,130,115,140,150,165,180,190,220,210,230,250] },
      { label: 'Active Users', value: 42_820, delta: 3.1, trend: [20,22,25,24,28,29,30,32,36,39,41,42] },
      { label: 'Sessions', value: 96_540, delta: -1.9, trend: [450,480,470,490,530,520,540,560,580,600,590,585] },
      { label: 'Conversion %', value: '2.1%', delta: 0.2, trend: [1.5,1.6,1.8,1.9,2.0,2.1,2.2,2.1,2.0,2.1,2.0,2.1] }
    ];
    return of(kpis);
  }

  getTimeSeries(): Observable<TimePoint[]> {
    const base = new Date();
    const points: TimePoint[] = [];
    for (let i = 29; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      points.push({
        date: d.toISOString().slice(0,10),
        value: Math.round(500 + Math.random() * 800)
      });
    }
    return of(points);
  }

  getPlatformBreakdown(): Observable<{label:string, value:number}[]> {
    return of([
      { label: 'Mobile App', value: 62 },
      { label: 'Mobile Web', value: 18 },
      { label: 'Desktop', value: 12 },
      { label: 'Kiosk', value: 8 }
    ]);
  }

  getTopVenues(): Observable<TopEntity[]> {
    return of([
      { id: 1, name: 'Club Infinity', metric: 1280, extra: 'Revenue ₹120k' },
      { id: 2, name: 'Neon Vibe Bar', metric: 980, extra: 'Revenue ₹98k' },
      { id: 3, name: 'Electric Dreams', metric: 2020, extra: 'Revenue ₹203k' },
      { id: 4, name: 'Skyline', metric: 730, extra: 'Revenue ₹72k' }
    ]);
  }

  getTopOffers(): Observable<TopEntity[]> {
    return of([
      { id: 1, name: 'Friday Cashback 30%', metric: 420, extra: 'Used 420 times' },
      { id: 2, name: 'Ladies Night', metric: 310, extra: 'Used 310 times' },
      { id: 3, name: 'Early Bird 20%', metric: 210, extra: 'Used 210 times' }
    ]);
  }
}
