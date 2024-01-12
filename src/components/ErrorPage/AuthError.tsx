import React from "react";
import { Alert, Space } from "antd";
import { Link } from "react-router-dom";

const RegistrationPrompt: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <Alert
        message="Authentication Required"
        description={
          <Space direction="vertical">
            <span>You need to register or log in to access this page.</span>
            <div>
              <Link to="/auth/registration">Register</Link> or{" "}
              <Link to="/auth/login">Log In</Link>
            </div>
          </Space>
        }
        type="warning"
        showIcon
      />
    </div>
  );
};

export default RegistrationPrompt;
