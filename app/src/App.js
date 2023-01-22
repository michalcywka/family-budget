import React, { useEffect, useState } from 'react';
import { Button, Form, Layout, Input, notification } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Footer, Sider, Content } = Layout;

const API_URL = "http://127.0.0.1:8000/api"

const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: '10vh',
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle = {
  textAlign: 'center',
  minHeight: '80vh',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const footerStyle = {
  textAlign: 'center',
  minHeight: '10vh',
  color: '#fff',
  backgroundColor: '#7dbcea',
};

function App() {
  const [form] = Form.useForm();
  const [username, setUsername] = useState(undefined);
  const [headerBanner, setHeaderBanner] = useState(undefined);
  const [isLoginForm, setIsLoginForm] = useState(true); //false means "register mode"


  useEffect(() => {
    const logout = () => {setUsername(undefined)};
    const toggleRegisterForm = () => {setIsLoginForm(!isLoginForm)};
    const onFinish = async (values) => {
      if(isLoginForm){
      await fetch(`${API_URL}/try_login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: values.username, passwdhash: values.password })
      }).then((response) => {
        if(response.ok) {
        setUsername(values.username);
        }
        else {
          notification.open({
            message: 'Wrong credentials',
            description:
              'Wrong password or username',
          });
        }
      }).catch((err) => console.log("error"));

      console.log('Finish:', values);
    } else {
      await fetch(`${API_URL}/try_create_account`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: values.username, passwdhash: values.password })
      }).then((response) => {
        if(response.ok) {
          notification.open({
            message: 'Account has been created',
            description:
              'You can now use your credentials to log in.',
          });
        }
        else {
          notification.open({
            message: 'Wrong credentials',
            description:
              'Username already exists',
          });
        }
      }).catch((err) => console.log("error"));

      console.log('Finish:', values);
    }
    };
    const loginForm =
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (<>
            <Button
              type={isLoginForm ? "primary" : "default"}
              htmlType="submit"
            >
              {isLoginForm ? "Log in" : "Register"}
            </Button> 
            {" "}Or <Button style={{padding: "0px"}} type="link" onClick={toggleRegisterForm}>{isLoginForm ? "register now!" : "go back to login."}</Button></>)}
        </Form.Item>
      </Form>
      console.log(isLoginForm);
    setHeaderBanner(username ?
      <><span>Welcome {username}</span> <Button onClick={logout}>Log out</Button></> :
      <>{loginForm}</>);
  }, [form, username, isLoginForm]);

  return (
    <Layout>
      <Header style={headerStyle}>{headerBanner}</Header>
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Content style={contentStyle}>Content</Content>
      </Layout>
      <Footer style={footerStyle}>Family budget Example APP</Footer>
    </Layout>
  );
}

export default App;
