import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Modal, TextInput, Platform, Alert } from 'react-native';
import { Calendar as CalendarIcon, Plus, Clock, ChevronRight, X, CalendarDays } from 'lucide-react-native';
import { useRef, useEffect, useState, useMemo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { TYPE_OPTIONS, MONTHS, DAYS_SHORT } from '@/constants/AppConstants';
import { ApptCard } from '@/components/ApptCard';
import { useAppointment } from '@/store/AppointmentContext';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}
function getFirstDayOfWeek(year: number, month: number) {
  let d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Lundi=0
}

export default function AppointmentsScreen() {
  const router = useRouter();
  const { appointments, addAppointment } = useAppointment();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(new Date().getDate());

  const [newTitle, setNewTitle] = useState('');
  const [newDateStr, setNewDateStr] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('09:00');
  const [newVet, setNewVet] = useState('');
  const [newType, setNewType] = useState('consultation');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfWeek(year, month);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const apptDays = new Set(
    appointments
      .filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .map(a => new Date(a.date).getDate())
  );

  const filteredAppts = useMemo(() => {
    if (selectedDay) {
      return appointments.filter(a => {
        const d = new Date(a.date);
        return d.getFullYear() === year && d.getMonth() === month && d.getDate() === selectedDay;
      });
    }
    return appointments;
  }, [appointments, selectedDay, year, month]);

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
    if (!newTitle) {
      Alert.alert("Intention manquante", "Chaque rituel doit avoir un but clair.");
      return;
    }
    await addAppointment({
      id: Date.now().toString(),
      title: newTitle,
      date: newDateStr,
      time: newTime,
      type: newType,
      vet: newVet,
      done: false
    });
    Alert.alert("Rituel Scellé", "Le minuteur sacré a été activé dans votre Sanctuaire.");
    setModalVisible(false);
    setNewTitle('');
  };

  const todayNum = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>CALENDRIER SACRÉ</Text>
            <Text style={styles.headerTitle}>Agendas</Text>
          </View>
          <TouchableOpacity style={styles.addBtnCircle} onPress={() => setModalVisible(true)}>
            <Plus color="#FFF" size={24} />
          </TouchableOpacity>
        </View>

        {/* CALENDRIER VITRÉ */}
        <View style={styles.calendarCard}>
           <View style={styles.calNav}>
              <TouchableOpacity onPress={prevMonth} style={styles.navBtn}><Text style={styles.navBtnText}>‹</Text></TouchableOpacity>
              <Text style={styles.calTitle}>{MONTHS[month]} {year}</Text>
              <TouchableOpacity onPress={nextMonth} style={styles.navBtn}><Text style={styles.navBtnText}>›</Text></TouchableOpacity>
           </View>

           <View style={styles.daysHeader}>
              {DAYS_SHORT.map(d => <Text key={d} style={styles.dayLabel}>{d}</Text>)}
           </View>

           <View style={styles.daysGrid}>
              {Array(firstDay).fill(null).map((_, i) => <View key={`e${i}`} style={styles.dayCell} />)}
              {Array(daysInMonth).fill(null).map((_, i) => {
                const dCell = i + 1;
                const isSelected = dCell === selectedDay;
                const isToday = dCell === todayNum && month === todayMonth && year === todayYear;
                const hasAppt = apptDays.has(dCell);
                return (
                  <TouchableOpacity
                    key={dCell}
                    onPress={() => setSelectedDay(dCell)}
                    style={[styles.dayCell, isSelected && styles.dayCellSelected]}
                  >
                    <Text style={[styles.dayNum, isSelected && styles.dayNumActive, isToday && !isSelected && { color: Theme.colors.primary }]}>
                       {dCell}
                    </Text>
                    {hasAppt && <View style={[styles.dot, isSelected ? { backgroundColor: '#000' } : { backgroundColor: Theme.colors.primary }]} />}
                  </TouchableOpacity>
                );
              })}
           </View>
        </View>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>
             {selectedDay ? `Rituels pour le ${selectedDay} ${MONTHS[month]}` : "Soins à Venir"}
           </Text>
        </View>

        {filteredAppts.length === 0 ? (
          <View style={styles.emptyContainer}>
             <CalendarDays color="rgba(255,255,255,0.1)" size={60} />
             <Text style={styles.emptyText}>Aucun rituel prévu pour ce jour.</Text>
          </View>
        ) : (
          filteredAppts.map(item => <ApptCard key={item.id} item={item} />)
        )}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.fabGradient}>
           <Plus color="#FFF" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* MODAL NOUVEAU RDV */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
              <LinearGradient colors={['#1C1633', '#05030F']} style={[StyleSheet.absoluteFill, { borderRadius: 40 }]} />
              <View style={styles.modalHeader}>
                 <Text style={styles.modalTitle}>Invoquer un Rituel</Text>
                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}><X color="#FFF" size={24} /></TouchableOpacity>
              </View>
              <ScrollView>
                 <Text style={styles.label}>OBJECTIF</Text>
                 <TextInput style={styles.input} placeholder="Raison de la visite..." placeholderTextColor="rgba(255,255,255,0.2)" value={newTitle} onChangeText={setNewTitle} />
                 
                 <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1, marginRight: 16 }}>
                       <Text style={styles.label}>DATE</Text>
                       <TouchableOpacity style={styles.field} onPress={() => Alert.alert("Verrou Chronos", "La sélection directe est réservée au flux standard.")}>
                          <Text style={styles.fieldText}>{newDateStr}</Text>
                       </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}>
                       <Text style={styles.label}>HEURE</Text>
                       <TouchableOpacity style={styles.field} onPress={() => Alert.alert("Ancre Temporelle", "Fenêtre matinale standard (09:00) assignée.")}>
                          <Text style={styles.fieldText}>{newTime}</Text>
                       </TouchableOpacity>
                    </View>
                 </View>

                 <Text style={styles.label}>TYPE</Text>
                 <View style={styles.typeRow}>
                    {TYPE_OPTIONS.slice(0, 4).map(t => (
                      <TouchableOpacity key={t.key} style={[styles.typeBtn, newType === t.key && styles.typeBtnActive]} onPress={() => setNewType(t.key)}>
                         <t.icon color={newType === t.key ? '#FFF' : 'rgba(255,255,255,0.4)'} size={18} />
                      </TouchableOpacity>
                    ))}
                 </View>

                 <TouchableOpacity style={styles.saveBtn} onPress={handleAddAppt}>
                    <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.saveGrad}>
                       <Text style={styles.saveText}>Sceller dans le Calendrier</Text>
                    </LinearGradient>
                 </TouchableOpacity>
              </ScrollView>
           </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  scroll: { padding: 24, paddingTop: Platform.OS === 'ios' ? 10 : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  headerSub: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 3 },
  headerTitle: { color: '#FFF', fontSize: 36, fontWeight: '900', marginTop: 8, letterSpacing: -1.5 },
  addBtnCircle: { width: 54, height: 54, borderRadius: 27, backgroundColor: 'rgba(255,255,255,0.08)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },

  calendarCard: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.xl, padding: 24, marginBottom: 40, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  calNav: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  navBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center' },
  navBtnText: { color: '#FFF', fontSize: 24 },
  calTitle: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  daysHeader: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  dayLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '900', width: 40, textAlign: 'center' },
  daysGrid: { flexDirection: 'row', flexWrap: 'wrap' },
  dayCell: { width: `${100 / 7}%`, alignItems: 'center', paddingVertical: 14, borderRadius: 12 },
  dayCellSelected: { backgroundColor: Theme.colors.primary },
  dayNum: { color: 'rgba(255,255,255,0.6)', fontSize: 16, fontWeight: '700' },
  dayNumActive: { color: '#000', fontWeight: '900' },
  dot: { width: 4, height: 4, borderRadius: 2, marginTop: 4 },

  sectionHeader: { marginBottom: 24 },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: '800' },
  emptyContainer: { alignItems: 'center', padding: 60, opacity: 0.5 },
  emptyText: { color: '#FFF', fontSize: 14, marginTop: 20, textAlign: 'center' },

  fab: { position: 'absolute', bottom: 120, right: 30, zIndex: 100 },
  fabGradient: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center', ...Theme.shadows.glow },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { height: '80%', padding: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  modalTitle: { color: '#FFF', fontSize: 28, fontWeight: '900' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 12 },
  label: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 16 },
  input: { backgroundColor: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 16, color: '#FFF', fontSize: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  field: { backgroundColor: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  fieldText: { color: '#FFF', fontSize: 16 },
  typeRow: { flexDirection: 'row', marginBottom: 32 },
  typeBtn: { width: 56, height: 56, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center', marginRight: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  typeBtnActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  saveBtn: { marginTop: 10, borderRadius: 20, overflow: 'hidden' },
  saveGrad: { paddingVertical: 24, alignItems: 'center' },
  saveText: { color: '#FFF', fontSize: 18, fontWeight: '900' },
});
