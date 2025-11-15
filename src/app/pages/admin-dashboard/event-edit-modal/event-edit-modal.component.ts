import { Component, Input } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { EventService, EventRequest, EventResponseDTO } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-edit-modal',
  templateUrl: './event-edit-modal.component.html',
  styleUrls: ['./event-edit-modal.component.scss']
})
export class EventEditModalComponent {
  @Input() event!: EventResponseDTO;
  saving = false;

  constructor(
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private service: EventService
  ) {}

  close() {
    this.modalCtrl.dismiss();
  }

  async save() {
    this.saving = true;
    this.service.updateEvent(this.event.eventId, this.event).subscribe({
      next: async () => {
        this.saving = false;
        const toast = await this.toastCtrl.create({
          message: `✅ Event "${this.event.eventName}" updated successfully`,
          duration: 2000,
          color: 'success'
        });
        toast.present();
        this.modalCtrl.dismiss(true); // refresh parent list
      },
      error: async (err) => {
        console.error('❌ Update failed', err);
        this.saving = false;
        const toast = await this.toastCtrl.create({
          message: 'Failed to update event.',
          duration: 2000,
          color: 'danger'
        });
        toast.present();
      }
    });
  }
}
