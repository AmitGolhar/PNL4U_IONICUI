import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { UserSettings } from 'src/app/models/settings.model';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  settings: UserSettings | null = null;

  constructor(
    private settingsService: SettingsService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadSettings();
  }

  loadSettings() {
    this.settingsService.getSettings().subscribe(data => (this.settings = data));
  }

  async toggleSetting(key: keyof UserSettings, value: boolean | string) {
    if (!this.settings) return;

    const updated = { [key]: value };
    this.settingsService.updateSettings(updated).subscribe(async (res) => {
      this.settings = res;

      const toast = await this.toastCtrl.create({
        message: `✅ ${this.formatKey(key)} updated`,
        duration: 2000,
        color: 'success',
        position: 'bottom'
      });
      toast.present();
    });
  }

  private formatKey(key: string): string {
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase());
  }

  logout() {
    console.log('User logged out');
  }
}