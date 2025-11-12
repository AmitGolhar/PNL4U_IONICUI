import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-approval-config-modal',
  templateUrl: './approval-config-modal.component.html',
  styleUrls: ['./approval-config-modal.component.scss'],
})
export class ApprovalConfigModalComponent implements OnInit {
  @Input() clubName!: string;
  @Input() selectedUserId!: number;
  @Input() remarks!: string;
  @Input() preferredPackage!: string;

  config = {
    isFeatured: false,
    bannerTypeList: ['REGULAR'], // multi-select array
    genreList: ['Techno', 'Bollywood', 'Hip-Hop'], // multi-select array
    packageType: this.preferredPackage,
    userId: 0,
    subscriptionStartDate: new Date().toISOString().split('T')[0],
    subscriptionEndDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    )
      .toISOString()
      .split('T')[0],
  };

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.config.packageType = this.preferredPackage;
    this.config.userId = Number(this.selectedUserId);
  }

  confirm() {
    const payload = {
      approve: true,
      notes: this.remarks,
      ...this.config,
      // convert arrays → comma-separated strings for backend
      bannerType: this.config.bannerTypeList.join(','),
      genre: this.config.genreList.join(','),
    };
    this.modalCtrl.dismiss(payload, 'confirm');
  }

  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }
}
