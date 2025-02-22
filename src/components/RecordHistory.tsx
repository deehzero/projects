import React, { useState, useEffect } from 'react';
import { TimeRecord, UserProfile } from '../types';

export const RecordHistory: React.FC = () => {
  const [records, setRecords] = useState<TimeRecord[]>([]);
  const userProfile = JSON.parse(localStorage.getItem('userProfile') || '{}') as UserProfile;

  useEffect(() => {
    const loadRecords = () => {
      const savedRecords = JSON.parse(localStorage.getItem('timeRecords') || '[]');
      setRecords(savedRecords.sort((a: TimeRecord, b: TimeRecord) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      ));
    };

    loadRecords();
    window.addEventListener('storage', loadRecords);
    
    return () => {
      window.removeEventListener('storage', loadRecords);
    };
  }, []);

  const formatDate = (dateStr: string): string => {
    return new Date(dateStr).toLocaleDateString('pt-BR');
  };

  const formatTime = (timeStr: string): string => {
    return timeStr.split(':').slice(0, 2).join(':');
  };

  const formatHours = (hours: number): string => {
    const integerPart = Math.floor(hours);
    const decimalPart = Math.round((hours - integerPart) * 60);
    return `${integerPart}h${decimalPart.toString().padStart(2, '0')}min`;
  };

  const exportRecords = () => {
    const csvContent = [
      ['Nome', 'Matrícula', '', '', '', '', ''].join(';'),
      [`${userProfile.fullName}`, `${userProfile.employeeId}`, '', '', '', '', ''].join(';'),
      ['', '', '', '', '', '', ''].join(';'),
      ['Data', 'Entrada', 'Início Pausa', 'Fim Pausa', 'Saída', 'Total Horas', 'Colaborador'].join(';'),
      ...records.map(record => [
        formatDate(record.date),
        formatTime(record.startTime),
        formatTime(record.breakStartTime),
        formatTime(record.breakEndTime),
        formatTime(record.endTime),
        formatHours(record.totalHours),
        userProfile.fullName
      ].join(';'))
    ].join('\n');

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `registros-ponto-${userProfile.employeeId}-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Histórico de Registros</h2>
        <button
          onClick={exportRecords}
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition-colors"
        >
          Exportar CSV
        </button>
      </div>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Entrada
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Início Pausa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fim Pausa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Saída
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Horas
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {records.map((record, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatDate(record.date)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatTime(record.startTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatTime(record.breakStartTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatTime(record.breakEndTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatTime(record.endTime)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatHours(record.totalHours)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};