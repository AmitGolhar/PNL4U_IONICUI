export interface JobApplication {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  resumeUrl?: string;
  status: 'Pending' | 'Reviewed' | 'Accepted' | 'Rejected';
}
