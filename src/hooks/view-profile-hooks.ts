import {useCallback, useEffect, useMemo, useState} from 'react';
import {UserAPIController} from '../api/user-api/user.controller';
import {UserAPIRequestImpl} from '../api/user-api/user.request';
import {IViewProfileForm} from '../pages/view-profile/view-profile-interface';

export function useViewProfile(id?: string) {
  const request = useMemo(() => new UserAPIRequestImpl(), []);
  const controller = useMemo(() => new UserAPIController(request), [request]);
  const [profileDetails, setProfileDetails] = useState<IViewProfileForm | null>(
    null,
  );
  const [allProfiles, setAllProfiles] = useState<IViewProfileForm[] | null>();

  const getProfileData = useCallback(
    async (profileId: string) => {
      const response = await controller.viewProfile(profileId);

      setProfileDetails(response);
    },
    [controller],
  );

  useEffect(() => {
    if (id) {
      getProfileData(id);
    }
  }, [getProfileData, id]);
  const getAllProfiles = useCallback(async () => {
    const response = await controller.viewAllProfiles();
    response && setAllProfiles(response);
    return response;
  }, [controller]);
  useEffect(() => {
    getAllProfiles();
  }, [getAllProfiles]);

  return {
    profileDetails,
    getAllProfiles,
    allProfiles,
  };
}
