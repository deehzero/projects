import React from 'react';
import { WorkSchedule } from '../types';

const WORK_SCHEDULES: WorkSchedule[] = [
  {
    id: '6x1-36',
    name: '6x1 - 36 horas semanais',
    hoursPerDay: 6,
    breakDuration: 20,
    daysPerWeek: 6,
  },
  {
    id: '6x1-44',
    name: '6x1 - 44 horas semanais',
    hoursPerDay: 7.33,
    breakDuration: 60,
    daysPerWeek: 6,
  },
  {
    id: '5x2-44-v1',
    name: '5x2 - 44 horas semanais (variante 1)',
    hoursPerDay: 9,
    breakDuration: 60,
    daysPerWeek: 5,
    specialRule: {
      dayOfWeek: 5,
      hoursPerDay: 8,
      breakDuration: 60,
    },
  },
  {
    id: '5x2-44-v2',
    name: '5x2 - 44 horas semanais (variante 2)',
    hoursPerDay: 8.8,
    breakDuration: 60,
    daysPerWeek: 5,
  },
];

interface Props {
  onSelect: (schedule: WorkSchedule) => void;
}

export const ScheduleSelection: React.FC<Props> = ({ onSelect }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Selecione sua Escala de Trabalho</h2>
      <div className="grid gap-4">
        {WORK_SCHEDULES.map((schedule) => (
          <button
            key={schedule.id}
            onClick={() => onSelect(schedule)}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="font-semibold">{schedule.name}</h3>
            <p className="text-sm text-gray-600">
              {schedule.hoursPerDay} horas diárias com {schedule.breakDuration} minutos de pausa
            </p>
            {schedule.specialRule && (
              <p className="text-sm text-gray-500 mt-2">
                *Regra especial para um dia da semana
              </p>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};