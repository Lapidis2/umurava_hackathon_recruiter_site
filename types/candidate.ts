export interface Candidate {
  id: number;
  name: string;
  email: string;
  role: string;
  aiScore: number;
  skillsMatch: number;
  experience: number;
  education: string;
  status: 'Screened' | 'Shortlisted' | 'Emailed' | 'Interview' | 'Hired' | 'Rejected';
  avatar: string;
  workExperience: number;
  educationFit: number;
  cultureFit: number;
}