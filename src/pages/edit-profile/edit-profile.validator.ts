import {object, string, date, array, boolean} from 'yup';
// Legacy code -- should delete
export class EditProfileValidatorSchema {
  static get workExperiences() {
    return object().shape({
      company: string().required(),
      role: string().required(),
      start: date().required(),
      end: date().required(),
      currentPosition: boolean(),
      description: string()
        .min(2, 'Minimum of 10 characters')
        .max(90, 'Maximum of 100 characters')
        .required('Describe your work at this company'),
      skills: array().of(string()),
    });
  }
  static get editProfile() {
    return object().shape({
      firstName: string()
        .min(2, 'Minimum of 2 characters')
        .max(90, 'Maximum of 90 characters')
        .required('Fill in your first name'),
      lastName: string()
        .min(2, 'Minimum of 2 characters')
        .max(90, 'Maximum of 90 characters')
        .required('Fill in your first name'),
      email: string().email().required('Provide your email address'),
      tagLine: string().required('Please, supply a tag line'),
      workExperiences: array().of(EditProfileValidatorSchema.workExperiences),
    });
  }
}
