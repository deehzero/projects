import React, { useState, useEffect } from 'react';
import { WorkSchedule, TimeRecord, WorkStatus } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface Props {
  schedule: WorkSchedule;
}

export const TimeRegistration: React.FC<Props> = ({ schedule }) => {
  const [status, setStatus] = useState<WorkStatus>('notStarted');
  const [currentRecord, setCurrentRecord] = useState<Partial<TimeRecord>>({
    date: new Date().toISOString().split('T')[0],
  });
  const { setTheme } = useTheme();

  useEffect(() => {
    switch (status) {
      case 'working':
        setTheme('theme-working');
        break;
      case 'break':
        setTheme('theme-break');
        break;
      case 'finished':
        setTheme('theme-finished');
        break;
      default:
        setTheme('theme-default');
    }
  }, [status, setTheme]);

  const parseTime = (timeStr: string): Date => {
    const [hours, minutes, seconds] = timeStr.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes, seconds);
    return date;
  };

  const calculateTotalHours = (record: TimeRecord): number => {
    const start = parseTime(record.startTime);
    const end = parseTime(record.endTime);
    const breakStart = parseTime(record.breakStartTime);
    const breakEnd = parseTime(record.breakEndTime);

    const totalMinutes = 
      ((end.getTime() - start.getTime()) - 
      (breakEnd.getTime() - breakStart.getTime())) / (1000 * 60);

    return Number((totalMinutes / 60).toFixed(2));
  };

  const saveRecord = (record: TimeRecord) => {
    const records = JSON.parse(localStorage.getItem('timeRecords') || '[]');
    records.push(record);
    localStorage.setItem('timeRecords', JSON.stringify(records));
    // Dispara evento para atualizar o histórico
    window.dispatchEvent(new Event('storage'));
  };

  const handleTimeRegistration = () => {
    const now = new Date().toLocaleTimeString();

    switch (status) {
      case 'notStarted':
        setCurrentRecord({ ...currentRecord, startTime: now });
        setStatus('working');
        break;
      case 'working':
        if (!currentRecord.breakStartTime) {
          setCurrentRecord({ ...currentRecord, breakStartTime: now });
          setStatus('break');
        } else {
          const completeRecord = {
            ...currentRecord,
            endTime: now,
          } as TimeRecord;
          
          const finalRecord = {
            ...completeRecord,
            totalHours: calculateTotalHours(completeRecord),
          };

          saveRecord(finalRecord);
          setStatus('finished');
        }
        break;
      case 'break':
        setCurrentRecord({ ...currentRecord, breakEndTime: now });
        setStatus('working');
        break;
      case 'finished':
        setStatus('notStarted');
        setCurrentRecord({ date: new Date().toISOString().split('T')[0] });
        break;
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'notStarted':
        return 'Iniciar Expediente';
      case 'working':
        return currentRecord.breakStartTime ? 'Finalizar Expediente' : 'Iniciar Pausa';
      case 'break':
        return 'Retornar da Pausa';
      case 'finished':
        return 'Iniciar Novo Registro';
      default:
        return 'Registrar Ponto';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'notStarted':
        return 'Aguardando início do expediente';
      case 'working':
        return 'Trabalhando';
      case 'break':
        return 'Em pausa';
      case 'finished':
        return 'Expediente finalizado';
      default:
        return 'Status desconhecido';
    }
  };

  const getButtonColor = () => {
    switch (status) {
      case 'working':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'break':
        return 'bg-green-500 hover:bg-green-600';
      case 'finished':
        return 'bg-pink-500 hover:bg-pink-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Registro de Ponto</h2>
      <div className="mb-6 space-y-2">
        <p className="text-gray-600">
          <span className="font-semibold">Escala:</span> {schedule.name}
        </p>
        <p className="text-gray-600">
          <span className="font-semibold">Status:</span> {getStatusText()}
        </p>
        {currentRecord.startTime && (
          <p className="text-gray-600">
            <span className="font-semibold">Entrada:</span> {currentRecord.startTime}
          </p>
        )}
        {currentRecord.breakStartTime && (
          <p className="text-gray-600">
            <span className="font-semibold">Início da Pausa:</span> {currentRecord.breakStartTime}
          </p>
        )}
        {currentRecord.breakEndTime && (
          <p className="text-gray-600">
            <span className="font-semibold">Fim da Pausa:</span> {currentRecord.breakEndTime}
          </p>
        )}
      </div>
      <button
        onClick={handleTimeRegistration}
        className={`w-full text-white py-3 px-4 rounded-lg transition-colors ${getButtonColor()}`}
      >
        {getButtonText()}
      </button>
    </div>
  );
};