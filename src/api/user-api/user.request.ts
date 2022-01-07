import {BaseRequest} from '../../config/request';

export interface IUserAPIRequest extends BaseRequest {
  editProfile(id: string, data: any): Promise<any>;
  viewProfile(id: string): Promise<any>;
  viewAllProfiles(): Promise<any>;
  deleteProfile(id: string): Promise<any>;
}

export class UserAPIRequestImpl extends BaseRequest implements IUserAPIRequest {
  async editProfile(id: string, data: any) {
    const users_ = await localStorage.getItem('users');
    let users = users_ ? JSON.parse(users_) : [];
    const index = users.findIndex((user: any) => user.email === id);
    if (index === -1) {
      await localStorage.setItem('users', JSON.stringify([...users, data]));
    } else {
      users[index] = data;
      await localStorage.setItem('users', JSON.stringify(users));
    }

    return 'Profile edited successfully';
  }

  async viewProfile(id: string) {
    const response = await localStorage.getItem('users');

    if (response) {
      return JSON.parse(response).filter((user: any) => user.email === id)[0];
    }
  }
  async viewAllProfiles() {
    const response = await localStorage.getItem('users');

    if (response) {
      return JSON.parse(response);
    }
  }
  async deleteProfile(id: string) {
    const users_ = await localStorage.getItem('users');
    let users = users_ ? JSON.parse(users_) : [];

    await localStorage.setItem(
      'users',
      JSON.stringify(users.filter((user: any) => user.email !== id)),
    );
    return 'Profile deleted successfully';
  }
}
