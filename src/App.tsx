import { useState, useEffect } from 'react';
import './App.css';
import { WorkSchedule } from './types';
import { Header } from './components/Header';
import { UserProfile } from './components/UserProfile';
import { TimeRegistration } from './components/TimeRegistration';
import { ScheduleSelection } from './components/ScheduleSelection';
import { RecordHistory } from './components/RecordHistory';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState<WorkSchedule | null>(null);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setIsProfileComplete(true);
    }
  }, []);

  if (!isProfileComplete) {
    return <UserProfile onComplete={() => setIsProfileComplete(true)} />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {!selectedSchedule ? (
            <ScheduleSelection onSelect={setSelectedSchedule} />
          ) : (
            <>
              <TimeRegistration schedule={selectedSchedule} />
              <RecordHistory />
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;