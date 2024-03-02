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
