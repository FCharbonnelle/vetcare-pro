import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appointment } from '@/constants/AppConstants';

interface AppointmentContextType {
  appointments: Appointment[];
  loadAppointments: () => Promise<void>;
  addAppointment: (appointment: Appointment) => Promise<void>;
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  loading: boolean;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export function AppointmentProvider({ children }: { children: React.ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const stored = await AsyncStorage.getItem('vetcare_appointments');
      if (stored) {
        setAppointments(JSON.parse(stored));
      } else {
        // Initial empty state or default appts
        setAppointments([]);
      }
    } catch (e) {
      console.error('Failed to load appointments', e);
    } finally {
      setLoading(false);
    }
  };

  const saveToStorage = async (newAppointments: Appointment[]) => {
    try {
      setAppointments(newAppointments);
      await AsyncStorage.setItem('vetcare_appointments', JSON.stringify(newAppointments));
    } catch (e) {
      console.error('Failed to save appointments', e);
    }
  };

  const addAppointment = async (appointment: Appointment) => {
    const newAppointments = [...appointments, appointment];
    await saveToStorage(newAppointments);
  };

  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
    const updatedAppointments = appointments.map(appointment =>
      appointment.id === id ? { ...appointment, ...data } : appointment
    );
    await saveToStorage(updatedAppointments);
  };

  const deleteAppointment = async (id: string) => {
    const updatedAppointments = appointments.filter(appointment => appointment.id !== id);
    await saveToStorage(updatedAppointments);
  };

  return (
    <AppointmentContext.Provider value={{ 
      appointments, 
      loadAppointments, 
      addAppointment, 
      updateAppointment, 
      deleteAppointment,
      loading 
    }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointment() {
  const context = useContext(AppointmentContext);
  if (context === undefined) throw new Error('useAppointment must be used within a AppointmentProvider');
  return context;
}
