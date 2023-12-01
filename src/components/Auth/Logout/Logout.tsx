import { useState, useEffect } from "react";
import { FC } from "react";
import { Result, Button } from "antd";
import AuthService from "../../../service/AuthService";

interface LogoutProps {}

const Logout: FC<LogoutProps> = () => {
  const [isLogout, setIsLogout] = useState<boolean | null>(null);

  useEffect(() => {
    const performLogout = async () => {
        try {
          const logoutResult = await AuthService.logout();
          setIsLogout(logoutResult);
        } catch (error) {
          console.error("Logout error:", error);
          setIsLogout(false); 
        }
      };
      performLogout();
  }, []);

  const renderMessage = () => {
    if (isLogout === true) {
      return (
        <Result
          status="success"
          title="Logout Successful"
          subTitle="You have successfully logged out."
          extra={<a type="primary" href="/">Back to Home</a>}
        />
      );
    } else if (isLogout === false) {
      return (
        <Result
          status="error"
          title="Logout Failed"
          subTitle="Logout failed. Please try again."
          extra={<Button type="primary">Back to Home</Button>}
        />
      );
    }
    return null;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {renderMessage()}
    </div>
  );
};

export default Logout;
