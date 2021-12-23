import React from 'react';
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

import {IEditProfile} from './edit-profile.interface';

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

  const onFinish = (fieldValues: any) => {
    const values = {
      ...fieldValues,
      start: fieldValues.start.format('YYYY-MM-DD'),
      end: fieldValues?.end?.format('YYYY-MM-DD'),
    };
    console.log(fieldValues);
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

  return (
    <Formik
      initialValues={initialProfileData}
      enableReinitialize
      onSubmit={(values, {setSubmitting}) => {
        onFinish(values);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
        /* and other goodies */
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
          scrollToFirstError
        >
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
                ]}
              >
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
                ]}
              >
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
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tagLine"
            label="Tag Line"
            rules={[
              {
                required: true,
                message: 'Please input tag line',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <br />
          <Divider orientation="right">Work Experiences</Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="company"
                label="Company"
                rules={[
                  {
                    required: true,
                    message: 'Where do you work?',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[
                  {
                    required: true,
                    message: "What's your role at your workplace?",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Start"
                name="start"
                rules={[
                  {
                    type: 'object' as const,
                    required: true,
                    message: 'Please select start',
                  },
                ]}
              >
                <DatePicker />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Col span={24}>
                <Form.Item
                  noStyle
                  shouldUpdate={(prevValues, currentValues) =>
                    prevValues.currentPosition !== currentValues.currentPosition
                  }
                >
                  {({getFieldValue}) =>
                    getFieldValue('currentPosition') === false ? (
                      <Form.Item
                        label="End"
                        name="end"
                        rules={[
                          {
                            type: 'object' as const,
                            required: true,
                            message: 'Please select end',
                          },
                        ]}
                        style={{marginBottom: 8}}
                      >
                        <DatePicker />
                      </Form.Item>
                    ) : (
                      <Form.Item label="End" style={{marginBottom: 8}}>
                        <Input value="Currently works here." disabled />
                      </Form.Item>
                    )
                  }
                </Form.Item>

                <Form.Item name="currentPosition" valuePropName="checked">
                  <Checkbox>I currently work here</Checkbox>
                </Form.Item>
              </Col>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input description of your work here.',
              },
            ]}
          >
            <Input.TextArea showCount maxLength={300} />
          </Form.Item>

          <Form.List
            name="skills"
            rules={[
              {
                validator: async (_, names) => {
                  if (!names || names.length < 3) {
                    return Promise.reject(new Error('Enter at least 3 skills'));
                  }
                  return null;
                },
              },
            ]}
          >
            {(fields, {add, remove}, {errors: errors_}) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    {...(index === 0
                      ? formItemLayoutSkill
                      : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Skills' : ''}
                    required={false}
                    key={field.key}
                  >
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
                      noStyle
                    >
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
                    icon={<PlusOutlined />}
                  >
                    Add skill
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
