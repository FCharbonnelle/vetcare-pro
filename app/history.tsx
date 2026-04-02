import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Animated, Modal, TextInput } from 'react-native';
import { Calendar, Stethoscope, Scissors, Syringe, Plus, ChevronLeft, Heart, Sparkles, Activity, Filter, X, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState, memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const HistoryItem = memo(({ icon: Icon, title, date, type, color = "#A855F7" }: any) => (
  <TouchableOpacity style={styles.historyItem} activeOpacity={0.85}>
    <View style={[styles.iconContainer, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
      <Icon color={color} size={20} />
    </View>
    <View style={{ flex: 1, marginLeft: 16 }}>
      <Text style={styles.itemTitle}>{title}</Text>
      <Text style={styles.itemType}>{type}</Text>
    </View>
    <View style={{ alignItems: 'flex-end' }}>
      <Text style={styles.itemDate}>{date}</Text>
      <View style={styles.statusBadge}>
         <View style={styles.statusDot} />
         <Text style={styles.itemStatus}>Terminé</Text>
      </View>
    </View>
  </TouchableOpacity>
));

export default function HistoryScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  const [records, setRecords] = useState([
    { id: '1', icon: Syringe, title: "Vaccination Annuelle", date: "12 Oct, 2025", type: "Préventif", color: "#A855F7" },
    { id: '2', icon: Stethoscope, title: "Contrôle Général", date: "28 Sep, 2025", type: "Clinique", color: "#10B981" },
    { id: '3', icon: Scissors, title: "Toilettage Complet", date: "15 Sep, 2025", type: "Hygiène", color: "#F59E0B" },
    { id: '4', icon: Calendar, title: "Consultation Vétérinaire", date: "30 Aoû, 2025", type: "Clinique", color: "#3B82F6" },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('');
  
  const [tempDate, setTempDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
    ]).start();

    formatDateTime(tempDate);
  }, []);

  const formatDateTime = (date: Date) => {
    const d = date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });
    const t = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    setNewDate(d);
    setNewTime(t);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setTempDate(selectedDate);
      formatDateTime(selectedDate);
    }
  };

  const handleTimeChange = (event: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTempDate(selectedTime);
      formatDateTime(selectedTime);
    }
  };

  const handleAddRecord = () => {
    if (!newTitle) return;
    const newRecord = {
      id: Date.now().toString(),
      icon: Activity,
      title: newTitle,
      date: `${newDate} à ${newTime}`,
      type: newType || "Général",
      color: "#A855F7"
    };
    setRecords([newRecord, ...records]);
    setNewTitle('');
    setNewType('');
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#170B3B', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      
      <View style={styles.glowTopLeft} />
      <View style={styles.glowMidRight} />

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        
        <View style={styles.header}>
           <View>
              <Text style={styles.headerSub}>VISITES PASSÉES</Text>
              <Text style={styles.headerTitle}>Historique 📜</Text>
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter color="white" size={20} />
           </TouchableOpacity>
        </View>

        <View style={styles.summaryCard}>
          <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)']} style={styles.summaryInner}>
             <View style={styles.summaryRow}>
                <View style={styles.summaryItem}>
                   <View style={styles.summaryIconBg}><Activity color="#A855F7" size={16} /></View>
                   <Text style={styles.summaryValue}>12</Text>
                   <Text style={styles.summaryLabel}>Visites</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                   <View style={styles.summaryIconBg}><Calendar color="#10B981" size={16} /></View>
                   <Text style={styles.summaryValue}>3</Text>
                   <Text style={styles.summaryLabel}>Mois pro.</Text>
                </View>
             </View>
          </LinearGradient>
        </View>

         <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Activités récentes</Text>
            <TouchableOpacity style={styles.addBtnContainer} onPress={() => setModalVisible(true)}>
               <Plus color="#A855F7" size={20} />
               <Text style={styles.addBtnText}>Nouveau</Text>
            </TouchableOpacity>
         </View>

        <View style={styles.listContainer}>
          {records.map(item => (
            <HistoryItem key={item.id} icon={item.icon} title={item.title} date={item.date} type={item.type} color={item.color} />
          ))}
        </View>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      <TouchableOpacity style={styles.fab} activeOpacity={0.9} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.fabGradient}>
          <Plus color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 44 }]} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Nouvel Historique</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}><X color="white" size={24} /></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text style={styles.modalLabel}>TITRE DE LA VISITE</Text>
              <TextInput style={styles.modalInput} placeholder="Ex: Rappel Vaccin" placeholderTextColor="rgba(255,255,255,0.2)" value={newTitle} onChangeText={setNewTitle} />
              
              <Text style={styles.modalLabel}>TYPE D'ACTIVITÉ</Text>
              <TextInput style={styles.modalInput} placeholder="Ex: Clinique, Hygiène..." placeholderTextColor="rgba(255,255,255,0.2)" value={newType} onChangeText={setNewType} />
              
              <View style={styles.modalSplitRow}>
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text style={styles.modalLabel}>DATE</Text>
                  <TouchableOpacity style={styles.pickerTrigger} onPress={() => setShowDatePicker(true)}>
                     <View style={styles.pickerInner}>
                       <Calendar color="#A855F7" size={16} />
                       <Text style={styles.pickerValue}>{newDate}</Text>
                     </View>
                  </TouchableOpacity>
                </View>
                <View style={{ flex: 1 }}>
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
                <DateTimePicker 
                  value={tempDate} 
                  mode="date" 
                  display="default" 
                  onChange={handleDateChange} 
                />
              )}
              {showTimePicker && (
                <DateTimePicker 
                  value={tempDate} 
                  mode="time" 
                  display="default" 
                  onChange={handleTimeChange} 
                />
              )}

              <TouchableOpacity style={styles.modalSaveBtn} onPress={handleAddRecord}>
                <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.modalSaveGrad}>
                  <Text style={styles.modalSaveText}>Enregistrer l'activité</Text>
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
  scroll: { paddingBottom: 40 },
  glowTopLeft: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(139, 24, 116, 0.12)', top: -150, left: -150, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  glowMidRight: { position: 'absolute', width: 350, height: 350, borderRadius: 175, backgroundColor: 'rgba(108, 36, 181, 0.08)', top: 300, right: -150, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  header: { padding: 24, paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  headerSub: { color: '#A855F7', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerTitle: { color: '#FFFFFF', fontSize: 34, fontWeight: '900', marginTop: 4 },
  filterBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  summaryCard: { marginHorizontal: 24, borderRadius: 40, overflow: 'hidden', marginBottom: 24, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)' },
  summaryInner: { padding: 32 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  summaryItem: { alignItems: 'center' },
  summaryIconBg: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 12, marginBottom: 12 },
  summaryValue: { color: '#FFFFFF', fontSize: 26, fontWeight: '900' },
  summaryLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '800', marginTop: 6, textTransform: 'uppercase', letterSpacing: 1 },
  summaryDivider: { width: 1, height: 50, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 48 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 24, marginTop: 12 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF' },
  addBtnContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168, 85, 247, 0.1)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.2)' },
  addBtnText: { color: '#A855F7', fontWeight: '900', fontSize: 13, marginLeft: 8 },
  listContainer: { paddingHorizontal: 24 },
  historyItem: { flexDirection: 'row', alignItems: 'center', padding: 20, marginBottom: 16, borderRadius: 36, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', backgroundColor: 'rgba(255,255,255,0.03)' },
  iconContainer: { padding: 14, borderRadius: 22, borderWidth: 1 },
  itemTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  itemType: { fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: '700', marginTop: 4 },
  itemDate: { fontSize: 13, fontWeight: '800', color: 'rgba(255,255,255,0.7)' },
  statusBadge: { flexDirection: 'row', alignItems: 'center', marginTop: 6, backgroundColor: 'rgba(16,185,129,0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  statusDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#10B981', marginRight: 6 },
  itemStatus: { fontSize: 10, fontWeight: '900', color: '#10B981', textTransform: 'uppercase' },
  fab: { position: 'absolute', bottom: 32, right: 32, borderRadius: 32, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 },
  fabGradient: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 10, borderRadius: 14 },
  modalLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '900', letterSpacing: 1.5, marginBottom: 10, marginLeft: 4 },
  modalInput: { backgroundColor: 'rgba(255,255,255,0.04)', color: '#fff', fontSize: 16, fontWeight: '700', padding: 20, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 24 },
  modalSplitRow: { flexDirection: 'row', alignItems: 'center' },
  pickerTrigger: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 24, overflow: 'hidden' },
  pickerInner: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  pickerValue: { color: '#fff', fontSize: 15, fontWeight: '700', marginLeft: 12 },
  modalSaveBtn: { borderRadius: 28, overflow: 'hidden', marginTop: 10 },
  modalSaveGrad: { paddingVertical: 22, alignItems: 'center' },
  modalSaveText: { color: '#fff', fontSize: 18, fontWeight: '900' },
});
