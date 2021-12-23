import {Button, Col, Divider, Row} from 'antd';
import React, {FC, memo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {paths} from '../../routes/paths';
import {EditProfileForm} from './edit-profile-form';
import {IEditProfile} from './edit-profile.interface';

export const EditProfile: FC<IEditProfile> = memo((): JSX.Element => {
  const navigate = useNavigate();
  const {id} = useParams();
  return (
    <div>
      <Divider orientation="left">Edit Profile</Divider>
      <Row justify="center" align="top">
        <Col span={12}>
          <EditProfileForm id={id} />
          {id && (
            <>
              <Button
                type="dashed"
                htmlType="button"
                onClick={() => navigate(`${paths.viewProfile}/${id}`)}
                block
              >
                View Profile
              </Button>
              <div style={{marginBottom: 16}} />
            </>
          )}

          <Button
            type="ghost"
            htmlType="button"
            onClick={() => navigate(paths.home)}
            block
          >
            Go Home
          </Button>
          <div style={{marginBottom: 16}} />
        </Col>
      </Row>
    </div>
  );
});
