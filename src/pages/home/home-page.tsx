import {EditOutlined, EyeFilled, PlusCircleFilled} from '@ant-design/icons';
import {Row, Col, Avatar, Card, Divider, Button} from 'antd';
import Meta from 'antd/lib/card/Meta';
import {useNavigate} from 'react-router-dom';
import {useViewProfile} from '../../hooks/view-profile-hooks';
import {paths} from '../../routes/paths';
import {IViewProfileForm} from '../view-profile/view-profile-interface';

export const HomePage = () => {
  const {allProfiles} = useViewProfile();
  const navigate = useNavigate();
  return (
    <div>
      <Divider orientation="left">Jur Profile Builder</Divider>
      <Row justify="center">
        <Col span={12}>
          {allProfiles?.map((profile: IViewProfileForm) => (
            <>
              <Card
                style={{width: 300, margin: 16}}
                cover={
                  <img
                    alt="example"
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
                  />
                }
                actions={[
                  <EditOutlined
                    key="edit"
                    onClick={() =>
                      navigate(`${paths.editProfile}/${profile.email}`)
                    }
                  />,
                  <EyeFilled
                    key="view"
                    onClick={() =>
                      navigate(`${paths.viewProfile}/${profile.email}`)
                    }
                  />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                  title={`${profile.firstName} ${profile.lastName}`}
                  description={`${profile.tagLine}`}
                />
              </Card>
            </>
          ))}
          {!!allProfiles && (
            <PlusCircleFilled
              style={{fontSize: '300%'}}
              onClick={() => navigate(paths.editProfile)}
            />
          )}
          {(allProfiles?.length === 0 || !allProfiles) && (
            <>
              <p>No profiles created yet.</p>
              <Button
                type="ghost"
                htmlType="button"
                onClick={() => navigate(paths.editProfile)}
                block
              >
                Create/Edit a profile
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
