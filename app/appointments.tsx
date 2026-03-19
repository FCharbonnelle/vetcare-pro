import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Modal, TextInput, Platform } from 'react-native';
import { Calendar, Plus, Clock, MapPin, ChevronRight, Stethoscope, Syringe, Scissors, Pill, X, Check } from 'lucide-react-native';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const MONTHS = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
const DAYS_SHORT = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

const TYPE_OPTIONS = [
  { key: 'vaccination', label: 'Vaccination', icon: Syringe, color: '#A855F7' },
  { key: 'consultation', label: 'Consultation', icon: Stethoscope, color: '#10B981' },
  { key: 'toilettage', label: 'Toilettage', icon: Scissors, color: '#F59E0B' },
  { key: 'medicament', label: 'Médicament', icon: Pill, color: '#3B82F6' },
];

const INITIAL_APPTS = [
  { id: '1', title: 'Vaccination Annuelle', date: '2025-10-12', time: '10:00', type: 'vaccination', vet: 'Dr. Martin', done: true },
  { id: '2', title: 'Contrôle Général', date: '2025-11-05', time: '14:30', type: 'consultation', vet: 'Dr. Dupont', done: true },
  { id: '3', title: 'Toilettage Complet', date: '2025-12-15', time: '11:00', type: 'toilettage', vet: 'Salon Pet', done: false },
  { id: '4', title: 'Rappel Antiparasitaire', date: '2026-01-20', time: '09:30', type: 'medicament', vet: 'Dr. Leroy', done: false },
  { id: '5', title: 'Bilan de Santé Annuel', date: '2026-04-10', time: '15:00', type: 'consultation', vet: 'Dr. Martin', done: false },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday=0
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [appointments, setAppointments] = useState(INITIAL_APPTS);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // New appt form
  const [newTitle, setNewTitle] = useState('');
  const [newTime, setNewTime] = useState('09:00');
  const [newVet, setNewVet] = useState('');
  const [newType, setNewType] = useState('consultation');

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  const apptDays = new Set(
    appointments
      .filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(a => new Date(a.date).getDate())
  );

  const selectedAppts = selectedDay
    ? appointments.filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
      })
    : appointments.filter(a => {
        const d = new Date(a.date);
        return d >= new Date(new Date().setHours(0, 0, 0, 0));
      }).slice(0, 5);

  const prevMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() - 1);
    setCurrentDate(d);
    setSelectedDay(null);
  };
  const nextMonth = () => {
    const d = new Date(currentDate);
    d.setMonth(d.getMonth() + 1);
    setCurrentDate(d);
    setSelectedDay(null);
  };

  const handleAddAppt = () => {
    if (!newTitle) return;
    const dateStr = selectedDay
      ? `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDay).padStart(2, '0')}`
      : new Date().toISOString().split('T')[0];
    setAppointments(prev => [
      ...prev,
      { id: Date.now().toString(), title: newTitle, date: dateStr, time: newTime, type: newType, vet: newVet, done: false },
    ]);
    setNewTitle(''); setNewVet(''); setNewTime('09:00'); setNewType('consultation');
    setModalVisible(false);
  };

  const getType = (key: string) => TYPE_OPTIONS.find(t => t.key === key) ?? TYPE_OPTIONS[0];

  const ApptCard = ({ item }: { item: typeof INITIAL_APPTS[0] }) => {
    const t = getType(item.type);
    return (
      <TouchableOpacity style={styles.apptCard}>
        <View style={[styles.apptIcon, { backgroundColor: `${t.color}20`, borderColor: `${t.color}40` }]}>
          <t.icon color={t.color} size={22} />
        </View>
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.apptTitle}>{item.title}</Text>
          <Text style={styles.apptSub}>{item.vet}</Text>
        </View>
        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.timeTag}>
            <Clock color="#A855F7" size={12} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          {item.done && (
            <View style={styles.doneBadge}><Text style={styles.doneText}>✓ Fait</Text></View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const today = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1A0A3E', '#0E0824', '#000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {/* Purple glow orbs */}
      <View style={styles.orb1} /><View style={styles.orb2} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>PLANIFICATION</Text>
            <Text style={styles.headerTitle}>Agenda 📅</Text>
          </View>
          <TouchableOpacity style={styles.addHeaderBtn} onPress={() => setModalVisible(true)}>
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        {/* Calendar */}
        <View style={styles.calendarCard}>
          <View style={styles.calNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navArrow}><Text style={styles.navArrowText}>‹</Text></TouchableOpacity>
            <Text style={styles.calMonth}>{MONTHS[month]} {year}</Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navArrow}><Text style={styles.navArrowText}>›</Text></TouchableOpacity>
          </View>

          <View style={styles.daysHeader}>
            {DAYS_SHORT.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
          </View>

          <View style={styles.daysGrid}>
            {Array(firstDay).fill(null).map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
            {Array(daysInMonth).fill(null).map((_, i) => {
              const day = i + 1;
              const isToday = day === today && month === todayMonth && year === todayYear;
              const isSelected = day === selectedDay;
              const hasAppt = apptDays.has(day);
              return (
                <TouchableOpacity
                  key={day}
                  style={[styles.dayCell, isSelected && styles.dayCellSelected, isToday && !isSelected && styles.dayCellToday]}
                  onPress={() => setSelectedDay(day === selectedDay ? null : day)}
                >
                  <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected, isToday && !isSelected && styles.dayNumberToday]}>
                    {day}
                  </Text>
                  {hasAppt && <View style={[styles.apptDot, { backgroundColor: isSelected ? 'white' : '#A855F7' }]} />}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedDay ? `Rendez-vous du ${selectedDay} ${MONTHS[month]}` : 'Prochains rendez-vous'}
          </Text>
        </View>

        {selectedAppts.length === 0 ? (
          <View style={styles.emptyState}>
            <Calendar color="rgba(168,85,247,0.4)" size={48} />
            <Text style={styles.emptyText}>Aucun rendez-vous{selectedDay ? ' ce jour' : ''}</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => setModalVisible(true)}>
              <Text style={styles.emptyBtnText}>+ Planifier un rendez-vous</Text>
            </TouchableOpacity>
          </View>
        ) : (
          selectedAppts.map(item => <ApptCard key={item.id} item={item} />)
        )}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.fabGradient}>
          <Plus color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* Add Appointment Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
          <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 40 }]} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouveau Rendez-vous</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}><X color="white" size={24} /></TouchableOpacity>
            </View>

            <Text style={styles.modalLabel}>TITRE</Text>
            <TextInput style={styles.modalInput} placeholder="Ex: Vaccination annuelle" placeholderTextColor="rgba(255,255,255,0.2)" value={newTitle} onChangeText={setNewTitle} />

            <Text style={styles.modalLabel}>VÉTÉRINAIRE / LIEU</Text>
            <TextInput style={styles.modalInput} placeholder="Dr. Martin / Clinique Happy Paws" placeholderTextColor="rgba(255,255,255,0.2)" value={newVet} onChangeText={setNewVet} />

            <Text style={styles.modalLabel}>HEURE</Text>
            <TextInput style={styles.modalInput} placeholder="09:00" placeholderTextColor="rgba(255,255,255,0.2)" value={newTime} onChangeText={setNewTime} />

            <Text style={styles.modalLabel}>TYPE</Text>
            <View style={styles.typeGrid}>
              {TYPE_OPTIONS.map(t => (
                <TouchableOpacity
                  key={t.key}
                  style={[styles.typeChip, newType === t.key && { backgroundColor: `${t.color}30`, borderColor: t.color }]}
                  onPress={() => setNewType(t.key)}
                >
                  <t.icon color={newType === t.key ? t.color : '#94A3B8'} size={16} />
                  <Text style={[styles.typeChipText, newType === t.key && { color: t.color }]}>{t.label}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity style={styles.modalSaveBtn} onPress={handleAddAppt}>
              <Text style={styles.modalSaveText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 24, paddingTop: 60 },
  orb1: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(168,85,247,0.12)', top: -60, right: -80, zIndex: 0 },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(124,58,237,0.08)', bottom: 100, left: -50, zIndex: 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  headerSub: { color: 'rgba(168,85,247,0.7)', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerTitle: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 4 },
  addHeaderBtn: { backgroundColor: '#A855F7', padding: 16, borderRadius: 20, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16 },
  calendarCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 24, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 32, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 20 },
  calNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  navArrow: { width: 40, height: 40, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.06)', alignItems: 'center', justifyContent: 'center' },
  navArrowText: { color: 'white', fontSize: 24, fontWeight: '900', lineHeight: 28 },
  calMonth: { color: '#fff', fontSize: 20, fontWeight: '900' },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 8 },
  dayLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '800', width: 36, textAlign: 'center' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 8, borderRadius: 14, marginBottom: 4 },
  dayCellSelected: { backgroundColor: '#A855F7' },
  dayCellToday: { backgroundColor: 'rgba(168,85,247,0.2)' },
  dayNumber: { color: 'rgba(255,255,255,0.7)', fontSize: 15, fontWeight: '700' },
  dayNumberSelected: { color: '#fff', fontWeight: '900' },
  dayNumberToday: { color: '#A855F7', fontWeight: '900' },
  apptDot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 3 },
  sectionHeader: { marginBottom: 16 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  apptCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 32, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  apptIcon: { padding: 14, borderRadius: 20, borderWidth: 1 },
  apptTitle: { color: '#fff', fontSize: 16, fontWeight: '800' },
  apptSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600', marginTop: 3 },
  timeTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168,85,247,0.15)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  timeText: { color: '#A855F7', fontSize: 12, fontWeight: '800', marginLeft: 5 },
  doneBadge: { marginTop: 6, backgroundColor: 'rgba(16,185,129,0.15)', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  doneText: { color: '#10B981', fontSize: 11, fontWeight: '800' },
  emptyState: { alignItems: 'center', padding: 40 },
  emptyText: { color: 'rgba(255,255,255,0.3)', fontSize: 17, fontWeight: '700', marginTop: 16, marginBottom: 24 },
  emptyBtn: { backgroundColor: 'rgba(168,85,247,0.2)', paddingHorizontal: 28, paddingVertical: 16, borderRadius: 20, borderWidth: 1, borderColor: '#A855F7' },
  emptyBtnText: { color: '#A855F7', fontWeight: '900', fontSize: 15 },
  fab: { position: 'absolute', bottom: 32, right: 32, borderRadius: 32, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20 },
  fabGradient: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' },
  modalContent: { borderRadius: 40, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: '900' },
  modalLabel: { color: 'rgba(168,85,247,0.8)', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10 },
  modalInput: { backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: 16, fontWeight: '700', padding: 18, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 20 },
  typeGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 24 },
  typeChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 16, marginRight: 10, marginBottom: 10 },
  typeChipText: { color: '#94A3B8', fontSize: 13, fontWeight: '800', marginLeft: 8 },
  modalSaveBtn: { backgroundColor: '#A855F7', paddingVertical: 20, borderRadius: 24, alignItems: 'center', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16 },
  modalSaveText: { color: '#fff', fontSize: 18, fontWeight: '900' },
});
