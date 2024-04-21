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
  gender: string;
  avatar: Blob;
  clientsCount: number;
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
  specialization?: string | undefined;
  description?: string | undefined;
  gender?: string | undefined;
  avatar?: Blob | undefined;
  role?: number | undefined;
}

export interface Complaint {
  id: string;
  text: string;
  date: string;
  studentFullName: string;
  coachFullName: string;
}

export interface MeDto {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  gender: string;
  birthDate: string;
  registerDate: string;
  avatar: Blob;
  additionalInfo: AdditionalInfo;
}

export interface AdditionalInfo {
  height: number | null;
  weight: number | null;
  footSize: number | null;
  metabolicAge: number | null;
  education: string | null;
  experience: number | null;
  specialization: string | null;
  rating: number | null;
  coachStatus: string | null;
  description: string | null;
}

export interface CheckoutDto {
  id: string;
  orderDate: string;
  coachFullName: string;
  studentFullName: string | null;
  trainingPlanTitle: string;
  price: number;
  commissionFee: number | null;
}
export interface Counts {
  coaches: number | null;
  students: number | null;
  trainingPlans: number | null;
  orders: number | null;
  commissions: { [key: number]: number };
}

export interface Orders {
  id: string;
  orderDate: string;
  coachFullName: string;
  studentFullName: string | null;
  trainingPlanTitle: string;
  price: number;
  commissionFee: number | null;
  isPaid: boolean | null;
}

export interface OrderedPlanInfo {
  id: string;
  orderDate: string;
  trainingPlanTitle: string;
  coachFullName: string;
  price: number;
  buyerFullName: string;
  phoneNumber: string;
  email: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  difficulty: string;
}

export interface GenericExerciseSkillInfo {
  id: string;
  name: string;
  isUsed: boolean;
}

export interface Skill {
  id: string;
  name: string;
  description: string;
  exercises: GenericExerciseSkillInfo[];
}

export interface TrainingPlanViewDto {
  id: string;
  title: string;
  description: string;
  price: number;
  coach: string;
  skills: TrainingPlanSkill[];
}

export interface TrainingPlanSkill {
  name: string;
  exercises: string[];
}

export interface CoachHomePageDto {
  trainingPlans: HomeData[];
  skills: HomeData[];
  exercises: HomeData[];
}

export interface HomeData {
  id: string;
  name: string;
}

export interface Feedback {
  id: string;
  feedbackText: string;
  date: string;
  rating: number;
  student: string;
}
export interface Statistics {
  registeredCoaches: { [key: number]: number };
  registeredStudents: { [key: number]: number };
  ordersAmount: { [key: number]: number };
  commissions: { [key: number]: number };
}

export interface TrainingPlanView {
  id: string;
  title: string;
  price: number;
  isActive: boolean;
}

export interface GenericSkillInfo {
  id: string;
  name: string;
}
