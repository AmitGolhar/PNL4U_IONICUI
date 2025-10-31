import { Component, OnInit } from '@angular/core';

interface SaleRecord {
  id: number;
  date: string;
  club: string;
  category: string;
  amount: number;
  paymentMethod: string;
}

interface RevenueSummary {
  month: string;
  totalRevenue: number;
  growth: number;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.page.html',
  styleUrls: ['./sales.page.scss'],
})
export class SalesPage implements OnInit {

  activeTab: 'overview' | 'transactions' | 'charts' = 'overview';

  totalRevenue = 482000;
  monthlyGrowth = 18;
  totalTransactions = 1276;
  avgTicketSize = 1890;

  // dummy monthly data
  revenueTrends: RevenueSummary[] = [
    { month: 'Jan', totalRevenue: 120000, growth: 8 },
    { month: 'Feb', totalRevenue: 150000, growth: 25 },
    { month: 'Mar', totalRevenue: 180000, growth: 20 },
    { month: 'Apr', totalRevenue: 210000, growth: 15 },
    { month: 'May', totalRevenue: 250000, growth: 19 },
  ];

  // dummy transactions
  sales: SaleRecord[] = [
    { id: 1, date: '2025-10-01', club: 'Club Infinity', category: 'Table Booking', amount: 12500, paymentMethod: 'UPI' },
    { id: 2, date: '2025-10-02', club: 'Neon Vibe', category: 'Entry', amount: 4500, paymentMethod: 'Card' },
    { id: 3, date: '2025-10-03', club: 'Electric Dreams', category: 'Drinks', amount: 7200, paymentMethod: 'Cash' },
    { id: 4, date: '2025-10-04', club: 'SkyLounge', category: 'Event', amount: 15500, paymentMethod: 'UPI' },
  ];

  topClubs = [
    { name: 'Club Infinity', revenue: 190000 },
    { name: 'Neon Vibe', revenue: 158000 },
    { name: 'Electric Dreams', revenue: 130000 },
    { name: 'SkyLounge', revenue: 118000 }
  ];

  constructor() {}

  ngOnInit() {}

  formatCurrency(value: number): string {
    return '₹' + value.toLocaleString('en-IN');
  }
}