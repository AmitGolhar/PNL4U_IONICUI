import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { EventRequest, EventService } from 'src/app/services/event.service';
 
@Component({
  selector: 'app-event-requests',
  templateUrl: './event-requests.component.html',
  styleUrls: ['./event-requests.component.scss']
})
export class EventRequestsComponent implements OnInit {
  events: EventRequest[] = [];
  selectedStatus: string = 'PENDING';
  loading = false;
  @Input() showHeaderOnly = false;

  constructor(
    private service: EventService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  loadEvents() {
    console.log('>>> loadEvents() CALLED <<<');
    this.loading = true;

    this.service.getEventsByStatus(this.selectedStatus).subscribe({
      next: (data) => {
        console.log('✅ API raw data:', data);
        this.events = Array.isArray(data.content) ? data.content : [];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error fetching events:', err);
        this.loading = false;
      }
    });
  }

  async approve(event: EventRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Approve Event',
      message: `Are you sure you want to approve "${event.eventName}"?`,
      inputs: [{ name: 'remarks', type: 'text', placeholder: 'Optional remarks' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Approve',
          handler: (data) => {
            this.service.approve(event.eventId, data.remarks).subscribe(() => {
              this.showToast(`Approved "${event.eventName}"`);
              this.loadEvents();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async reject(event: EventRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Event',
      message: `Are you sure you want to reject "${event.eventName}"?`,
      inputs: [{ name: 'remarks', type: 'text', placeholder: 'Optional remarks' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: (data) => {
            this.service.reject(event.eventId, data.remarks).subscribe(() => {
              this.showToast(`Rejected "${event.eventName}"`);
              this.loadEvents();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }
}
