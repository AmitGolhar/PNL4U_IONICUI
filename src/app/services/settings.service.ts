import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from '../models/settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private settings: UserSettings = {
    notifications: true,
    darkMode: true,
    locationAccess: false,
    language: 'English',
    autoPlayVideos: false
  };

  constructor() {}

  getSettings(): Observable<UserSettings> {
    return of(this.settings);
  }

  updateSettings(updated: Partial<UserSettings>): Observable<UserSettings> {
    this.settings = { ...this.settings, ...updated };
    return of(this.settings);
  }
}
