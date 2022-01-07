import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Statistic,
} from 'antd';
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
        <Col xs={22} sm={20} md={18} lg={16} xl={12}>
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
          <Col span={24}>
            {profileDetails?.workExperiences?.map(
              (workExperience: any, index: number) => (
                <Col
                  span={24}
                  key={workExperience?.company + index}
                  style={{marginBottom: 16}}>
                  <Card>
                    <Row gutter={16}>
                      <Col span={12}>
                        <Statistic
                          title="Company"
                          value={workExperience?.company}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Duration"
                          value={`${moment(workExperience?.start).format(
                            'YYYY/MM/DD',
                          )} - ${
                            workExperience?.currentPosition
                              ? 'Current'
                              : moment(workExperience?.end).format('YYYY/MM/DD')
                          }`}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic title="Role" value={workExperience?.role} />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Description"
                          value={workExperience?.description}
                        />
                      </Col>
                      <Col span={12}>
                        <Statistic
                          title="Skills"
                          value={workExperience?.skills.join(', ')}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ),
            )}
          </Col>

          <Button
            type="primary"
            htmlType="button"
            onClick={() => navigate(`${paths.editProfile}/${id}`)}
            block>
            Edit Profile
          </Button>
          <div style={{marginBottom: 16}} />

          <Button
            type="ghost"
            htmlType="button"
            onClick={() => navigate(paths.home)}
            block>
            Go Home
          </Button>
        </Col>
      </Row>
    </div>
  );
});
