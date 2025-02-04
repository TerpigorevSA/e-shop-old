import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import { setNavigate } from '../../shared/lib/navigationService';

export const NavigationProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);

  return <>{children}</>;
};