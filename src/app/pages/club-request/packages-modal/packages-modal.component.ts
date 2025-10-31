import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-packages-modal',
  templateUrl: './packages-modal.component.html',
  styleUrls: ['./packages-modal.component.scss']
})
export class PackagesModalComponent {
  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss();
  }

  /** 🎁 Package List */
  packages = [
    {
      name: 'FREEMIUM',
      bgColor: 'rgba(0,255,204,0.15)',
      textColor: '#00ffcc',
      features: ['basicListing', 'photoUpload', 'basicSupport']
    },
    {
      name: 'TIERED_PRICING',
      bgColor: 'rgba(102,179,255,0.15)',
      textColor: '#66b3ff',
      features: ['basicListing', 'photoUpload', 'priorityListing', 'premiumPhotos']
    },
    {
      name: 'BUNDLE_PLAN',
      bgColor: 'rgba(255,153,204,0.15)',
      textColor: '#ff99cc',
      features: ['bundleAccess', 'analytics', 'marketingBanner']
    },
    {
      name: 'PROMOTIONAL_PACKAGE',
      bgColor: 'rgba(255,204,0,0.15)',
      textColor: '#ffcc00',
      features: ['promoCampaign', 'socialShoutout', 'featuredPlacement']
    },
    {
      name: 'ALL_INCLUSIVE',
      bgColor: 'rgba(0,255,102,0.15)',
      textColor: '#00ff66',
      features: [
        'basicListing',
        'photoUpload',
        'priorityListing',
        'bundleAccess',
        'analytics',
        'marketingBanner',
        'promoCampaign',
        'socialShoutout',
        'featuredPlacement',
        'fullSupport',
        'premiumPhotos'
      ]
    }
  ];

  /** 📋 Feature Definitions */
  features = [
    { name: 'Basic Listing', key: 'basicListing' },
    { name: 'Free Photo Upload', key: 'photoUpload' },
    { name: 'Priority in Search', key: 'priorityListing' },
    { name: 'Premium Photos (3)', key: 'premiumPhotos' },
    { name: 'Bundle Multiple Clubs', key: 'bundleAccess' },
    { name: 'Analytics Dashboard', key: 'analytics' },
    { name: 'Marketing Banner Credits', key: 'marketingBanner' },
    { name: 'Promotional Campaigns', key: 'promoCampaign' },
    { name: 'Social Media Shoutouts', key: 'socialShoutout' },
    { name: 'Featured Placement (7 Days)', key: 'featuredPlacement' },
    { name: '24×7 Support', key: 'fullSupport' }
  ];
}
