import React, { useEffect, useState } from 'react';
import { Button, Form, Layout, Input, notification, Col, Card, Row } from 'antd';
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
  const [account, setAccount] = useState(undefined);
  const [headerBanner, setHeaderBanner] = useState(undefined);
  const [isLoginForm, setIsLoginForm] = useState(true); //false means "register mode"
  const [budgets, setBudgets] = useState(undefined);
  const [budgetCards, setBudgetCards] = useState(<></>)

  useEffect(() => {
    const getBudgets = async () => {
      await fetch(`${API_URL}/budget/${account.id}`, {
        method: 'GET',
      }).then((response) => {
        if (response.ok) {
          response.json().then(body => { console.log(body); setBudgets(body); })

        }
        else {
          console.log("Error fetching data")
        }
      })

    }
    if (account !== undefined) {
      getBudgets();
    }
  }, [account])

  useEffect(() => {
    if (account === undefined || budgets === undefined) {
      setBudgetCards(<></>);
    } else {
      console.log(budgets);
      let cards = budgets.map((budget) => {
        return (<Col span={8}>
          <Card title={budget.name} bordered={false}>
            {budget.income}
          </Card>
        </Col>)
      });
      console.log(cards);
      setBudgetCards(
        <div className="site-card-wrapper">
          <Row gutter={16}>
            {cards}
          </Row>
        </div>
      )
    }
  }, [account, budgets])
  useEffect(() => {
    const logout = () => { setAccount(undefined) };
    const toggleRegisterForm = () => { setIsLoginForm(!isLoginForm) };
    const onFinish = async (values) => {
      if (isLoginForm) {
        await fetch(`${API_URL}/account/try_login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: values.username, passwdhash: values.password })
        }).then((response) => {
          if (response.ok) {
            response.json().then(body => {
              console.log("response " + body);
              setAccount({ username: values.username, id: body.user_id });
            });
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
        await fetch(`${API_URL}/account/try_create_account`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: values.username, passwdhash: values.password })
        }).then((response) => {
          if (response.ok) {
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
            {" "}Or <Button style={{ padding: "0px" }} type="link" onClick={toggleRegisterForm}>{isLoginForm ? "register now!" : "go back to login."}</Button></>)}
        </Form.Item>
      </Form>
    setHeaderBanner(account ?
      <><span>Welcome {account.username}</span> <Button onClick={logout}>Log out</Button></> :
      <>{loginForm}</>);
  }, [form, account, isLoginForm]);

  return (
    <Layout>
      <Header style={headerStyle}>{headerBanner}</Header>
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Content style={contentStyle}>
          {budgetCards}
        </Content>
      </Layout>
      <Footer style={footerStyle}>Family budget Example APP</Footer>
    </Layout>
  );
}

export default App;
