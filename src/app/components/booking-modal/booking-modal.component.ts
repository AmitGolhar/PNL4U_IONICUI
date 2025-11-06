import { Component, Input, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss']
})
export class BookingModalComponent implements OnInit {
  @Input() event: any; //  
  @Input() bookingType: 'GUESTLIST' | 'TABLE' | 'TICKET' = 'GUESTLIST';
 
  guestCategory: 'GIRL' | 'COUPLE' | null = null;
  tableType: 'REGULAR' | 'VIP' | null = null;
  tablePeopleCount: number | null = null;
        private baseUrl = environment.apiUrl;

  submitting = false;
  eventDetails:any;
  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private http: HttpClient
  ) {
    
  }

   ngOnInit() {
     this.eventDetails = [];
    console.log('📅 Event received in modal:', this.event);
     this.eventDetails = this.event; // ✅ store directly

  }

  close() {
    this.modalCtrl.dismiss();
  }

  async confirmBooking() {
    if (this.bookingType === 'GUESTLIST') {
      if (!this.guestCategory) {
        const toast = await this.toastCtrl.create({
          message: 'Please select Girl or Couple before joining the guest list.',
          color: 'warning',
          duration: 2000
        });
        await toast.present();
        return;
      }
    } else if (this.bookingType === 'TABLE') {
      if (!this.tableType || !this.tablePeopleCount || this.tablePeopleCount <= 0) {
        const toast = await this.toastCtrl.create({
          message: 'Please select table type and number of people.',
          color: 'warning',
          duration: 2000
        });
        await toast.present();
        return;
      }
    }
console.log(this.eventDetails)
    this.submitting = true;

    const req = {
      userId: 1, // replace with logged-in user
      eventId: this.eventDetails.eventId,
      clubId: this.eventDetails.clubId,
      bookingType: this.bookingType,
      totalAmount: 0,
      promoterId: null,
      eventDate:this.eventDetails.startDate,
      eventTime:this.eventDetails.startTime,
      items: this.bookingType === 'GUESTLIST'
        ? [
            {
              itemName:
                this.guestCategory === 'COUPLE'
                  ? 'COUPLE: User + Guest'
                  : 'GIRL: Single Entry',
              quantity: this.guestCategory === 'COUPLE' ? 2 : 1,
              price: 0
            }
          ]
        : [
            {
              itemName: `${this.tableType} Table (${this.tablePeopleCount} People)`,
              quantity: 1,
              price: 0
            }
          ]
    };

    this.http.post(`${this.baseUrl}/bookings`, req).subscribe({
      next: async () => {
        this.submitting = false;
        const toast = await this.toastCtrl.create({
          message: `✅ Booking confirmed successfully!`,
          color: 'success',
          duration: 2000
        });
        await toast.present();
        this.modalCtrl.dismiss(true);
      },
      error: async (err) => {
        this.submitting = false;
        const toast = await this.toastCtrl.create({
          message: '❌ Booking failed: ' + err.message,
          color: 'danger',
          duration: 2500
        });
        await toast.present();
      }
    });
  }
}
