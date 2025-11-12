import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  AlertController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import {
  ClubRequest,
  ClubRequestService,
} from 'src/app/services/club-request.service';
import { ApprovalConfigModalComponent } from '../approval-config-modal/ApprovalConfigModalComponent';

@Component({
  selector: 'app-club-requests',
  templateUrl: './club-requests.component.html',
  styleUrls: ['./club-requests.component.scss'],
})
export class ClubRequestsComponent implements OnInit {
  requests: ClubRequest[] = [];
  selectedStatus: string = 'pending';
  loading = false;
  @Input() showHeaderOnly = false; // ✅ control what part renders
  imageModalOpen = false;
  selectedImage: string | null = null;
  constructor(
    private service: ClubRequestService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private cd: ChangeDetectorRef,
    private modalCtrl: ModalController
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
      case 'all':
        req$ = this.service.getAll();
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
      },
    });
  }

  async approve(req: ClubRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Approve Request',
      message: `Approve <b>${req.clubName}</b> and assign a Club Admin.`,
      inputs: [
        { name: 'remarks', type: 'text', placeholder: 'Remarks (optional)' },
        {
          name: 'userSearch',
          type: 'text',
          placeholder: 'Search user by name or email',
        },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Next',
          handler: async (data): Promise<void> => {
            const query = data.userSearch?.trim();
            if (!query) {
              this.showToast('Please enter a username or email to search.');
              return;
            }

            this.service.searchUsers(query).subscribe(async (users) => {
              if (users.length === 0) {
                this.showToast('No matching users found.');
                return;
              }

              const selectUserAlert = await this.alertCtrl.create({
                header: 'Select Club Admin',
                cssClass: 'custom-admin-alert',
                inputs: users.map((u) => ({
                  type: 'radio',
                  label: `${u.username} (${u.email})`,
                  value: u.id,
                })),
                buttons: [
                  { text: 'Cancel', role: 'cancel' },
                  {
                    text: 'Next',
                    handler: async (selectedUserId): Promise<void> => {
                      if (!selectedUserId) {
                        this.showToast('Please select a user.');
                        return;
                      }

                      // ✅ Open a real modal form for config
                      const modal = await this.modalCtrl.create({
                        component: ApprovalConfigModalComponent,
                        componentProps: {
                          clubName: req.clubName,
                          selectedUserId,
                          remarks: data.remarks || '',
                          clubRequestId: req.id,
                          preferredPackage: req.preferredPackage,
                        },
                        cssClass: 'approval-config-modal',
                      });

                      await modal.present();

                      const { data: payload, role } =
                        await modal.onWillDismiss();

                      if (role === 'confirm' && payload) {
                        this.service.approveRequest(req.id, payload).subscribe({
                          next: async (data) => {
                            this.showToast(
                              `✅ Club approved successfully and added to master list!`
                            );
                            this.loadRequests();
                          },

                          error: (err) => {
                            this.showToast(` ${err.error.text}`);
                            this.loadRequests();
                          },
                        });
                      }
                    },
                  },
                ],
              });

              await selectUserAlert.present();
            });
          },
        },
      ],
    });

    await alert.present();
  }

  openImageModal(imageSrc: string) {
    this.selectedImage = imageSrc;
    this.imageModalOpen = true;
  }

  closeImageModal() {
    this.imageModalOpen = false;
    this.selectedImage = null;
  }
  async reject(req: ClubRequest) {
    const alert = await this.alertCtrl.create({
      header: 'Reject Request',
      message: `Are you sure you want to reject "${req.clubName}"?`,
      inputs: [
        { name: 'remarks', type: 'text', placeholder: 'Optional remarks' },
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Reject',
          handler: (data) => {
            this.service.reject(req.id, 'Admin', data.remarks).subscribe(() => {
              this.showToast(`Rejected ${req.clubName}`);
              this.loadRequests();
            });
          },
        },
      ],
    });
    await alert.present();
  }

  async showToast(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      color: 'success',
    });
    toast.present();
  }
}
