import { Component, OnInit } from '@angular/core';

interface VenueSettings {
  name: string;
  address: string;
  city: string;
  capacity: number;
  openingTime: string;
  closingTime: string;
  contactNumber: string;
  email: string;
  amenities: string[];
  image?: string;
}
@Component({
  selector: 'app-venue-settings',
  templateUrl: './venue-settings.page.html',
  styleUrls: ['./venue-settings.page.scss'],
})
export class VenueSettingsPage implements OnInit {

  venue: VenueSettings = {
    name: 'PNL4U Club',
    address: '123 Neon Street, Downtown',
    city: 'Pune',
    capacity: 300,
    openingTime: '18:00',
    closingTime: '02:00',
    contactNumber: '+91 9876543210',
    email: 'info@pnl4uclub.com',
    amenities: ['VIP Lounge', 'Dance Floor', 'Parking', 'Outdoor Area']
  };

  newAmenity = '';
  selectedImage: File | null = null;
  imagePreview: string | null = null;

  constructor() {}

  ngOnInit() {}

  addAmenity() {
    if (this.newAmenity.trim() !== '') {
      this.venue.amenities.push(this.newAmenity.trim());
      this.newAmenity = '';
    }
  }

  removeAmenity(index: number) {
    this.venue.amenities.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveSettings() {
    console.log('Venue settings saved:', this.venue);
    alert('✅ Venue settings saved successfully!');
  }
}