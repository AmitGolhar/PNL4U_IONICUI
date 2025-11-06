import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Booking, BookingService } from 'src/app/services/booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
  standalone:false
})
export class BookingsPage implements OnInit {
  bookings: Booking[] = [];
  loading = false;

  constructor(
    private bookingService: BookingService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadBookings();
  }

  loadBookings() {
    this.loading = true;
    this.bookingService.getMyBookings().subscribe({
      next: (data) => {
        this.bookings = data;
        this.loading = false;
      },
      error: async (err) => {
        this.loading = false;
        const toast = await this.toastCtrl.create({
          message: 'Failed to load bookings: ' + err.message,
          color: 'danger',
          duration: 2500,
        });
        toast.present();
      },
    });
  }
}