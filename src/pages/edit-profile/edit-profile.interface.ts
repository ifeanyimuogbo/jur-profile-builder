export interface IEditProfile {
  id?: string;
}

export interface IWorkExperience {
  company: string;
  role: string;
  start: any;
  end: any;
  currentPosition?: boolean;
  description: string;
  skills: string[];
}
export interface IEditProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  tagLine: string;
  workExperiences: IWorkExperience[];
}
export interface IEditProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  tagLine?: string;
  workExperiences?: {
    company?: string;
    role?: string;
    start?: any;
    end?: any;
    currentPosition?: boolean;
    description?: string;
    skills?: string[];
  }[];
}
export interface IWorkExperienceComponent {
  experienceName: number;
  experienceRestField: any;
}
