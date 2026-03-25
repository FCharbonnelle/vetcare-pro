import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
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

  // Keep track of the current pet state for stable callbacks
  const petRef = useRef<Pet | null>(null);
  useEffect(() => {
    petRef.current = pet;
  }, [pet]);

  useEffect(() => {
    loadPet();
  }, []);

  const loadPet = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('vetcare_pet');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPet(parsed);
        petRef.current = parsed;
      }
    } catch (e) {
      console.error('Failed to load pet', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const savePet = useCallback(async (data: Partial<Pet>) => {
    try {
      const currentPet = petRef.current;
      const newPet = currentPet ? { ...currentPet, ...data } : (data as Pet);

      // Update state
      setPet(newPet);

      // Persist side effect (outside of state updater)
      await AsyncStorage.setItem('vetcare_pet', JSON.stringify(newPet));
    } catch (e) {
      console.error('Failed to save pet', e);
    }
  }, []);

  // Alias for compatibility
  const updatePet = savePet;

  const resetPet = useCallback(async () => {
    setPet(null);
    await AsyncStorage.removeItem('vetcare_pet');
  }, []);

  const value = useMemo(() => ({
    pet,
    savePet,
    updatePet,
    resetPet,
    loading
  }), [pet, savePet, updatePet, resetPet, loading]);

  return (
    <PetContext.Provider value={value}>
      {children}
    </PetContext.Provider>
  );
}

export function usePet() {
  const context = useContext(PetContext);
  if (context === undefined) throw new Error('usePet must be used within a PetProvider');
  return context;
}
