import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
 import { AlertController, ToastController } from '@ionic/angular';
import { ClubRequest, ClubRequestService } from 'src/app/services/club-request.service';

@Component({
  selector: 'app-club-requests',
  templateUrl: './club-requests.component.html',
  styleUrls: ['./club-requests.component.scss']
})
export class ClubRequestsComponent implements OnInit {
  requests: ClubRequest[] = [];
  selectedStatus: string = 'all';
  loading = false;
  @Input() showHeaderOnly = false; // ✅ control what part renders

  constructor(
    private service: ClubRequestService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
      private cd: ChangeDetectorRef

  ) {}

  ngOnInit() {
    
      this.loadRequests();
    
     
  }
loadRequests() {
  console.log('>>> loadRequests() CALLED <<<');
  this.loading = true;

  let req$;
  switch (this.selectedStatus) {
    case 'pending':
      req$ = this.service.getPending();
      break;
    case 'approved':
      req$ = this.service.getApproved();
      break;
    case 'rejected':
      req$ = this.service.getRejected();
      break;
    default:
      req$ = this.service.getAll();
  }

  req$.subscribe({
    next: (data) => {
      console.log('✅ API raw data:', data);
      if (Array.isArray(data)) {
        this.requests = data;
      } else if (data) {
        this.requests = [data];
      }
      console.log('✅ Requests assigned:', this.requests);
      this.loading = false;
      this.cd.detectChanges(); // 🔥 force refresh
    },
    error: (err) => {
      console.error('❌ Error fetching requests:', err);
      this.loading = false;
    }
  });
}

  async approve(req: ClubRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Approve Request',
      message: `Are you sure you want to approve "${req.clubName}"?`,
      inputs: [{ name: 'remarks', type: 'text', placeholder: 'Optional remarks' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Approve',
          handler: (data) => {
            this.service.approve(req.id, 'Admin', data.remarks).subscribe(() => {
              this.showToast(`Approved ${req.clubName}`);
              this.loadRequests();
            });
          }
        }
      ]
    });
    await alert.present();
  }

  async reject(req: ClubRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: `Are you sure you want to reject "${req.clubName}"?`,
      inputs: [{ name: 'remarks', type: 'text', placeholder: 'Optional remarks' }],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: (data) => {
            this.service.reject(req.id, 'Admin', data.remarks).subscribe(() => {
              this.showToast(`Rejected ${req.clubName}`);
              this.loadRequests();
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
