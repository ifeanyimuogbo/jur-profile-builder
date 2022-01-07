import {Form} from 'antd';
import moment from 'moment';
import {useCallback, useEffect, useMemo, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {UserAPIController} from '../api/user-api/user.controller';
import {UserAPIRequestImpl} from '../api/user-api/user.request';
import {
  IEditProfileForm,
  IWorkExperience,
} from '../pages/edit-profile/edit-profile.interface';
import {paths} from '../routes/paths';

export function useEditProfile(id?: string) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const initialValues = useMemo(
    () => ({
      firstName: '',
      lastName: '',
      email: '',
      tagLine: '',

      workExperiences: [
        {
          company: '',
          role: '',
          start: null,
          end: null,
          currentPosition: false,
          description: '',
          skills: [''],
        },
      ],
    }),
    [],
  );

  const [initialProfileData, setInitialProfileData] =
    useState<IEditProfileForm>(initialValues);
  useEffect(() => {
    form.setFieldsValue(initialProfileData);
  }, [form, initialProfileData]);
  const request = useMemo(() => new UserAPIRequestImpl(), []);
  const controller = useMemo(() => new UserAPIController(request), [request]);

  // Edit profile
  const handleSubmitForm = async (data: IEditProfileForm) => {
    const response = await controller.editProfile(data.email, data);
    response && navigate(`${paths.viewProfile}/${id ? id : data.email}`);
  };

  // Get profile data
  const getProfileData = useCallback(
    async (profileId: string) => {
      const response = await controller.viewProfile(profileId);
      response &&
        setInitialProfileData({
          ...response,
          workExperiences: response.workExperiences.map(
            (workExperience: IWorkExperience) => ({
              ...workExperience,

              start: moment(workExperience?.start),
              end: moment(workExperience?.end),
            }),
          ),
        });
    },
    [controller],
  );
  useEffect(() => {
    if (id) {
      getProfileData(id);
    }
  }, [getProfileData, id]);
  return {initialProfileData, handleSubmitForm, form};
}
