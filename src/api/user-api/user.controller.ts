import {IUserAPIRequest} from './user.request';

export class UserAPIController {
  constructor(private readonly request: IUserAPIRequest) {}

  async editProfile(id: string, data: any) {
    try {
      const response = await this.request.editProfile(id, data);
      return response;
    } catch (err: any) {
      return err;
    }
  }

  async viewProfile(id: string) {
    try {
      const response = await this.request.viewProfile(id);
      return response;
    } catch (err: any) {
      return err;
    }
  }
  async viewAllProfiles() {
    try {
      const response = await this.request.viewAllProfiles();
      return response;
    } catch (err: any) {
      return err;
    }
  }
}
