import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { FAQ, SupportTicket } from 'src/app/models/support.model';
import { SupportService } from 'src/app/services/support.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.page.html',
  styleUrls: ['./support.page.scss'],
})
export class SupportPage implements OnInit {
  faqs: FAQ[] = [];
  tickets: SupportTicket[] = [];
  newTicket: Partial<SupportTicket> = {};

  constructor(
    private supportService: SupportService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadFAQs();
    this.loadTickets();
  }

  loadFAQs() {
    this.supportService.getFAQs().subscribe((data) => (this.faqs = data));
  }

  loadTickets() {
    this.supportService.getTickets().subscribe((data) => (this.tickets = data));
  }

  async submitTicket() {
    if (!this.newTicket.subject || !this.newTicket.message) {
      const toast = await this.toastCtrl.create({
        message: '⚠️ Please fill out all fields.',
        duration: 2000,
        color: 'warning'
      });
      toast.present();
      return;
    }

    this.supportService.createTicket(this.newTicket as SupportTicket).subscribe(async (res) => {
      this.tickets.unshift(res);
      this.newTicket = {};
      const toast = await this.toastCtrl.create({
        message: '✅ Ticket submitted successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();
    });
  }

}
