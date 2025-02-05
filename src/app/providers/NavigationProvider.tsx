import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { setNavigate } from '../../shared/lib/navigationService';

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <>{children}</>;
};
