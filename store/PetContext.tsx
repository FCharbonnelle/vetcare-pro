import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase, isMockMode } from '@/services/supabase';
import { useAuth } from './AuthContext';

export interface Pet {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  photo?: string | null;
}

interface PetContextType {
  pet: Pet | null;
  savePet: (data: Partial<Pet>) => Promise<void>;
  updatePet: (data: Partial<Pet>) => Promise<void>;
  resetPet: () => void;
  loading: boolean;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    loadPet();
  }, [user]);

  const loadPet = async () => {
    setLoading(true);
    try {
      // Local check first
      const stored = await AsyncStorage.getItem('vetcare_pet');
      if (stored) setPet(JSON.parse(stored));

      // Then Supabase sync if not mock
      if (!isMockMode && user) {
        const { data, error } = await supabase
          .from('pets')
          .select('*')
          .eq('owner_id', user.id)
          .single();

        if (data && !error) {
          setPet(data);
          await AsyncStorage.setItem('vetcare_pet', JSON.stringify(data));
        }
      }
    } catch (e) {
      console.error('Failed to load pet', e);
    } finally {
      setLoading(false);
    }
  };

  const savePet = async (data: Partial<Pet>) => {
    try {
      const newPet = pet ? { ...pet, ...data } : (data as Pet);
      setPet(newPet);
      await AsyncStorage.setItem('vetcare_pet', JSON.stringify(newPet));

      if (!isMockMode && user) {
        const { error } = await supabase
          .from('pets')
          .upsert({
            owner_id: user.id,
            ...newPet,
            updated_at: new Date().toISOString()
          });

        if (error) console.error('Supabase pet update failed', error);
      }
    } catch (e) {
      console.error('Failed to save pet', e);
    }
  };

  // Alias for compatibility
  const updatePet = savePet;

  const resetPet = async () => {
    setPet(null);
    await AsyncStorage.removeItem('vetcare_pet');
  };

  return (
    <PetContext.Provider value={{ pet, savePet, updatePet, resetPet, loading }}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const context = useContext(PetContext);
  if (context === undefined) throw new Error('usePet must be used within a PetProvider');
  return context;
}
