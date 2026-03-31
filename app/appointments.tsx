import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Modal, TextInput, Platform, FlatList } from 'react-native';
import { Calendar as CalendarIcon, Plus, Clock, MapPin, ChevronRight, Stethoscope, Syringe, Scissors, Pill, X, Check, CalendarDays } from 'lucide-react-native';
import { useRef, useEffect, useState, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Appointment, TYPE_OPTIONS, MONTHS, DAYS_SHORT } from '@/constants/AppConstants';
import { ApptCard } from '@/components/ApptCard';
import { useAppointment } from '@/store/AppointmentContext';
import DateTimePicker from '@react-native-community/datetimepicker';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday=0
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments, addAppointment, updateAppointment, deleteAppointment, loading } = useAppointment();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  // New appt form
  const [newTitle, setNewTitle] = useState('');
  const [newDateStr, setNewDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('09:00');
  const [newVet, setNewVet] = useState('');
  const [newType, setNewType] = useState('consultation');
  
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
    ]).start();
  }, []);

  // Update form date when selectedDay changes
  useEffect(() => {
    if (selectedDay) {
       const d = new Date(year, month, selectedDay);
       setTempDate(d);
       setNewDateStr(d.toISOString().split('T')[0]);
    }
  }, [selectedDay, month, year]);

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

  const apptDays = new Set(
    appointments
      .filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(a => new Date(a.date).getDate())
  );

  const selectedAppts = useMemo(() => {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    return appointments.filter(a => new Date(a.date) >= todayStart).slice(0, 5);
  }, [appointments]);

  const filteredAppts = useMemo(() => {
    if (selectedDay) {
      return appointments.filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
      });
    }
    return selectedAppts;
  }, [appointments, selectedDay, year, month, selectedAppts]);

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

  const handleAddAppt = async () => {
    if (!newTitle) return;
    
    await addAppointment({
      id: Date.now().toString(),
      title: newTitle,
      date: newDateStr,
      time: newTime,
      type: newType,
      vet: newVet,
      done: false
    });

    setNewTitle(''); setNewVet(''); setNewTime('09:00'); setNewType('consultation');
    setModalVisible(false);
  };

  const todayNum = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#170B3B', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      
      <View style={styles.glowTopRight} />
      <View style={styles.glowBottomLeft} />

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>PLANIFICATION</Text>
            <Text style={styles.headerTitle}>Agenda 📅</Text>
          </View>
          <TouchableOpacity style={styles.addHeaderBtn} onPress={() => setModalVisible(true)}>
            <Plus color="white" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarCard}>
          <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} style={styles.calendarInner}>
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
                const dCell = i + 1;
                const isToday = dCell === todayNum && month === todayMonth && year === todayYear;
                const isSelected = dCell === selectedDay;
                const hasAppt = apptDays.has(dCell);
                return (
                  <TouchableOpacity
                    key={dCell}
                    activeOpacity={0.7}
                    style={[styles.dayCell, isSelected && styles.dayCellSelected, isToday && !isSelected && styles.dayCellToday]}
                    onPress={() => setSelectedDay(dCell === selectedDay ? null : dCell)}
                  >
                    <Text style={[styles.dayNumber, isSelected && styles.dayNumberSelected, isToday && !isSelected && styles.dayNumberToday]}>
                      {dCell}
                    </Text>
                    {hasAppt && <View style={[styles.apptDot, { backgroundColor: isSelected ? 'white' : '#A855F7' }]} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {selectedDay ? `Le ${selectedDay} ${MONTHS[month]}` : 'Prochains rendez-vous'}
          </Text>
          <View style={styles.indicatorBadge}>
             <Text style={styles.indicatorText}>{filteredAppts.length} EVENT{filteredAppts.length > 1 ? 'S' : ''}</Text>
          </View>
        </View>

        {filteredAppts.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconBg}>
               <CalendarDays color="rgba(168,85,247,0.4)" size={40} />
            </View>
            <Text style={styles.emptyText}>Aucun événement{selectedDay ? ' ce jour' : ''}</Text>
            <TouchableOpacity style={styles.emptyBtn} onPress={() => setModalVisible(true)}>
              <Text style={styles.emptyBtnText}>+ Ajouter</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filteredAppts.map(item => <ApptCard key={item.id} item={item} />)
        )}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)} activeOpacity={0.9}>
        <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.fabGradient}>
          <Plus color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 44 }]} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ajouter un rappel</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}><X color="white" size={24} /></TouchableOpacity>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 24, paddingTop: 60 },
  glowTopRight: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(139, 24, 116, 0.15)', top: -100, right: -150, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  glowBottomLeft: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(108, 36, 181, 0.1)', bottom: 50, left: -100, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  headerSub: { color: '#A855F7', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerTitle: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 4 },
  addHeaderBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 14, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  calendarCard: { borderRadius: 40, overflow: 'hidden', marginBottom: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)' },
  calendarInner: { padding: 24 },
  calNav: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  navArrow: { width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  navArrowText: { color: 'white', fontSize: 24, fontWeight: '900', lineHeight: 28 },
  calMonth: { color: '#fff', fontSize: 20, fontWeight: '900' },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 },
  dayLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '900', width: 36, textAlign: 'center', letterSpacing: 0.5 },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 10, borderRadius: 16, marginBottom: 4 },
  dayCellSelected: { backgroundColor: '#A855F7' },
  dayCellToday: { backgroundColor: 'rgba(168,85,247,0.15)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  dayNumber: { color: 'rgba(255,255,255,0.5)', fontSize: 15, fontWeight: '800' },
  dayNumberSelected: { color: '#fff', fontWeight: '900' },
  dayNumberToday: { color: '#A855F7', fontWeight: '900' },
  apptDot: { width: 5, height: 5, borderRadius: 2.5, marginTop: 4 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '900' },
  indicatorBadge: { backgroundColor: 'rgba(168,85,247,0.1)', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(168,85,247,0.2)' },
  indicatorText: { color: '#A855F7', fontSize: 10, fontWeight: '900', letterSpacing: 1 },
  emptyState: { alignItems: 'center', padding: 48, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 40, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  emptyIconBg: { backgroundColor: 'rgba(168,85,247,0.1)', padding: 20, borderRadius: 24, marginBottom: 20 },
  emptyText: { color: 'rgba(255,255,255,0.3)', fontSize: 16, fontWeight: '800', marginBottom: 24 },
  emptyBtn: { backgroundColor: 'white', paddingHorizontal: 28, paddingVertical: 16, borderRadius: 20 },
  emptyBtnText: { color: 'black', fontWeight: '900', fontSize: 15 },
  fab: { position: 'absolute', bottom: 32, right: 32, borderRadius: 32 },
  fabGradient: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
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
