export interface UserProfile {
  fullName: string;
  employeeId: string;
}

export interface TimeRecord {
  date: string;
  startTime: string;
  breakStartTime: string;
  breakEndTime: string;
  endTime: string;
  totalHours: number;
}

export interface WorkSchedule {
  id: string;
  name: string;
  hoursPerDay: number;
  breakDuration: number;
  daysPerWeek: number;
  specialRule?: {
    dayOfWeek: number;
    hoursPerDay: number;
    breakDuration: number;
  };
}

export type WorkStatus = 'notStarted' | 'working' | 'break' | 'finished';