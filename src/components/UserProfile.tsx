import React, { useState } from 'react';
import { UserProfile as UserProfileType } from '../types';

interface Props {
  onComplete: () => void;
}

export const UserProfile: React.FC<Props> = ({ onComplete }) => {
  const [profile, setProfile] = useState<UserProfileType>({
    fullName: '',
    employeeId: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Criar Perfil</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nome Completo
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={profile.fullName}
              onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Matrícula
            </label>
            <input
              type="text"
              required
              className="w-full p-2 border rounded"
              value={profile.employeeId}
              onChange={(e) => setProfile({ ...profile, employeeId: e.target.value })}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Salvar Perfil
          </button>
        </form>
      </div>
    </div>
  );
};