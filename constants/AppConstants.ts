import { Syringe, Stethoscope, Scissors, Pill, Sparkles, FileText, ShoppingBag, ShieldAlert } from 'lucide-react-native';

export const TYPE_OPTIONS = [
  { key: 'vaccination', label: 'Vaccination', icon: Syringe, color: '#DDB7FF' },
  { key: 'consultation', label: 'Consultation', icon: Stethoscope, color: '#CCBFF8' },
  { key: 'toilettage', label: 'Toilettage', icon: Scissors, color: '#FABC4E' },
  { key: 'medicament', label: 'Médication', icon: Pill, color: '#B76DFF' },
];

export const ART_ICONS = {
  vetAi: Sparkles,
  history: FileText,
  store: ShoppingBag,
  sos: ShieldAlert,
};

export const PET_ARTWORKS = {
  dog: 'https://pngimg.com/uploads/golden_retriever/golden_retriever_PNG28.png',
  cat: 'https://pngimg.com/uploads/cat/cat_PNG50414.png',
  rabbit: 'https://pngimg.com/uploads/rabbit/rabbit_PNG3775.png',
};

export const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
export const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  vet: string;
  done: boolean;
}
