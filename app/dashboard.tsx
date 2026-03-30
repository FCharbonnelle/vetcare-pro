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
      <LinearGradient colors={['#170B3B', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      
      {/* Animated Glowing Orbs */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowMidLeft} />
      <View style={styles.glowBottomRight} />

      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            <View style={styles.logoBg}>
              <Heart color="white" fill="white" size={20} />
            </View>
            <Text style={styles.brandText}>VetCare <Text style={{fontWeight: '400'}}>Pro</Text></Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={() => setNotifModalVisible(true)}>
              <Bell color="#fff" size={20} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings' as any)} style={styles.avatarBtn}>
              <Image source={{uri: user?.user_metadata?.avatar_url || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'}} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* WELCOME */}
        <View style={styles.welcomeSection}>
           <Text style={styles.welcomeSub}>TABLEAU DE BORD</Text>
           <Text style={styles.welcomeText}>Bonjour, {firstName} ! 👋</Text>
        </View>

        {/* ── HERO PET CARD ── */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={() => router.push('/pet-profile' as any)}>
          <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.03)']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.heroGlass}>
            
            <View style={styles.heroLeft}>
              <Image source={{uri: buddyImg}} style={styles.heroImage} resizeMode="contain" />
              <View style={styles.heroNameBadge}>
                 <Text style={styles.heroName}>{currentPet.name}</Text>
                 <View style={styles.onlineDot} />
              </View>
            </View>

            <View style={styles.heroRight}>
              <StatPill icon={Clock} label="Âge" value={currentPet.age} />
              <StatPill icon={Scale} label="Poids" value={currentPet.weight} />
              <StatPill icon={Dog} label="Race" value={currentPet.breed.split(' ')[0]} />
            </View>
            
          </LinearGradient>
        </TouchableOpacity>

        {/* ── QUICK ACTIONS ── */}
        <View style={styles.quickActions}>
           <QuickAction icon={Zap} label="IA Assist" color="#A855F7" onPress={() => router.push('/ai-assist' as any)} />
           <QuickAction icon={Activity} label="Santé" color="#10B981" onPress={() => router.push('/history' as any)} />
           <QuickAction icon={MapPin} label="Trouver" color="#3B82F6" onPress={() => router.push('/map' as any)} />
        </View>

        {/* ── WEIGHT TRACKER ── */}
        <View style={styles.glassCard}>
          <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} style={styles.glassInner}>
            <View style={styles.cardHeader}>
               <Text style={styles.cardTitle}>Suivi du poids 📈</Text>
               <TouchableOpacity onPress={() => router.push('/history' as any)}><Text style={styles.seeAll}>Plus</Text></TouchableOpacity>
            </View>
            <View style={styles.chartContainer}>
              <WeightLineChart />
            </View>
          </LinearGradient>
        </View>

        {/* ── LOCAL VETERINARIANS ── */}
        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Vétérinaires à proximité</Text>
           <TouchableOpacity onPress={() => router.push('/map' as any)}><Text style={styles.seeAll}>Voir tout</Text></TouchableOpacity>
        </View>
        
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 24, paddingRight: 8, paddingBottom: 20 }}
          data={VET_DATA}
          keyExtractor={(item) => item.id}
          renderItem={({ item }: { item: typeof VET_DATA[0] }) => (
            <VetCard name={item.name} rating={item.rating} dist={item.dist} img={item.img} />
          )}
        />

        <View style={{ height: 120 }} />
      </Animated.ScrollView>
      <Modal visible={notifModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={StyleSheet.absoluteFill} onPress={() => setNotifModalVisible(false)} />
          <View style={styles.notifContent}>
            <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 40 }]} />
            <View style={styles.modalHeader}>
               <Text style={styles.modalTitle}>Notifications</Text>
               <TouchableOpacity onPress={() => setNotifModalVisible(false)}><Text style={{color: '#A855F7', fontWeight: '800'}}>Fermer</Text></TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
               <NotifItem icon={Bell} title="Rappel: Vaccin demain" time="Il y a 2h" color="#A855F7" />
               <NotifItem icon={Activity} title="Poids en hausse !" time="Hier" color="#10B981" />
               <NotifItem icon={Zap} title="Conseil IA disponible" time="2 jours" color="#3B82F6" />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { paddingTop: 20 },
  
  glowTopRight: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(139, 24, 116, 0.15)', top: -100, right: -150, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  glowMidLeft: { position: 'absolute', width: 350, height: 350, borderRadius: 175, backgroundColor: 'rgba(108, 36, 181, 0.1)', top: 250, left: -150, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },
  glowBottomRight: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(168, 85, 247, 0.1)', bottom: 50, right: -100, filter: Platform.OS === 'web' ? 'blur(80px)' : undefined },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 32, paddingTop: Platform.OS === 'android' ? 40 : 10 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { backgroundColor: '#A855F7', padding: 8, borderRadius: 12, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.5, shadowRadius: 10 },
  brandText: { color: 'white', fontSize: 20, fontWeight: '900', marginLeft: 12, letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  actionBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 14, marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  avatarBtn: { borderRadius: 14, overflow: 'hidden', borderWidth: 1.5, borderColor: '#A855F7' },
  avatar: { width: 36, height: 36 },
  bellDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, backgroundColor: '#EF4444', borderRadius: 4, borderWidth: 1.5, borderColor: '#150330' },
  
  welcomeSection: { paddingHorizontal: 24, marginBottom: 24 },
  welcomeSub: { color: '#A855F7', fontSize: 12, fontWeight: '900', letterSpacing: 2, marginBottom: 8 },
  welcomeText: { color: '#fff', fontSize: 28, fontWeight: '900', letterSpacing: -0.5 },
  
  heroCard: { marginHorizontal: 24, height: 210, borderRadius: 40, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.15, shadowRadius: 30 },
  heroGlass: { flex: 1, flexDirection: 'row', padding: 20 },
  heroLeft: { flex: 1.2, justifyContent: 'flex-end', position: 'relative' },
  heroImage: { width: '130%', height: '120%', position: 'absolute', bottom: -10, left: -25 },
  heroNameBadge: { position: 'absolute', bottom: 0, left: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  heroName: { color: '#fff', fontSize: 18, fontWeight: '900' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#10B981', marginLeft: 8 },
  heroRight: { flex: 0.8, justifyContent: 'center', gap: 12 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  statIcon: { marginRight: 10 },
  statLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  statValue: { color: '#fff', fontSize: 13, fontWeight: '900', marginTop: 1 },

  quickActions: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 32 },
  qaBtn: { alignItems: 'center', flex: 1 },
  qaIcon: { width: 60, height: 60, borderRadius: 24, backgroundColor: 'rgba(255,255,255,0.05)', justifyContent: 'center', alignItems: 'center', marginBottom: 10, borderWidth: 1 },
  qaLabel: { color: '#fff', fontSize: 14, fontWeight: '800' },

  glassCard: { marginHorizontal: 24, borderRadius: 36, overflow: 'hidden', marginBottom: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  glassInner: { padding: 24 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  cardTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },
  seeAll: { color: '#A855F7', fontSize: 13, fontWeight: '800' },
  chartContainer: { alignItems: 'center', marginLeft: -10 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, marginBottom: 16 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '900' },

  vetCardWrap: { width: 160, marginRight: 16, borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  vetCardGlass: { flex: 1 },
  vetImg: { width: '100%', height: 100 },
  vetContent: { padding: 12 },
  vetName: { color: '#fff', fontSize: 14, fontWeight: '900', marginBottom: 6 },
  vetMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vetMetaItem: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: '#F59E0B', fontSize: 11, fontWeight: '900', marginLeft: 4 },
  vetDist: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '800' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'center', padding: 24 },
  notifContent: { height: 400, borderRadius: 40, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  notifItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  notifIcon: { padding: 10, borderRadius: 14, borderWidth: 1 },
  notifTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  notifTime: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '600', marginTop: 2 },
});
