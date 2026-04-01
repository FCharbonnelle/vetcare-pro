import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Dimensions, Platform, Modal, FlatList } from 'react-native';
import { Bell, MapPin, Heart, Clock, Scale, Dog, Star, Zap, Activity } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Line, Text as SvgText, Rect } from 'react-native-svg';
import { StatPill } from '@/components/StatPill';
import { QuickAction } from '@/components/QuickAction';
import { VetCard } from '@/components/VetCard';
import { NotifItem } from '@/components/NotifItem';


const { width: SCREEN_W } = Dimensions.get('window');

const CHART_DATA = [
  { month: 'Oct', value: 32.5 },
  { month: 'Nov', value: 33.1 },
  { month: 'Déc', value: 33.8 },
  { month: 'Jan', value: 34.2 },
  { month: 'Fév', value: 34.0 },
  { month: 'Mar', value: 33.9 },
  { month: 'Avr', value: 34.0 },
];

const VET_DATA = [
  { id: '1', name: "Clinique de l'Espoir", rating: "4.9", dist: "1.2 km", img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop" },
  { id: '2', name: "Urgences Vétos 24/7", rating: "4.7", dist: "2.5 km", img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" },
  { id: '3', name: "Centre du Bien-être", rating: "4.8", dist: "0.8 km", img: "https://images.unsplash.com/photo-1594824436998-fa58cb854736?w=300&h=300&fit=crop" },
];

function WeightLineChart() {
  const { chartW, chartH, linePath, areaPath, peakIdx, vals, toX, toY, padL, padT, H, W } = React.useMemo(() => {
    const chartW = Math.min(SCREEN_W - 48, 600); 
    const chartH = 160;
    const padL = 40; const padR = 20; const padT = 30; const padB = 40; 
    const W = chartW - padL - padR;
    const H = chartH - padT - padB;

    const vals = CHART_DATA.map(d => d.value);
    const minV = Math.floor(Math.min(...vals)) - 0.5;
    const maxV = Math.ceil(Math.max(...vals)) + 0.5;

    const toX = (i: number) => padL + (i / (CHART_DATA.length - 1)) * W;
    const toY = (v: number) => padT + H - ((v - minV) / (maxV - minV)) * H;

    const getSmilePath = () => {
      let d = `M ${toX(0).toFixed(1)} ${toY(CHART_DATA[0].value).toFixed(1)} `;
      for (let i = 1; i < CHART_DATA.length; i++) {
          const p0 = CHART_DATA[i - 1];
          const p1 = CHART_DATA[i];
          const cx = (toX(i - 1) + toX(i)) / 2;
          d += `C ${cx.toFixed(1)} ${toY(p0.value).toFixed(1)}, ${cx.toFixed(1)} ${toY(p1.value).toFixed(1)}, ${toX(i).toFixed(1)} ${toY(p1.value).toFixed(1)} `;
      }
      return d;
    }
    
    const linePath = getSmilePath();
    const areaPath = linePath + ` L ${toX(CHART_DATA.length - 1).toFixed(1)} ${(padT + H).toFixed(1)} L ${toX(0).toFixed(1)} ${(padT + H).toFixed(1)} Z`;
    const peakIdx = CHART_DATA.findIndex(d => d.value === Math.max(...vals));

    return { chartW, chartH, linePath, areaPath, peakIdx, vals, toX, toY, padL, padT, H, W };
  }, [SCREEN_W]);

  return (
    <Svg width={chartW} height={chartH}>
      <Defs>
        <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B638F6" stopOpacity="0.4" />
          <Stop offset="1" stopColor="#B638F6" stopOpacity="0.0" />
        </SvgGradient>
        <SvgGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#A855F7" />
          <Stop offset="1" stopColor="#EC4899" />
        </SvgGradient>
      </Defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <Line key={i} x1={padL} y1={padT + H * t} x2={padL + W} y2={padT + H * t} stroke="rgba(255,255,255,0.05)" strokeWidth="1" strokeDasharray="3,3" />
      ))}

      <Path d={areaPath} fill="url(#areaGrad)" />
      <Path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

      {/* Peak Label Pill */}
      {(() => {
        const px = toX(peakIdx); const py = toY(vals[peakIdx]);
        return (
          <React.Fragment key="peak">
            <Rect x={px - 25} y={py - 28} width={50} height={20} rx={10} fill="#A855F7" />
            <SvgText x={px} y={py - 14} textAnchor="middle" fill="white" fontSize="10" fontWeight="900">
              +1.5kg
            </SvgText>
          </React.Fragment>
        );
      })()}

      {/* Dots and Labels */}
      {CHART_DATA.map((d, i) => {
        const cx = toX(i); const cy = toY(d.value);
        return (
          <React.Fragment key={i}>
            <Circle cx={cx} cy={cy} r={5} fill="#150330" stroke="#EC4899" strokeWidth={2.5} />
            <Circle cx={cx} cy={cy} r={2} fill="#fff" />
          </React.Fragment>
        );
      })}

      {/* X axis labels */}
      {CHART_DATA.map((d, i) => (
        <SvgText key={`xl${i}`} x={toX(i)} y={chartH - 15} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="800">
          {d.month}
        </SvgText>
      ))}

      {/* Labels */}
      <SvgText x={10} y={chartH / 2} transform={`rotate(-90, 10, ${chartH / 2})`} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="900" letterSpacing="1">
        POIDS (KG)
      </SvgText>
    </Svg>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { pet } = usePet();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'Ami';
  const router = useRouter();
  const [notifModalVisible, setNotifModalVisible] = React.useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 50, friction: 8, useNativeDriver: true })
    ]).start();
  }, []);

  const currentPet = pet || { name: 'Buddy', breed: 'Golden Retriever', age: '3 ans', weight: '34 kg', photo: null };
  const buddyImg = currentPet.photo || 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Golden_Retriever_transparent.png';

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#150F2B', '#0F0925', '#000']} style={StyleSheet.absoluteFill} />
      
      {/* Animated Glowing Orbs */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowMidLeft} />
      <View style={styles.glowBottomRight} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}>
        
        {/* HEADER BAR */}
        <View style={styles.header}>
           <View style={styles.headerLeft}>
             <View style={styles.statusDot} />
             <Text style={styles.healthStatus}>SANTÉ : OPTIMALE</Text>
           </View>
           
           <TouchableOpacity onPress={() => setNotifModalVisible(true)} style={styles.notifBtn}>
             <Bell color="white" size={24} />
             <View style={styles.badge} />
           </TouchableOpacity>
           
           <TouchableOpacity onPress={() => router.push('/settings' as any)} style={styles.avatarBtn}>
             <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&h=140&fit=crop' }} style={styles.avatar} />
           </TouchableOpacity>
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeSection}>
           <Text style={styles.welcomeSub}>TABLEAU DE BORD</Text>
           <Text style={styles.welcomeText}>Bonjour, {firstName} ! 👋</Text>
        </View>

        {/* ── HERO PET CARD ── */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={() => router.push('/pet-profile' as any)}>
           <LinearGradient colors={['rgba(168,85,247,0.25)', 'rgba(124,58,237,0.05)']} style={styles.heroGrad}>
              <View style={styles.heroContent}>
                 <View style={styles.heroText}>
                    <Text style={styles.petName}>{currentPet.name}</Text>
                    <Text style={styles.petBreed}>{currentPet.breed}</Text>
                    <View style={styles.tagPro}>
                      <Star color="#F59E0B" size={12} fill="#F59E0B" />
                      <Text style={styles.tagProText}>SUIVI PREMIUM</Text>
                    </View>
                 </View>
                 <Image source={{ uri: buddyImg }} style={styles.buddyImg} />
              </View>
              
              <View style={styles.heroStats}>
                <StatPill icon={Clock} label="Âge" value={currentPet.age} />
                <StatPill icon={Scale} label="Poids" value={currentPet.weight} />
                <StatPill icon={Heart} label="Pouls" value="72 bpm" />
              </View>
           </LinearGradient>
        </TouchableOpacity>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.actionsGrid}>
           <QuickAction icon={Zap} label="IA Assist" color="#A855F7" onPress={() => router.push('/ai-assist' as any)} />
           <QuickAction icon={Activity} label="Santé" color="#10B981" onPress={() => router.push('/history' as any)} />
           <QuickAction icon={MapPin} label="Trouver" color="#3B82F6" onPress={() => router.push('/map' as any)} />
        </View>

        {/* ── WEIGHT CHART ── */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Courbe de Poids</Text>
           <TouchableOpacity><Text style={styles.seeAll}>Détails</Text></TouchableOpacity>
        </View>
        <View style={styles.chartCard}>
           <WeightLineChart />
        </View>

        {/* ── VET LIST ── */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Vétérinaires Proches</Text>
           <TouchableOpacity onPress={() => router.push('/map' as any)}><Text style={styles.seeAll}>Voir Carte</Text></TouchableOpacity>
        </View>
        <FlatList
          data={VET_DATA}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <VetCard {...item} />
          )}
        />

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* NOTIFICATIONS MODAL */}
      <Modal visible={notifModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
           <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                 <Text style={styles.modalTitle}>Notifications</Text>
                 <TouchableOpacity onPress={() => setNotifModalVisible(false)}>
                    <Text style={[styles.seeAll, { fontSize: 16 }]}>Fermer</Text>
                 </TouchableOpacity>
              </View>
              <ScrollView>
                 <NotifItem 
                   icon={Bell}
                   title="Vaccin Rappel" 
                   time="2h" 
                   color="#A855F7" 
                 />
                 <NotifItem 
                   icon={Activity}
                   title="Poids Stable" 
                   time="5h" 
                   color="#10B981" 
                 />
                 <NotifItem 
                   icon={MapPin}
                   title="Nouveau Vétérinaire" 
                   time="1j" 
                   color="#3B82F6" 
                 />
              </ScrollView>
           </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0F0925' },
  scroll: { padding: 24, paddingTop: SCREEN_W > 1024 ? 30 : 60 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 44 
  },
  headerLeft: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(21, 15, 43, 0.4)', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  statusDot: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    backgroundColor: '#10B981', 
    marginRight: 10, 
    shadowColor: '#10B981', 
    shadowRadius: 10, 
    shadowOpacity: 1 
  },
  healthStatus: { color: 'rgba(231, 222, 255, 0.8)', fontSize: 9, fontWeight: '900', letterSpacing: 1.5 },
  notifBtn: { 
    backgroundColor: 'rgba(21, 15, 43, 0.4)', 
    padding: 14, 
    borderRadius: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4
  },
  badge: { 
    position: 'absolute', 
    top: 12, 
    right: 12, 
    width: 8, 
    height: 8, 
    borderRadius: 4, 
    backgroundColor: '#EF4444', 
    borderWidth: 1.5, 
    borderColor: '#150F2B' 
  },
  avatarBtn: { marginLeft: 16 },
  avatar: { 
    width: 54, 
    height: 54, 
    borderRadius: 18, 
    borderWidth: 2, 
    borderColor: 'rgba(168, 85, 247, 0.3)' 
  },
  welcomeSection: { marginBottom: 40 },
  welcomeSub: { 
    fontSize: 12, 
    fontWeight: '900', 
    color: '#A855F7', 
    letterSpacing: 2, 
    marginBottom: 10,
    textTransform: 'uppercase'
  },
  welcomeText: { 
    fontSize: 36, 
    fontWeight: '900', 
    color: '#E7DEFF', 
    letterSpacing: -1 
  },
  heroCard: { 
    borderRadius: 48, 
    marginBottom: 40, 
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 40,
    elevation: 15
  },
  heroGrad: { padding: 40 },
  heroContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroText: { flex: 1 },
  heroStats: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 40, 
    backgroundColor: 'rgba(21, 15, 43, 0.5)', 
    borderRadius: 32, 
    padding: 8
  },
  petName: { fontSize: 38, fontWeight: '900', color: '#FFFFFF', marginBottom: 8, letterSpacing: -1 },
  petBreed: { fontSize: 18, fontWeight: '700', color: 'rgba(231, 222, 255, 0.4)', marginBottom: 20 },
  tagPro: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(245,158,11,0.1)', 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 14, 
    alignSelf: 'flex-start' 
  },
  tagProText: { color: '#F59E0B', fontSize: 10, fontWeight: '900', marginLeft: 8, letterSpacing: 1 },
  buddyImg: { width: 140, height: 140, resizeMode: 'contain' },
  actionsGrid: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 48,
    gap: 16
  },
  sectionHeader: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 24 
  },
  sectionTitle: { fontSize: 22, fontWeight: '900', color: '#E7DEFF', letterSpacing: -0.5 },
  seeAll: { color: '#A855F7', fontWeight: '800', fontSize: 15 },
  chartCard: { 
    backgroundColor: 'rgba(21, 15, 43, 0.4)', 
    borderRadius: 40, 
    padding: 24, 
    marginBottom: 48, 
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8
  },
  glowTopRight: { 
    position: 'absolute', 
    top: -100, 
    right: -100, 
    width: SCREEN_W * 1.5, 
    height: SCREEN_W * 1.5, 
    borderRadius: SCREEN_W * 0.75, 
    backgroundColor: 'rgba(168, 85, 247, 0.08)', 
    filter: 'blur(100px)',
    zIndex: -1
  },
  glowMidLeft: { 
    position: 'absolute', 
    top: 500, 
    left: -200, 
    width: 500, 
    height: 500, 
    borderRadius: 250, 
    backgroundColor: 'rgba(124, 58, 237, 0.05)', 
    filter: 'blur(120px)',
    zIndex: -1
  },
  glowBottomRight: { 
    position: 'absolute', 
    bottom: -100, 
    right: -100, 
    width: 400, 
    height: 400, 
    borderRadius: 200, 
    backgroundColor: 'rgba(236, 72, 153, 0.04)', 
    filter: 'blur(100px)',
    zIndex: -1
  },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(15, 9, 37, 0.9)', justifyContent: 'center', padding: 24 },
  modalContent: { 
    backgroundColor: '#150F2B', 
    borderRadius: 48, 
    padding: 24, 
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.4,
    shadowRadius: 60,
    elevation: 30
  },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  modalTitle: { color: '#E7DEFF', fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
});
