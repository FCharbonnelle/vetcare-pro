import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Platform, Modal, TextInput, Alert, Dimensions } from 'react-native';
import { Calendar, ChevronRight, Activity, Clock, Sliders, ChevronLeft, Plus, X } from 'lucide-react-native';
import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

export default function HistoryScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const [modalVisible, setModalVisible] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSub, setNewSub] = useState('');

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 10, useNativeDriver: true })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleAddEntry = () => {
    if (!newTitle) return;
    Alert.alert("Souvenir Capturé", "Cet événement a été gravé dans les Archives Chronos.");
    setModalVisible(false);
    setNewTitle('');
    setNewSub('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>ARCHIVES CHRONOS</Text>
            <Text style={styles.headerTitle}>Historique</Text>
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => Alert.alert("Filtre Temporel", "Trié par 'Significatif' par défaut.")}>
             <Sliders color="#FFF" size={20} />
          </TouchableOpacity>
        </View>

        {/* RÉSUMÉ DES STATS */}
        <View style={styles.summaryGrid}>
           <View style={[styles.statItem, { backgroundColor: Theme.colors.primary + '10' }]}>
              <Text style={styles.statLabel}>SOINS TOTAUX</Text>
              <Text style={styles.statValue}>128</Text>
           </View>
           <View style={[styles.statItem, { backgroundColor: Theme.colors.tertiary + '10' }]}>
              <Text style={styles.statLabel}>SÉRIE (JOURS)</Text>
              <Text style={styles.statValue}>14</Text>
           </View>
        </View>

        {/* TIMELINE */}
        <View style={styles.eventsContainer}>
           <Text style={styles.monthTag}>AVRIL 2026</Text>
           
           <HistoryItem 
             day="12" 
             month="AVR" 
             title="Bilan de Santé Global" 
             sub="Toutes les constantes sont dans la zone Sacrée" 
             icon={Activity} 
             color={Theme.colors.primary} 
           />
           <HistoryItem 
             day="10" 
             month="AVR" 
             title="Remplissage Omega-3" 
             sub="Mise à jour automatique de l'inventaire" 
             icon={Clock} 
             color={Theme.colors.secondary} 
           />
           <HistoryItem 
             day="08" 
             month="AVR" 
             title="Marche Zen" 
             sub="Durée : 45 minutes" 
             icon={Calendar} 
             color={Theme.colors.tertiary} 
             last 
           />
        </View>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* FAB */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.fabGrad}>
           <Plus color="#FFF" size={28} />
        </LinearGradient>
      </TouchableOpacity>

      {/* MODAL AJOUT ENTRÉE */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
              <LinearGradient colors={['#1C1633', '#05030F']} style={[StyleSheet.absoluteFill, { borderRadius: 40 }]} />
              <View style={styles.modalHeader}>
                 <Text style={styles.modalTitle}>Nouvel Enregistrement</Text>
                 <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}><X color="#FFF" size={24} /></TouchableOpacity>
              </View>
              <ScrollView>
                 <Text style={styles.label}>TITRE DE L'ENREGISTREMENT</Text>
                 <TextInput style={styles.input} placeholder="Titre de l'action..." placeholderTextColor="rgba(255,255,255,0.2)" value={newTitle} onChangeText={setNewTitle} />
                 
                 <Text style={styles.label}>OBSERVATIONS</Text>
                 <TextInput style={[styles.input, { height: 120, paddingTop: 18 }]} multiline placeholder="Décrivez le résultat..." placeholderTextColor="rgba(255,255,255,0.2)" value={newSub} onChangeText={setNewSub} />

                 <TouchableOpacity style={styles.saveBtn} onPress={handleAddEntry}>
                    <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.saveGrad}>
                       <Text style={styles.saveText}>Graver dans l'Histoire</Text>
                    </LinearGradient>
                 </TouchableOpacity>
              </ScrollView>
           </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function HistoryItem({ day, month, title, sub, icon: Icon, color, last = false }: any) {
  return (
    <TouchableOpacity style={styles.itemRow} activeOpacity={0.7} onPress={() => Alert.alert(title, sub)}>
       <View style={styles.itemLeft}>
          <Text style={styles.dayText}>{day}</Text>
          <Text style={styles.monText}>{month}</Text>
          <View style={[styles.vLine, last && { opacity: 0 }]} />
       </View>
       <View style={styles.itemMain}>
          <View style={styles.cardGlow} />
          <View style={styles.itemCard}>
             <View style={[styles.iconCircle, { backgroundColor: color + '20' }]}>
                <Icon color={color} size={20} />
             </View>
             <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.itemTitle}>{title}</Text>
                <Text style={styles.itemSub}>{sub || 'Aucune note'}</Text>
             </View>
             <ChevronRight color="rgba(255,255,255,0.1)" size={16} />
          </View>
       </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  scroll: { padding: 24, paddingTop: Platform.OS === 'ios' ? 10 : 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 40 },
  headerSub: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 3 },
  headerTitle: { color: '#FFF', fontSize: 36, fontWeight: '900', marginTop: 8, letterSpacing: -1.5 },
  filterBtn: { width: 54, height: 54, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  
  summaryGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 },
  statItem: { width: (Dimensions.get('window').width - 64) / 2, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '900', letterSpacing: 1.5, marginBottom: 8 },
  statValue: { color: '#FFF', fontSize: 28, fontWeight: '900' },
  statUnit: { fontSize: 14, color: 'rgba(255,255,255,0.4)' },

  eventsContainer: { marginTop: 20 },
  monthTag: { color: Theme.colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 32 },
  
  itemRow: { flexDirection: 'row', marginBottom: 0, height: 110 },
  itemLeft: { alignItems: 'center', width: 60, marginRight: 16 },
  dayText: { color: '#FFF', fontSize: 24, fontWeight: '900' },
  monText: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '900', marginTop: 4 },
  vLine: { width: 1, flex: 1, backgroundColor: 'rgba(255,255,255,0.08)', marginVertical: 12 },
  
  itemMain: { flex: 1, position: 'relative' },
  cardGlow: { position: 'absolute', top: 5, left: 10, width: '90%', height: 75, backgroundColor: 'rgba(168, 85, 247, 0.05)', filter: 'blur(20px)' },
  itemCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Theme.colors.surfaceCard, padding: 18, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  itemTitle: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  itemSub: { color: 'rgba(255,255,255,0.4)', fontSize: 11, fontWeight: '600', marginTop: 4 },

  fab: { position: 'absolute', bottom: 120, right: 30, zIndex: 100 },
  fabGrad: { width: 68, height: 68, borderRadius: 34, alignItems: 'center', justifyContent: 'center', ...Theme.shadows.glow },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { height: '65%', padding: 40, borderTopLeftRadius: 40, borderTopRightRadius: 40, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  modalTitle: { color: '#FFF', fontSize: 28, fontWeight: '900' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 12 },
  label: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 16 },
  input: { backgroundColor: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 16, color: '#FFF', fontSize: 16, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  saveBtn: { marginTop: 10, borderRadius: 20, overflow: 'hidden' },
  saveGrad: { paddingVertical: 24, alignItems: 'center' },
  saveText: { color: '#FFF', fontSize: 18, fontWeight: '900' },
});
