import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  useEffect(() => {
    loadPet();
  }, []);

  const loadPet = async () => {
    try {
      const stored = await AsyncStorage.getItem('vetcare_pet');
      if (stored) setPet(JSON.parse(stored));
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
