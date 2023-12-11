import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Layout, Form, Input, Checkbox, Button } from "antd";
import logo from "../../../assets/logo.svg";
import "../Auth.css";
import AuthService from "../../../service/AuthService";

function onFinish(values: any): void {
  AuthService.registration(values.email, values.firstName, values.lastName, values.password)
    .then(() => {
      return (window.location.href = "/");
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

const Registration: React.FC = () => {
  return (
    <Layout className="layout">
      <div className="logo-vertical">
        <img className="logo-image" src={logo} alt=" " />
        <span className="logo-text">Sky Keep</span>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: "Please input your Email!" },
            { min: 6, message: "Min lenght 6!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="firstName"
          rules={[
            { required: true, message: "Please input your First Name!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First Name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            { required: true, message: "Please input your Last Name!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last Name"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your Password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject("The two passwords do not match!");
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="/auth/login">Sing in now!</a>
        </Form.Item>
      </Form>
    </Layout>
  );
};

export default Registration;
