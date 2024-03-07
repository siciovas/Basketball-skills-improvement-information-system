export interface Coach {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  education: string;
  specialization: string;
  rating: number;
  coachStatus: string;
  registerDate: string;
  description: string;
  experience: number;
  phoneNumber: string;
  trainingPlansCount: number;
}

export interface CoachProfile extends Coach {
  trainingPlans: TrainingPlanSummary[];
}

export interface TrainingPlanSummary {
  id: string;
  title: string;
  price: number;
  shortDescription: string;
}

export interface User {
  name?: string | undefined;
  surname?: string | undefined;
  email?: string | undefined;
  phoneNumber?: string | undefined;
  birthDate?: string | undefined;
  password?: string | undefined;
  height?: number | undefined;
  weight?: number | undefined;
  footSize?: number | undefined;
  metabolicAge?: number | undefined;
  education?: string | undefined;
  experience?: number | undefined;
  specialization?: number | undefined;
  description?: string | undefined;
}

export interface Complaint {
  id: string;
  text: string;
  date: string;
  studentFullName: string;
  coachFullName: string;
}
