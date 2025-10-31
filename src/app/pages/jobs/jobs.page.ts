import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { JobApplication } from 'src/app/models/job.model';
import { JobApplicationService } from 'src/app/services/job-application.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.page.html',
  styleUrls: ['./jobs.page.scss'],
})
export class JobsPage implements OnInit {
  activeTab: 'apply' | 'myApplications' = 'apply';
  application: JobApplication = {
    fullName: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    status: 'Pending'
  };
  applications: JobApplication[] = [];

  constructor(
    private jobService: JobApplicationService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.jobService.getApplications().subscribe(res => (this.applications = res));
  }

  async onSubmit() {
    this.jobService.submitApplication(this.application).subscribe(async (res) => {
      const toast = await this.toastCtrl.create({
        message: '🎉 Application submitted successfully!',
        duration: 2000,
        color: 'success'
      });
      toast.present();

      this.application = {
        fullName: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        status: 'Pending'
      };

      this.loadApplications();
      this.activeTab = 'myApplications';
    });
  }
}