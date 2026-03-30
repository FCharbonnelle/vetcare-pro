import { Syringe, Stethoscope, Scissors, Pill } from 'lucide-react-native';

export const TYPE_OPTIONS = [
  { key: 'vaccination', label: 'Vaccination', icon: Syringe, color: '#A855F7' },
  { key: 'consultation', label: 'Consultation', icon: Stethoscope, color: '#10B981' },
  { key: 'toilettage', label: 'Toilettage', icon: Scissors, color: '#F59E0B' },
  { key: 'medicament', label: 'Médicament', icon: Pill, color: '#3B82F6' },
];

export const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export type ApptType = 'vaccination' | 'consultation' | 'toilettage' | 'medicament';

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string; // or ApptType
  vet: string;
  done: boolean;
}
