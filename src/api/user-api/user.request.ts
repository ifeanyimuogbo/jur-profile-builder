import {BaseRequest} from '../../config/request';

export interface IUserAPIRequest extends BaseRequest {
  editProfile(id: string, data: any): Promise<any>;
  viewProfile(id: string): Promise<any>;
  viewAllProfiles(): Promise<any>;
}

export class UserAPIRequestImpl extends BaseRequest implements IUserAPIRequest {
  async editProfile(id: string, data: any) {
    const users_ = await localStorage.getItem('users');
    const users = users_ ? JSON.parse(users_) : [];
    await localStorage.setItem('users', JSON.stringify([...users, data]));
    return 'Profile edited successfully';
  }

  async viewProfile(id: string) {
    const response = await localStorage.getItem('users');
    console.log(response);
    console.log(id);

    if (response) {
      console.log(
        JSON.parse(response).filter((user: any) => user.email === id)[0],
      );
      return JSON.parse(response).filter((user: any) => user.email === id)[0];
    }
  }
  async viewAllProfiles() {
    const response = await localStorage.getItem('users');

    if (response) {
      return JSON.parse(response);
    }
  }
}
