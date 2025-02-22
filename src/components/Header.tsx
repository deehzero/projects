import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { UserProfile } from '../types';

export const Header: React.FC = () => {
  const { theme } = useTheme();
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}') as UserProfile;
  
  return (
    <header className={`bg-white dark:bg-gray-800 shadow-md ${theme}`}>
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Controle de Jornada
          </h1>
          {userProfile.fullName && (
            <div className="text-sm text-gray-600 dark:text-gray-300 border-l border-gray-300 pl-4">
              <p className="font-medium">{userProfile.fullName}</p>
              <p className="text-xs">Matrícula: {userProfile.employeeId}</p>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};