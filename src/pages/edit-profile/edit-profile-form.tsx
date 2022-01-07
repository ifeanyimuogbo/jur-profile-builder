import React, {useEffect} from 'react';
import {
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Divider,
  DatePicker,
} from 'antd';
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons';
import {Formik} from 'formik';
import {useEditProfile} from '../../hooks/edit-profile-hooks';

import {
  IEditProfile,
  IEditProfileForm,
  IWorkExperience,
  IWorkExperienceComponent,
} from './edit-profile.interface';

const formItemLayout = {
  labelCol: {
    xs: {span: 24},
    sm: {span: 8},
  },
  wrapperCol: {
    xs: {span: 24},
    sm: {span: 24},
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 24,
    },
  },
};

export const EditProfileForm = ({id}: IEditProfile) => {
  const {initialProfileData, handleSubmitForm, form} = useEditProfile(id);

  const onFinish = (fieldValues: IEditProfileForm) => {
    const values = {
      ...fieldValues,
      workExperiences: fieldValues?.workExperiences?.map(
        (workExperience: IWorkExperience) => ({
          ...workExperience,
          start: workExperience?.start?.format('YYYY-MM-DD'),
          end: workExperience?.end?.format('YYYY-MM-DD'),
        }),
      ),
    };
    handleSubmitForm(values);
  };

  const formItemLayoutSkill = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20},
      md: {span: 8},
    },
  };
  const formItemLayoutWithOutLabel = {
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 20},
      md: {span: 8},
    },
  };

  const WorkExperience = ({
    experienceName,
    experienceRestField,
  }: IWorkExperienceComponent) => (
    <Col span={24} style={{backgroundColor: '#f9f7f7'}}>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Company"
            {...experienceRestField}
            name={[experienceName, 'company']}
            rules={[
              {
                required: true,
                message: 'Where do you work?',
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={[experienceName, 'role']}
            label="Role"
            rules={[
              {
                required: true,
                message: "What's your role at your workplace?",
              },
            ]}>
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Start"
            name={[experienceName, 'start']}
            rules={[
              {
                type: 'object' as const,
                required: true,
                message: 'Please select start',
              },
            ]}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Col span={24}>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.workExperiences[experienceName]?.currentPosition !==
                currentValues.workExperiences[experienceName]?.currentPosition
              }>
              {({getFieldValue}) =>
                getFieldValue('workExperiences')[experienceName]
                  ?.currentPosition === false ? (
                  <Form.Item
                    label="End"
                    name={[experienceName, 'end']}
                    rules={[
                      {
                        type: 'object' as const,
                        required: true,
                        message: 'Please select end',
                      },
                    ]}
                    style={{marginBottom: 8}}>
                    <DatePicker />
                  </Form.Item>
                ) : (
                  <Form.Item label="End" style={{marginBottom: 8}}>
                    <Input value="Currently works here." disabled />
                  </Form.Item>
                )
              }
            </Form.Item>

            <Form.Item
              name={[experienceName, 'currentPosition']}
              valuePropName="checked">
              <Checkbox>I currently work here</Checkbox>
            </Form.Item>
          </Col>
        </Col>
      </Row>
      <Form.Item
        name={[experienceName, 'description']}
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please input description of your work here.',
          },
        ]}>
        <Input.TextArea showCount maxLength={300} />
      </Form.Item>

      <Form.List
        name={[experienceName, 'skills']}
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 3) {
                return Promise.reject(new Error('Enter at least 3 skills'));
              }
              return null;
            },
          },
        ]}>
        {(fields, {add, remove}, {errors: errors_}) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0
                  ? formItemLayoutSkill
                  : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Skills' : ''}
                required={false}
                key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Please input skill or delete this field.',
                    },
                  ]}
                  noStyle>
                  <Input
                    placeholder="Skill (e.g React)"
                    style={{width: '100%'}}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{width: '60%'}}
                icon={<PlusOutlined />}>
                Add skill
              </Button>
              <Form.ErrorList errors={errors_} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Col>
  );

  return (
    <Formik
      initialValues={initialProfileData}
      enableReinitialize
      onSubmit={(values, {setSubmitting}) => {
        onFinish(values);
      }}>
      {({
        values,

        handleChange,
        handleBlur,
      }) => (
        <Form
          {...formItemLayout}
          form={form}
          name="editProfile"
          onFinish={onFinish}
          onChange={handleChange}
          onBlur={handleBlur}
          layout="vertical"
          size="large"
          initialValues={values}
          scrollToFirstError>
          <Divider orientation="right">Bio</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First Name"
                rules={[
                  {
                    required: true,
                    message: 'Please, input your first name.',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last Name"
                rules={[
                  {
                    required: true,
                    message: 'Please, input your last name.',
                  },
                ]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: 'email',
                message: 'This input is not a valid E-mail!',
              },
              {
                required: true,
                message: 'Please input your E-mail!',
              },
            ]}>
            <Input disabled={id ? true : false} />
          </Form.Item>

          <Form.Item
            name="tagLine"
            label="Tag Line"
            rules={[
              {
                required: true,
                message: 'Please input tag line',
              },
            ]}>
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <br />
          <Divider orientation="right">Work Experiences</Divider>
          <Form.List
            name="workExperiences"
            rules={[
              {
                validator: async (_, experiences) => {
                  if (!experiences || experiences.length < 1) {
                    return Promise.reject(
                      new Error('Enter at least 1 work experience'),
                    );
                  }
                  return null;
                },
              },
            ]}>
            {(fields, {add, remove}, {errors: errors_}) => (
              <>
                {fields.map(({key, name, ...restField}, index) => (
                  <Form.Item
                    label={index === 0 ? 'Work experiences' : ''}
                    required={false}
                    key={key}>
                    <WorkExperience
                      experienceName={name}
                      experienceRestField={restField}
                    />
                    {fields.length > 1 ? (
                      <span onClick={() => remove(name)}>
                        {' '}
                        <MinusCircleOutlined className="dynamic-delete-button" />{' '}
                        Remove this work experience
                      </span>
                    ) : null}
                  </Form.Item>
                ))}
                <br />
                <Form.Item>
                  <Button
                    type="ghost"
                    onClick={() =>
                      add({
                        company: '',
                        role: '',
                        start: null,
                        end: null,
                        currentPosition: false,
                        description: '',
                        skills: [''],
                      })
                    }
                    style={{width: '100%'}}
                    icon={<PlusOutlined />}>
                    Add another work experience
                  </Button>
                  <Form.ErrorList errors={errors_} />
                </Form.Item>
              </>
            )}
          </Form.List>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" block>
              Save
            </Button>
          </Form.Item>
        </Form>
      )}
    </Formik>
  );
};
