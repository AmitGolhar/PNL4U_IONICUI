import { Component, OnInit } from '@angular/core';

interface Table {
  id: number;
  tableNumber: string;
  capacity: number;
  price: number;
  isAvailable: boolean;
  x: number;
  y: number;
}

interface Guest {
  id: number;
  name: string;
  gender: string;
  contact: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface PropertyDetails {
  name: string;
  location: string;
  totalFloors: number;
  capacity: number;
  openingHours: string;
  contactEmail: string;
}

@Component({
  selector: 'app-manage-tables',
  templateUrl: './manage-tables.page.html',
  styleUrls: ['./manage-tables.page.scss'],
})
export class ManageTablesPage implements OnInit {

  activeTab: 'floor' | 'tables' | 'guests' | 'property' = 'floor';

  tables: Table[] = [];
  guests: Guest[] = [];
  property: PropertyDetails = {
    name: 'PNL4U Lounge & Club',
    location: 'Bandra West, Mumbai',
    totalFloors: 2,
    capacity: 250,
    openingHours: '7:00 PM - 3:00 AM',
    contactEmail: 'bookings@pnl4u.com'
  };

  showAddModal = false;
  modalType: 'TABLE' | 'GUEST' | null = null;
  newTable: Partial<Table> = {};
  newGuest: Partial<Guest> = {};

  ngOnInit() {
    // 🪑 Mock Tables
    this.tables = [
      { id: 1, tableNumber: 'T01', capacity: 4, price: 5000, isAvailable: true, x: 20, y: 30 },
      { id: 2, tableNumber: 'T02', capacity: 6, price: 7000, isAvailable: false, x: 45, y: 40 },
      { id: 3, tableNumber: 'VIP1', capacity: 10, price: 12000, isAvailable: true, x: 70, y: 25 },
      { id: 4, tableNumber: 'T03', capacity: 4, price: 5000, isAvailable: true, x: 55, y: 65 }
    ];

    // 🧑‍🤝‍🧑 Mock Guests
    this.guests = [
      { id: 1, name: 'Priya Mehta', gender: 'Female', contact: '9876543210', status: 'APPROVED' },
      { id: 2, name: 'Rohan Gupta', gender: 'Male', contact: '9998887776', status: 'PENDING' },
      { id: 3, name: 'Simran Kaur', gender: 'Female', contact: '9865324789', status: 'REJECTED' }
    ];
  }

  // TABLES
  toggleAvailability(t: Table) {
    t.isAvailable = !t.isAvailable;
  }

  deleteTable(t: Table) {
    if (confirm(`Delete ${t.tableNumber}?`)) {
      this.tables = this.tables.filter(x => x.id !== t.id);
    }
  }

  // GUESTS
  changeGuestStatus(g: Guest, status: 'APPROVED' | 'REJECTED') {
    g.status = status;
  }

  deleteGuest(g: Guest) {
    if (confirm(`Remove ${g.name}?`)) {
      this.guests = this.guests.filter(x => x.id !== g.id);
    }
  }

  // MODAL
  openModal(type: 'TABLE' | 'GUEST') {
    this.modalType = type;
    this.showAddModal = true;
    this.newTable = {};
    this.newGuest = {};
  }

  closeModal() {
    this.showAddModal = false;
  }

  addEntry() {
    if (this.modalType === 'TABLE') {
      if (!this.newTable.tableNumber || !this.newTable.capacity || !this.newTable.price) {
        alert('Please fill all table fields');
        return;
      }
      const newT: Table = {
        id: this.tables.length + 1,
        tableNumber: this.newTable.tableNumber!,
        capacity: Number(this.newTable.capacity),
        price: Number(this.newTable.price),
        isAvailable: true,
        x: Math.floor(Math.random() * 80),
        y: Math.floor(Math.random() * 70)
      };
      this.tables.push(newT);
      alert('Table added successfully!');
    }

    if (this.modalType === 'GUEST') {
      if (!this.newGuest.name || !this.newGuest.contact) {
        alert('Please fill all guest fields');
        return;
      }
      const newG: Guest = {
        id: this.guests.length + 1,
        name: this.newGuest.name!,
        gender: this.newGuest.gender || 'Other',
        contact: this.newGuest.contact!,
        status: 'PENDING'
      };
      this.guests.unshift(newG);
      alert('Guest added successfully!');
    }

    this.closeModal();
  }
}