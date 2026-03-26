import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Animated } from 'react-native';
import { Calendar, Stethoscope, Scissors, Syringe, Plus, ChevronLeft, Heart, Sparkles, Activity, Filter } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function HistoryScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
    ]).start();
  }, []);

  const HistoryItem = ({ icon: Icon, title, date, type, color = "#A855F7" }: any) => (
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
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#170B3B', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      
      {/* Premium Glow Orbs */}
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

        {/* Summary Card - High Polish */}
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
           <TouchableOpacity style={styles.addBtnContainer}>
              <Plus color="#A855F7" size={20} />
              <Text style={styles.addBtnText}>Nouveau</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.listContainer}>
          <HistoryItem icon={Syringe} title="Vaccination Annuelle" date="12 Oct, 2025" type="Préventif" color="#A855F7" />
          <HistoryItem icon={Stethoscope} title="Contrôle Général" date="28 Sep, 2025" type="Clinique" color="#10B981" />
          <HistoryItem icon={Scissors} title="Toilettage Complet" date="15 Sep, 2025" type="Hygiène" color="#F59E0B" />
          <HistoryItem icon={Calendar} title="Consultation Vétérinaire" date="30 Aoû, 2025" type="Clinique" color="#3B82F6" />
        </View>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* FAB - Premium style */}
      <TouchableOpacity style={styles.fab} activeOpacity={0.9}>
        <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.fabGradient}>
          <Plus color="white" size={28} />
        </LinearGradient>
      </TouchableOpacity>
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
  
  summaryCard: { marginHorizontal: 24, borderRadius: 40, overflow: 'hidden', marginBottom: 24, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 25 },
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
});
