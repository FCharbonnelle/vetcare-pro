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
  resetPet: () => Promise<void>;
  loading: boolean;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export function PetProvider({ children }: { children: React.ReactNode }) {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  // Use a ref to keep track of the current pet state without making it a dependency of callbacks
  const petRef = useRef<Pet | null>(null);

  // Sync ref with state
  useEffect(() => {
    petRef.current = pet;
  }, [pet]);

  const loadPet = useCallback(async () => {
    try {
      const stored = await AsyncStorage.getItem('vetcare_pet');
      if (stored) {
        const parsed = JSON.parse(stored);
        setPet(parsed);
      }
    } catch (e) {
      console.error('Failed to load pet', e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPet();
  }, [loadPet]);

  const savePet = useCallback(async (data: Partial<Pet>) => {
    try {
      // Calculate the new pet state based on the current ref value
      const currentPet = petRef.current;
      const newPet = currentPet ? { ...currentPet, ...data } : (data as Pet);

      // Update state first for responsiveness
      setPet(newPet);

      // Await persistence to satisfy the async contract
      await AsyncStorage.setItem('vetcare_pet', JSON.stringify(newPet));
    } catch (e) {
      console.error('Failed to save pet', e);
      // Optional: rollback state if persistence fails?
      // For now, just logging error as per original implementation
    }
  }, []); // Stable callback

  // Alias for compatibility
  const updatePet = savePet;

  const resetPet = useCallback(async () => {
    try {
      setPet(null);
      await AsyncStorage.removeItem('vetcare_pet');
    } catch (e) {
      console.error('Failed to reset pet', e);
    }
  }, []); // Stable callback

  // Memoize the context value to prevent unnecessary re-renders of all consuming components
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
