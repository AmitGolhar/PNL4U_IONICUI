import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+1 234 567 890',
    loyaltyPoints: 1250,
    membership: 'Gold Member',
    avatar: 'https://i.pravatar.cc/300',
  };

  constructor(private router: Router) {}

  // ✅ Add this method to handle logout
  logout() {
    // Clear user session or tokens here
    console.log('User logged out');
    
    // Navigate to login page after logout
    this.router.navigate(['/login']);
  }
}
