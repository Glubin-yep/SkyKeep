import type { FC, ReactNode } from 'react';
import AuthService from '../../service/AuthService';
import RegistrationPrompt from '../ErrorPage/AuthError';

interface AuthWrapperProps {
    children: ReactNode;
  }

const AuthWrapper: FC<AuthWrapperProps> = ({ children }) => {
    const  isAuthenticated  = AuthService.getAuthToken();
  
    if (!isAuthenticated ) {
      return <RegistrationPrompt/>;
    }

    return <>{children}</>;
  };
  

export default AuthWrapper;
