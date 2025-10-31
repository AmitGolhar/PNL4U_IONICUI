import { Component, OnInit } from '@angular/core';

type ApplicantStatus = 'APPLIED' | 'SHORTLISTED' | 'HIRED' | 'REJECTED';
type JobStatus = 'OPEN' | 'CLOSED';

interface JobPost {
  id: number;
  title: string;
  department: string;
  vacancies: number;
  salaryRange: string;
  location: string;
  postedAt: string;
  status: JobStatus;
  description?: string;
}

interface Applicant {
  id: number;
  name: string;
  email: string;
  phone?: string;
  appliedFor: string; // job title or id string
  resume?: string; // dataURL
  photo?: string; // dataURL
  status: ApplicantStatus;
  appliedAt: string;
  notes?: string;
}

@Component({
  selector: 'app-staff-hiring',
  templateUrl: './staff-hiring.page.html',
  styleUrls: ['./staff-hiring.page.scss'],
})
export class StaffHiringPage implements OnInit {
  // tabs
  activeTab: 'jobs' | 'applicants' = 'jobs';

  // data stores
  jobs: JobPost[] = [];
  applicants: Applicant[] = [];

  // UI state: modals
  showJobModal = false;
  editingJob: Partial<JobPost> | null = null;

  showApplicantModal = false;
  viewingApplicant: Applicant | null = null;

  // file previews for job modal (if needed)
  resumePreview: string | null = null;
  photoPreview: string | null = null;

  // simple filters/search
  jobFilter: JobStatus | 'ALL' = 'ALL';
  applicantFilter: ApplicantStatus | 'ALL' = 'ALL';
  searchQuery = '';

  ngOnInit() {
    // dummy jobs
    this.jobs = [
      {
        id: 1,
        title: 'Floor Manager',
        department: 'Operations',
        vacancies: 1,
        salaryRange: '₹40,000 - ₹60,000',
        location: 'Bandra, Mumbai',
        postedAt: '2025-10-01',
        status: 'OPEN',
        description: 'Oversee floor operations, staff, and guest experience.'
      },
      {
        id: 2,
        title: 'Bar Manager',
        department: 'Beverage',
        vacancies: 1,
        salaryRange: '₹50,000 - ₹80,000',
        location: 'Bandra, Mumbai',
        postedAt: '2025-09-15',
        status: 'OPEN',
        description: 'Manage bar inventory, suppliers and cocktail menu.'
      }
    ];

    // dummy applicants
    this.applicants = [
      {
        id: 1,
        name: 'Rahul Sharma',
        email: 'rahul@example.com',
        phone: '9876543210',
        appliedFor: 'Floor Manager',
        status: 'APPLIED',
        appliedAt: '2025-10-05'
      },
      {
        id: 2,
        name: 'Sana Khan',
        email: 'sana@example.com',
        phone: '9988776655',
        appliedFor: 'Bar Manager',
        status: 'SHORTLISTED',
        appliedAt: '2025-10-02'
      }
    ];
  }

  // ---------------- JOBS ----------------
  openCreateJob() {
    this.editingJob = {
      title: '',
      department: '',
      vacancies: 1,
      salaryRange: '',
      location: '',
      postedAt: new Date().toISOString().slice(0, 10),
      status: 'OPEN',
      description: ''
    };
    this.showJobModal = true;
  }

  openEditJob(job: JobPost) {
    this.editingJob = { ...job };
    this.showJobModal = true;
  }

  saveJob() {
    if (!this.editingJob) return;
    const j = this.editingJob;
    if (!j.title || !j.department) { alert('Title & Department required'); return; }
    if (j.id) {
      const idx = this.jobs.findIndex(x => x.id === j.id);
      if (idx > -1) this.jobs[idx] = { ...(this.jobs[idx]), ...(j as JobPost) };
    } else {
      const newJob: JobPost = {
        id: this.jobs.length + 1,
        title: j.title!,
        department: j.department!,
        vacancies: Number(j.vacancies || 1),
        salaryRange: j.salaryRange || '',
        location: j.location || '',
        postedAt: j.postedAt || new Date().toISOString().slice(0,10),
        status: (j.status as JobStatus) || 'OPEN',
        description: j.description || ''
      };
      this.jobs.unshift(newJob);
    }
    this.showJobModal = false;
    this.editingJob = null;
    alert('Job saved');
  }

  deleteJob(job: JobPost) {
    if (!confirm(`Delete job "${job.title}"?`)) return;
    this.jobs = this.jobs.filter(j => j.id !== job.id);
  }

  toggleJobStatus(job: JobPost) {
    job.status = job.status === 'OPEN' ? 'CLOSED' : 'OPEN';
  }

  // ---------------- APPLICANTS ----------------
  viewApplicant(a: Applicant) {
    this.viewingApplicant = a;
    this.showApplicantModal = true;
  }

  shortlistApplicant(a: Applicant) {
    a.status = 'SHORTLISTED';
  }

  hireApplicant(a: Applicant) {
    a.status = 'HIRED';
  }

  rejectApplicant(a: Applicant) {
    a.status = 'REJECTED';
  }

  deleteApplicant(a: Applicant) {
    if (!confirm(`Remove applicant ${a.name}?`)) return;
    this.applicants = this.applicants.filter(x => x.id !== a.id);
  }

  // ---------------- FILE handling for applicant resume/photo ----------------
  onResumeSelected(ev: any, applicant?: Applicant) {
    const f = ev.target?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (applicant) {
        applicant.resume = e.target.result;
      } else {
        this.resumePreview = e.target.result;
      }
    };
    reader.readAsDataURL(f);
  }

  onPhotoSelected(ev: any, applicant?: Applicant) {
    const f = ev.target?.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (e: any) => {
      if (applicant) {
        applicant.photo = e.target.result;
      } else {
        this.photoPreview = e.target.result;
      }
    };
    reader.readAsDataURL(f);
  }

  // ---------------- FILTERS / HELPERS ----------------
  filteredJobs(): JobPost[] {
    let res = this.jobs;
    if (this.jobFilter !== 'ALL') res = res.filter(j => j.status === this.jobFilter);
    if (this.searchQuery) res = res.filter(j => j.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
    return res;
  }

  filteredApplicants(): Applicant[] {
    let res = this.applicants;
    if (this.applicantFilter !== 'ALL') res = res.filter(a => a.status === this.applicantFilter);
    if (this.searchQuery) res = res.filter(a => a.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
    return res;
  }
}
