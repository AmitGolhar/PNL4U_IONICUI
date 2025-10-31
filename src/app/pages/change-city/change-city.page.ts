import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { City, Area } from 'src/app/models/location.model';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.page.html',
  styleUrls: ['./change-city.page.scss'],
})
export class ChangeCityPage implements OnInit {
  cities: City[] = [];
  areas: Area[] = [];
  selectedCityId?: number;
  selectedAreaId?: number;
  currentLocation: string = '';

  constructor(
    private locationService: LocationService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadCities();
  }

  loadCities() {
    this.locationService.getCities().subscribe(cities => (this.cities = cities));
  }

  onCityChange(cityId: number) {
    this.selectedCityId = cityId;
    this.locationService.getAreasByCity(cityId).subscribe(areas => (this.areas = areas));
  }

  onAreaChange(areaId: number) {
    this.selectedAreaId = areaId;
  }

  detectLocation() {
    this.locationService.detectLocation().subscribe(async (loc) => {
      this.currentLocation = `${loc.area}, ${loc.city}`;
      const toast = await this.toastCtrl.create({
        message: `📍 Detected location: ${this.currentLocation}`,
        duration: 2000,
        color: 'tertiary',
        position: 'top'
      });
      toast.present();
    });
  }

  async saveLocation() {
    const city = this.cities.find(c => c.id === this.selectedCityId)?.name;
    const area = this.areas.find(a => a.id === this.selectedAreaId)?.name;
    const message = city && area ? `✅ Location set to ${area}, ${city}` : '⚠️ Please select city & area';
    
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color: city && area ? 'success' : 'warning',
      position: 'bottom'
    });
    toast.present();
  }
}