import { Component, OnInit } from '@angular/core';
import { AnalyticsService, KPI, TimePoint, TopEntity } from '../../services/analytics.service';

@Component({
  selector: 'app-platform-analytics',
  templateUrl: './platform-analytics.page.html',
  styleUrls: ['./platform-analytics.page.scss']
})
export class PlatformAnalyticsPage implements OnInit {
  kpis: KPI[] = [];
  timeseries: TimePoint[] = [];
  breakdown: { label: string, value: number }[] = [];
  topVenues: TopEntity[] = [];
  topOffers: TopEntity[] = [];
  chartMax = 0;

  palette = [
    'linear-gradient(135deg,#ff00b3,#8e2de2)',
    'linear-gradient(135deg,#00f0ff,#4a00e0)',
    'linear-gradient(135deg,#ffcc00,#ff6b6b)',
    'linear-gradient(135deg,#00ff9d,#00f0ff)'
  ];

  constructor(private analytics: AnalyticsService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll() {
    this.analytics.getKPIs().subscribe(k => this.kpis = k);
    this.analytics.getTimeSeries().subscribe(ts => {
      this.timeseries = ts;
      this.chartMax = Math.max(...ts.map(p => p.value)) * 1.05;
    });
    this.analytics.getPlatformBreakdown().subscribe(b => this.breakdown = b);
    this.analytics.getTopVenues().subscribe(v => this.topVenues = v);
    this.analytics.getTopOffers().subscribe(o => this.topOffers = o);
  }

  /* ---------- Chart Helpers ---------- */
  sparklinePath(values: number[], w = 80, h = 22): string {
    if (!values || values.length === 0) return '';
    const max = Math.max(...values);
    const min = Math.min(...values);
    const range = max - min || 1;
    const step = w / (values.length - 1);
    return values.map((v, i) => {
      const x = i * step;
      const y = h - ((v - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  }

  areaPath(points: TimePoint[], w = 640, h = 140): string {
    if (!points || points.length === 0) return '';
    const vals = points.map(p => p.value);
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    const range = max - min || 1;
    const step = w / (points.length - 1);
    const line = points.map((p, i) => {
      const x = i * step;
      const y = h - ((p.value - min) / range) * h;
      return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    const lastX = (points.length - 1) * step;
    return `${line} L ${lastX.toFixed(1)} ${h} L 0 ${h} Z`;
  }

  /* ---------- Data Helpers ---------- */
  getTotalSessions(): number {
    return this.timeseries.reduce((sum, p) => sum + p.value, 0);
  }

  percentOf(value: number) {
    const total = this.breakdown.reduce((s, b) => s + b.value, 0) || 1;
    return Math.round((value / total) * 100);
  }

  formatNumber(n: number | string): string {
    if (typeof n === 'number') {
      if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
      if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`;
      return `${n}`;
    }
    return `${n}`;
  }

  exportCSV() {
    const header = 'date,value\n';
    const body = this.timeseries.map(p => `${p.date},${p.value}`).join('\n');
    const csv = header + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `timeseries_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  /* ---------- Donut Helpers ---------- */
  computeSliceRotation(index: number) {
    const total = this.breakdown.reduce((s, b) => s + b.value, 0) || 1;
    let start = 0;
    for (let i = 0; i < index; i++) {
      start += (this.breakdown[i].value / total) * 360;
    }
    return start;
  }

  sliceGradient(i: number) {
    return this.palette[i % this.palette.length];
  }

  badgeColor(label: string) {
    const map = ['#ff00b3', '#00f0ff', '#ffcc00', '#00ff9d'];
    const idx = (label.charCodeAt(0) || 0) % map.length;
    return map[idx];
  }
}
