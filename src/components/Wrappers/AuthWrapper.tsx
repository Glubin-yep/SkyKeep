import { useState, type FC, type ReactNode, useEffect } from "react";
import AuthService from "../../service/AuthService";
import RegistrationPrompt from "../ErrorPage/AuthError";

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const isAuthenticated = await AuthService.isValidToken();
        setIsAuthenticated(isAuthenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, []);

  if (!isAuthenticated) {
    return <RegistrationPrompt />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
