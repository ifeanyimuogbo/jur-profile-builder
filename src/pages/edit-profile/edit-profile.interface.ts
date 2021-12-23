export interface IEditProfile {
  id?: string;
}
export interface IEditProfileForm {
  firstName: string;
  lastName: string;
  email: string;
  tagLine: string;
  company: string;
  role: string;
  start: any;
  end: any;
  currentPosition?: boolean;
  description: string;
  skills: string[];
}
export interface IEditProfileFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  tagLine?: string;
  company?: string;
  role?: string;
  start?: any;
  end?: any;
  currentPosition?: boolean;
  description?: string;
  skills?: string[];
}
