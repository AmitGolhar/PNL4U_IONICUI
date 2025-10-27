import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NavController, MenuController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
 standalone:false
})
export class AppHeaderComponent {
  @Input() title: string = 'Page';
  @Input() userName: string = 'User';
  @Input() showBackButton: boolean = true;

  constructor(private navCtrl: NavController, private menu: MenuController) {}

  goBack() {
    this.navCtrl.back();
  }

  closeMenu() {
    this.menu.close();
  }
}
