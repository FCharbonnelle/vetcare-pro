import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Modal, TextInput, Platform } from 'react-native';
import { Calendar as CalendarIcon, Clock, X } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TYPE_OPTIONS } from '@/constants/AppConstants';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddApptModalProps {
  visible: boolean;
  onClose: () => void;
  onAddAppt: (appt: {
    title: string;
    date: string;
    time: string;
    type: string;
    vet: string;
  }) => void;
  initialDate?: number | null;
  month: number;
  year: number;
}

export const AddApptModal: React.FC<AddApptModalProps> = React.memo(({
  visible,
  onClose,
  onAddAppt,
  initialDate,
  month,
  year
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDateStr, setNewDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('09:00');
  const [newVet, setNewVet] = useState('');
  const [newType, setNewType] = useState('consultation');

  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    if (visible) {
      const d = initialDate ? new Date(year, month, initialDate) : new Date();
      setTempDate(d);
      setNewDateStr(d.toISOString().split('T')[0]);
      setNewTitle('');
      setNewVet('');
      setNewTime('09:00');
      setNewType('consultation');
    }
  }, [visible, initialDate, month, year]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      setNewDateStr(selectedDate.toISOString().split('T')[0]);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTempDate(selectedTime);
      setNewTime(selectedTime.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }).replace('h', ':'));
    }
  };

  const handleAddAppt = () => {
    if (!newTitle) return;
    onAddAppt({
      title: newTitle,
      date: newDateStr,
      time: newTime,
      type: newType,
      vet: newVet
    });
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 44 }]} />
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Ajouter un rappel</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}><X color="white" size={24} /></TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.modalLabel}>TITRE</Text>
            <TextInput style={styles.modalInput} placeholder="Ex: Vaccination" placeholderTextColor="rgba(255,255,255,0.2)" value={newTitle} onChangeText={setNewTitle} />

            <View style={styles.modalRow}>
               <View style={{flex: 1.5, marginRight: 12 }}>
                  <Text style={styles.modalLabel}>DATE</Text>
                  <TouchableOpacity style={styles.pickerTrigger} onPress={() => setShowDatePicker(true)}>
                     <View style={styles.pickerInner}>
                        <CalendarIcon color="#A855F7" size={16} />
                        <Text style={styles.pickerValue}>{newDateStr}</Text>
                     </View>
                  </TouchableOpacity>
               </View>
               <View style={{flex: 1}}>
                  <Text style={styles.modalLabel}>HEURE</Text>
                  <TouchableOpacity style={styles.pickerTrigger} onPress={() => setShowTimePicker(true)}>
                     <View style={styles.pickerInner}>
                        <Clock color="#A855F7" size={16} />
                        <Text style={styles.pickerValue}>{newTime}</Text>
                     </View>
                  </TouchableOpacity>
               </View>
            </View>

            {showDatePicker && (
              <DateTimePicker value={tempDate} mode="date" onChange={handleDateChange} />
            )}
            {showTimePicker && (
              <DateTimePicker value={tempDate} mode="time" onChange={handleTimeChange} />
            )}

            <Text style={styles.modalLabel}>LIEU / VÉTÉRINAIRE</Text>
            <TextInput style={styles.modalInput} placeholder="Ex: Clinique Happy Paws" placeholderTextColor="rgba(255,255,255,0.2)" value={newVet} onChangeText={setNewVet} />

            <Text style={styles.modalLabel}>TYPE D'ACTIVITÉ</Text>
            <View style={styles.typeGrid}>
              {TYPE_OPTIONS.map(t => (
                 <TouchableOpacity
                   key={t.key}
                   style={[styles.typeChip, newType === t.key && { backgroundColor: `${t.color}25`, borderColor: t.color }]}
                   onPress={() => setNewType(t.key)}
                 >
                   <t.icon color={newType === t.key ? t.color : 'rgba(255,255,255,0.4)'} size={16} />
                   <Text style={[styles.typeChipText, newType === t.key && { color: t.color }]}>{t.label}</Text>
                 </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleAddAppt}>
              <LinearGradient colors={['#A855F7', '#7C3AED']} start={{x:0, y:0}} end={{x:1, y:0}} style={styles.modalSaveGrad}>
                <Text style={styles.modalSaveText}>Confirmer le rappel</Text>
              </LinearGradient>
            </TouchableOpacity>
            <View style={{height: 40}} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', maxHeight: '90%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 10, borderRadius: 14 },
  modalLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10, marginLeft: 4 },
  modalInput: { backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 16, fontWeight: '700', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 24 },
  modalRow: { flexDirection: 'row' },
  pickerTrigger: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 24, overflow: 'hidden' },
  pickerInner: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  pickerValue: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 12 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 32 },
  typeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, marginRight: 10, marginBottom: 12 },
  typeChipText: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '800', marginLeft: 10 },
  modalSaveBtn: { borderRadius: 28, overflow: 'hidden' },
  modalSaveGrad: { paddingVertical: 22, alignItems: 'center' },
  modalSaveText: { color: '#fff', fontSize: 18, fontWeight: '900' },
});
