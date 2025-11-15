import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { EventService, EventRequest } from 'src/app/services/event.service';
import { EventEditModalComponent } from 'src/app/pages/admin-dashboard/event-edit-modal/event-edit-modal.component'; // ✅ FIXED IMPORT

@Component({
  selector: 'app-event-requests',
  templateUrl: './event-requests.component.html',
  styleUrls: ['./event-requests.component.scss']
})
export class EventRequestsComponent implements OnInit {
  events: EventRequest[] = [];
  selectedStatus: string = 'ALL';
  loading = false;
  @Input() showHeaderOnly = false;

  constructor(
    private service: EventService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadEvents();
  }

  /** 🔄 Fetch events by status */
  loadEvents() {
    this.loading = true;
    this.service.getEventsByStatus(this.selectedStatus).subscribe({
      next: (data) => {
        this.events = Array.isArray(data.content) ? data.content : [data];
        this.loading = false;
        this.cd.detectChanges();
      },
      error: (err) => {
        console.error('❌ Error loading events:', err);
        this.loading = false;
      }
    });
  }

  /** ✏️ Open modal for editing event */
  async openEditModal(event: EventRequest) {
    const modal = await this.modalCtrl.create({
      component: EventEditModalComponent, // ✅ now properly imported
      componentProps: { event: { ...event } },
      breakpoints: [0, 0.5, 0.9],
      initialBreakpoint: 0.9
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) this.loadEvents();
    });

    await modal.present();
  }

  /** ✅ Approve Event */
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
              this.showToast(`✅ Approved "${event.eventName}"`);
              this.loadEvents();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  /** ❌ Reject Event */
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
              this.showToast(`❌ Rejected "${event.eventName}"`);
              this.loadEvents();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  /** 🔔 Toast helper */
  async showToast(msg: string, color: 'success' | 'danger' | 'warning' = 'success') {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2500,
      color
    });
    toast.present();
  }
}
