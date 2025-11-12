import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-change-city',
  templateUrl: './change-city.page.html',
  styleUrls: ['./change-city.page.scss'],
})
export class ChangeCityPage implements OnInit {
  cities: string[] = [];
  selectedCity: string = '';
  currentLocation: string = '';

  constructor(
    private locationService: LocationService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadCities();
    this.loadSavedCity();
  }

  /** ✅ Load all available cities from service */
  loadCities() {
    this.locationService.getCities().subscribe((cities) => (this.cities = cities));
  }

  /** ✅ Load city preference from local storage if available */
  loadSavedCity() {
    const savedCity = localStorage.getItem('userCity');
    if (savedCity) {
      this.selectedCity = savedCity;
      this.currentLocation = savedCity;
    }
  }

  /** ✅ Called when user selects a city */
  onCityChange(city: string) {
    this.selectedCity = city;
  }

  /** ✅ Detect location (mocked from service) */
  detectLocation() {
    this.locationService.detectLocation().subscribe(async (loc) => {
      this.currentLocation = loc.city;
      this.selectedCity = loc.city;
      localStorage.setItem('userCity', loc.city);

      const toast = await this.toastCtrl.create({
        message: `📍 Detected & saved location: ${loc.city}`,
        duration: 2000,
        color: 'tertiary',
        position: 'top',
      });
      await toast.present();
    });
  }

  /** ✅ Save selected city to local storage */
  async saveLocation() {
    if (!this.selectedCity) {
      const toast = await this.toastCtrl.create({
        message: '⚠️ Please select a city first',
        duration: 2000,
        color: 'warning',
        position: 'bottom',
      });
      return toast.present();
    }

    localStorage.setItem('userCity', this.selectedCity);

    const toast = await this.toastCtrl.create({
      message: `✅ City set to ${this.selectedCity}`,
      duration: 2000,
      color: 'success',
      position: 'bottom',
    });
    toast.present();
  }
}
