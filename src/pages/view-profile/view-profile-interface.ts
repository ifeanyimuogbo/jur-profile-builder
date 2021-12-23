export interface IViewProfile {}
export interface IViewProfileForm {
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
