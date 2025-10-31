import { Component, OnInit } from '@angular/core';

interface Payout {
  id: string;
  clubName: string;
  amount: number;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  requestedAt: string;
  processedAt?: string;
  remarks?: string;
}

@Component({
  selector: 'app-payout-reports',
  templateUrl: './payout-reports.page.html',
  styleUrls: ['./payout-reports.page.scss'],
})
export class PayoutReportsPage  implements OnInit {
  payouts: Payout[] = [];
  filteredPayouts: Payout[] = [];

  startDate: string = '';
  endDate: string = '';
  searchText: string = '';

  summary = {
    total: 0,
    completed: 0,
    pending: 0,
    lastUpdated: '',
  };

  constructor() {}

  ngOnInit() {
    this.generateDummyData();
    this.filterPayouts();
  }

  generateDummyData() {
    const now = new Date();
    this.payouts = Array.from({ length: 25 }).map((_, i) => {
      const requested = new Date(now.getTime() - i * 86400000);
      const processed = Math.random() > 0.3 ? new Date(requested.getTime() + 3600000 * 4) : undefined;
      const status = processed
        ? 'COMPLETED'
        : Math.random() > 0.5
        ? 'PENDING'
        : 'FAILED';
      return {
        id: 'PY' + (1000 + i),
        clubName: ['Club Infinity', 'Neon Vibe', 'Skyline', 'Midnight Hub'][i % 4],
        amount: Math.floor(Math.random() * 50000) + 5000,
        status,
        requestedAt: requested.toISOString(),
        processedAt: processed?.toISOString(),
        remarks: status === 'FAILED' ? 'Bank verification failed' : '',
      };
    });
  }

  filterPayouts() {
    const lowerSearch = this.searchText.toLowerCase();
    this.filteredPayouts = this.payouts.filter((p) => {
      const inSearch =
        !this.searchText ||
        p.clubName.toLowerCase().includes(lowerSearch) ||
        p.id.toLowerCase().includes(lowerSearch);

      const inDateRange =
        (!this.startDate || new Date(p.requestedAt) >= new Date(this.startDate)) &&
        (!this.endDate || new Date(p.requestedAt) <= new Date(this.endDate));

      return inSearch && inDateRange;
    });

    this.calculateSummary();
  }

  calculateSummary() {
    const total = this.filteredPayouts.reduce((sum, p) => sum + p.amount, 0);
    const completed = this.filteredPayouts
      .filter((p) => p.status === 'COMPLETED')
      .reduce((sum, p) => sum + p.amount, 0);
    const pending = this.filteredPayouts.filter((p) => p.status === 'PENDING').length;
    this.summary = {
      total,
      completed,
      pending,
      lastUpdated: new Date().toLocaleString(),
    };
  }

  exportCSV() {
    const header = 'Payout ID,Club,Amount,Status,Requested At,Processed At,Remarks\n';
    const rows = this.filteredPayouts
      .map(
        (p) =>
          `${p.id},${p.clubName},${p.amount},${p.status},${p.requestedAt},${p.processedAt || ''},${p.remarks || ''}`
      )
      .join('\n');
    const csv = header + rows;
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `payout_report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'status-completed';
      case 'PENDING':
        return 'status-pending';
      case 'FAILED':
        return 'status-failed';
      default:
        return '';
    }
  }
}