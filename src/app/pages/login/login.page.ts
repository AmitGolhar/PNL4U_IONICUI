import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
 selectedTab: string = 'login';
  rememberMe = false;

  // ✅ Backend matches
  loginData = { loginId: '', password: '' };
  signupData = {
    fullName:'',
    username: '',
    email: '',
    phone: '',
    password: '',
    role: new Set<string>(['ROLE_USER'])
  };

  constructor(
    private toastCtrl: ToastController,
    private router: Router,
    private authService: AuthService
  ) {}

  /** 🔐 LOGIN FUNCTION */
  async onSubmit(event: Event) {
    event.preventDefault();

    if (!this.loginData.loginId || !this.loginData.password) {
      this.showToast('Please fill in login ID and password', 'warning');
      return;
    }

    this.authService.login(this.loginData).subscribe({
      next: async (res) => {
        // Save token and user info
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        localStorage.setItem('roles', JSON.stringify(res.roles));
        localStorage.setItem('userId', res.userId);
       this.authService.saveTokens(res.token, res.refreshToken);

        this.showToast('Login successful!', 'success');
        setTimeout(() => this.router.navigate(['/tabs/home']), 1000);
      },
      error: async (err) => {
        this.showToast(err.error?.message || 'Invalid credentials!', 'danger');
      },
    });
  }

  /** 🆕 SIGNUP FUNCTION */
  async onSignup(event: Event) {
    event.preventDefault();

    const { fullName, username, email, phone, password } = this.signupData;
    if (!fullName  || !username || !email || !phone || !password) {
      this.showToast('All fields are required.', 'warning');
      return;
    }

    const payload = {
      fullName,
      username,
      email,
      phone,
      password,
      role: Array.from(this.signupData.role),
    };

    this.authService.signup(payload).subscribe({
      next: async () => {
        this.showToast('User registered successfully!', 'success');
        this.selectedTab = 'login';
      },
     error: async (err) => {
      const msg =
        err.error?.message ||
        (typeof err.error === 'string' ? err.error : 'Signup failed. Try again.');

      this.showToast(msg, 'danger');
    }

    });
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      color,
    });
    await toast.present();
  }

  async loginWithGoogle() {
    this.showToast('Google login not implemented yet.', 'medium');
  }

  async loginWithFacebook() {
    this.showToast('Facebook login not implemented yet.', 'medium');
  }
}
