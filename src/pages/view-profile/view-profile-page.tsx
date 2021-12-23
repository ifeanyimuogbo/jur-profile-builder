import {Breadcrumb, Button, Col, Descriptions, Divider, Row} from 'antd';
import moment from 'moment';
import React, {FC, memo} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {useViewProfile} from '../../hooks/view-profile-hooks';
import {paths} from '../../routes/paths';
import {IViewProfile} from './view-profile-interface';

export const ViewProfile: FC<IViewProfile> = memo((): JSX.Element => {
  const {id} = useParams();
  const navigate = useNavigate();

  const {profileDetails} = useViewProfile(id);
  return (
    <div>
      <Divider orientation="left">View Profile</Divider>

      <Row justify="center" align="top">
        <Col span={12}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>{id}</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/">View profile</a>
            </Breadcrumb.Item>
          </Breadcrumb>
          <br />
          <Descriptions title="Bio" layout="vertical">
            <Descriptions.Item label="Full Name">{`${profileDetails?.firstName} ${profileDetails?.lastName}`}</Descriptions.Item>
            <Descriptions.Item label="Email Address">
              {profileDetails?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Tag Line">
              {profileDetails?.tagLine}
            </Descriptions.Item>
          </Descriptions>
          <br />
          <Descriptions title="Work Experiences" layout="vertical">
            <Descriptions.Item label="Company">
              {profileDetails?.company}
            </Descriptions.Item>
            <Descriptions.Item label="Role">
              {profileDetails?.role}
            </Descriptions.Item>
            <Descriptions.Item label="Duration">
              {`${moment(profileDetails?.start).format('YYYY/MM/DD')} - ${
                profileDetails?.currentPosition
                  ? 'Current'
                  : moment(profileDetails?.end).format('YYYY/MM/DD')
              }`}
            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {profileDetails?.description}
            </Descriptions.Item>
            <Descriptions.Item label="Skills">
              {profileDetails?.skills.join(', ')}
            </Descriptions.Item>
          </Descriptions>
          <Button
            type="primary"
            htmlType="button"
            onClick={() => navigate(`${paths.editProfile}/${id}`)}
            block
          >
            Edit Profile
          </Button>
          <div style={{marginBottom: 16}} />

          <Button
            type="ghost"
            htmlType="button"
            onClick={() => navigate(paths.home)}
            block
          >
            Go Home
          </Button>
        </Col>
      </Row>
    </div>
  );
});
