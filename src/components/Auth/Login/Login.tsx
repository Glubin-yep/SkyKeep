import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import "../Auth.css";
import Layout from "antd/es/layout/layout";
import logo from "../../../assets/logo.svg";
import AuthService from "../../../service/AuthService";
import { GithubOutlined } from "@ant-design/icons";

const onFinish = async (values: any) => {
  AuthService.login(values.email, values.password)
    .then(() => {
      return (window.location.href = "/");
    })
    .catch((error) => {
      console.error("Error during login:", error);
    });
};

const onGithubLogin = () => {
  AuthService.GithubLogin();
};

function Login() {
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
            { required: true, message: "Please input your Username!" },
            { min: 6, message: "Min lenght 6!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
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
          Or <a href="/auth/registration">register now!</a>
          <Button
            icon={<GithubOutlined />}
            onClick={onGithubLogin}
            className="login-form-button"
          >
            Log in with GitHub
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
}

export default Login;
