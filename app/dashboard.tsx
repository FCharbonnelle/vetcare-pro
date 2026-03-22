import React, { useRef, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Dimensions, ActivityIndicator } from 'react-native';
import { Bell, MapPin, Heart, Clock, Scale, Dog, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Line, Text as SvgText, Rect } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

const CHART_DATA = [
  { month: 'Oct', value: 32.5 },
  { month: 'Nov', value: 33.1 },
  { month: 'Dec', value: 33.8 },
  { month: 'Jan', value: 34.2 },
  { month: 'Feb', value: 34.0 },
  { month: 'Mar', value: 33.9 },
  { month: 'Apr', value: 34.0 },
];

function WeightLineChart() {
  const chartW = Math.min(SCREEN_W - 48, 600); 
  const chartH = 140;
  const padL = 40; const padR = 20; const padT = 30; const padB = 30; 
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

  return (
    <Svg width={chartW} height={chartH}>
      <Defs>
        <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#B638F6" stopOpacity="0.4" />
          <Stop offset="1" stopColor="#B638F6" stopOpacity="0.0" />
        </SvgGradient>
        <SvgGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#6E23DD" />
          <Stop offset="1" stopColor="#EA3EE0" />
        </SvgGradient>
      </Defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <Line key={i} x1={padL} y1={padT + H * t} x2={padL + W} y2={padT + H * t} stroke="rgba(255,255,255,0.1)" strokeWidth="1" strokeDasharray="3,3" />
      ))}

      <Path d={areaPath} fill="url(#areaGrad)" />
      <Path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

      {/* Peak Label Pill right above the peak point */}
      {(() => {
        const px = toX(peakIdx); const py = toY(vals[peakIdx]);
        return (
          <React.Fragment key="peak">
            <Rect x={px - 22} y={py - 24} width={44} height={18} rx={9} fill="#8231E0" />
            <SvgText x={px} y={py - 12} textAnchor="middle" fill="white" fontSize="9" fontWeight="900">
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
            <Circle cx={cx} cy={cy} r={4} fill="#27094F" stroke="#EA3EE0" strokeWidth={2} />
            <Circle cx={cx} cy={cy} r={2.5} fill="#fff" />
            <SvgText x={cx} y={cy - 10} textAnchor="middle" fill="#fff" fontSize="9" fontWeight="800">
              {d.value.toFixed(1)}
            </SvgText>
          </React.Fragment>
        );
      })}

      {/* X axis labels */}
      {CHART_DATA.map((d, i) => (
        <SvgText key={`xl${i}`} x={toX(i)} y={chartH - 12} textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="600">
          {d.month}
        </SvgText>
      ))}

      {/* Y axis rotated label */}
      <SvgText x={-(chartH / 2) + 5} y={15} transform="rotate(-90)" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="10" fontWeight="600">
        Weight (kg)
      </SvgText>
      
      {/* X axis subtitle */}
      <SvgText x={padL + W / 2} y={chartH - 0} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontWeight="600">
        Months
      </SvgText>
    </Svg>
  );
}

export default function Dashboard() {
  const { user, isLoading: authLoading } = useAuth();
  const { pet, loading: petLoading } = usePet();
  const fullName = user?.user_metadata?.full_name?.split(' ')[0] || 'Sarah';
  const router = useRouter();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const currentPet = pet || { name: 'Buddy', breed: 'Golden Retriever', age: '3 yrs', weight: '34 kg', photo: null };
  // Mock image for Buddy if no pet uploaded vs golden retriever
  const buddyImg = currentPet.photo || 'https://upload.wikimedia.org/wikipedia/commons/e/e3/Golden_Retriever_transparent.png';

  if (authLoading || petLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Exact Match Background Gradient: deep violet to blackish indigo */}
      <LinearGradient colors={['#3F1174', '#150330', '#0B011A']} start={{ x: 0, y: 0 }} end={{ x: 0.8, y: 1 }} style={StyleSheet.absoluteFill} />
      
      {/* Large Glowing Orbs for the "aura" effect found in the mockup */}
      <View style={styles.glowTopRight} />
      <View style={styles.glowMidLeft} />
      <View style={styles.glowBottomRight} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        {/* HEADER: Nav-like top bar matching mockup */}
        <View style={styles.header}>
          <View style={styles.brandRow}>
            {/* The Heart-Paw substitute */}
            <View style={styles.brandIcon}>
              <Heart color="#C084FC" fill="#C084FC" size={24} />
              <Dog color="#3F1174" size={12} style={{position: 'absolute', top: 6, left: 6}} />
            </View>
            <Text style={styles.brandText}>VetCare <Text style={{fontWeight: '400'}}>Pro</Text></Text>
          </View>
          
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.bellBtn}>
              <Bell color="#fff" size={20} />
              <View style={styles.bellDot} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings' as any)}>
              <Image source={{uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'}} style={styles.avatar} />
            </TouchableOpacity>
          </View>
        </View>

        {/* WELCOME TEXT */}
        <Text style={styles.welcomeText}>Welcome back, {fullName}!</Text>

        {/* ── HERO PET CARD (BUDDY) ── */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={() => router.push('/pet-profile' as any)}>
          <LinearGradient colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.04)']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.heroGlass}>
            
            {/* Left side: Golden Retriever taking up the height, slightly overflowing */}
            <View style={styles.heroLeft}>
              <Image 
                source={{uri: buddyImg}} 
                style={styles.heroImage} 
                resizeMode="contain" 
              />
              <Text style={styles.heroName}>{currentPet.name}</Text>
            </View>

            {/* Right side: 3 Stats Pills stacked vertically */}
            <View style={styles.heroRight}>
              <View style={styles.statPill}>
                <View style={styles.statIcon}><Clock color="#fff" size={12} /></View>
                <View>
                  <Text style={styles.statLabel}>Age</Text>
                  <Text style={styles.statValue}>{currentPet.age}</Text>
                </View>
              </View>
              <View style={styles.statPill}>
                <View style={styles.statIcon}><Scale color="#fff" size={12} /></View>
                <View>
                  <Text style={styles.statLabel}>Weight</Text>
                  <Text style={styles.statValue}>{currentPet.weight}</Text>
                </View>
              </View>
              <View style={styles.statPill}>
                <View style={styles.statIcon}><Dog color="#fff" size={12} /></View>
                <View>
                  <Text style={styles.statLabel}>Type</Text>
                  <Text style={styles.statValue}>{currentPet.breed}</Text>
                </View>
              </View>
            </View>
            
          </LinearGradient>
        </TouchableOpacity>

        {/* ── HEALTH WEIGHT TRACKER ── */}
        <View style={styles.glassCard}>
          <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.03)']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.glassInner}>
            <Text style={styles.cardTitle}>Health Weight Tracker</Text>
            <View style={styles.chartContainer}>
              <WeightLineChart />
            </View>
          </LinearGradient>
        </View>

        {/* ── LOCAL VETERINARIANS ── */}
        <Text style={styles.sectionTitle}>Local Veterinarians</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <VetCard name="Happy Paws Clinic" rating="4.9" dist="1.2 mi" img="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop" />
          <VetCard name="City Vet Hospital" rating="4.7" dist="2.5 mi" img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" />
          <VetCard name="Pet Wellness Center" rating="4.8" dist="0.8 mi" img="https://images.unsplash.com/photo-1594824436998-fa58cb854736?w=300&h=300&fit=crop" />
        </ScrollView>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function VetCard({ name, rating, dist, img }: {name:string, rating:string, dist:string, img:string}) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.vetCardWrap} onPress={() => router.push('/map' as any)}>
      <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.03)']} start={{x:0, y:0}} end={{x:1, y:1}} style={styles.vetCardGlass}>
        <View style={styles.vetImgWrap}>
          <Image source={{ uri: img }} style={styles.vetImg} />
        </View>
        <Text style={styles.vetName} numberOfLines={2}>{name}</Text>
        <View style={styles.vetMetaRow}>
          <View style={styles.vetMetaItem}>
            <Star color="#F59E0B" size={10} fill="#F59E0B" />
            <Text style={styles.vetRating}>{rating}</Text>
          </View>
          <View style={styles.vetMetaItem}>
             <MapPin color="rgba(255,255,255,0.6)" size={10} />
             <Text style={styles.vetDist}>{dist}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#150330' },
  scroll: { padding: 24, paddingTop: 50 },
  
  // Ambient Aura Glowing Effects
  glowTopRight: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: '#8B1874', top: -100, right: -150, opacity: 0.35, filter: 'blur(60px)' },
  glowMidLeft: { position: 'absolute', width: 350, height: 350, borderRadius: 175, backgroundColor: '#6C24B5', top: 250, left: -150, opacity: 0.25, filter: 'blur(70px)' },
  glowBottomRight: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: '#B638F6', bottom: 50, right: -100, opacity: 0.2, filter: 'blur(60px)' },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  brandRow: { flexDirection: 'row', alignItems: 'center' },
  brandIcon: { width: 32, height: 32, justifyContent: 'center', alignItems: 'center' },
  brandText: { color: 'white', fontSize: 18, fontWeight: '800', marginLeft: 4, letterSpacing: -0.5 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  bellBtn: { padding: 8, marginRight: 8, position: 'relative' },
  bellDot: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, backgroundColor: '#EF4444', borderRadius: 4, borderWidth: 1.5, borderColor: '#2A0A4A' },
  avatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 1.5, borderColor: '#fff' },
  
  welcomeText: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 28, letterSpacing: -0.5 },
  
  // Hero Card "Buddy"
  heroCard: { width: '100%', height: 200, borderRadius: 32, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  heroGlass: { flex: 1, flexDirection: 'row', paddingRight: 20 },
  heroLeft: { flex: 1.2, justifyContent: 'flex-end', alignItems: 'center', position: 'relative' },
  heroImage: { width: '120%', height: '110%', position: 'absolute', bottom: -10, left: -10 },
  heroName: { color: '#fff', fontSize: 28, fontWeight: '900', position: 'absolute', bottom: 20, left: 24, textShadowColor: 'rgba(0,0,0,0.4)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 8 },
  heroRight: { flex: 0.8, justifyContent: 'center', gap: 10 },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.2)', paddingHorizontal: 12, paddingVertical: 10, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  statIcon: { backgroundColor: 'transparent', marginRight: 8 },
  statLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600', textTransform: 'uppercase' },
  statValue: { color: '#fff', fontSize: 12, fontWeight: '800' },

  // Glass Card Generic (Tracker)
  glassCard: { width: '100%', borderRadius: 28, overflow: 'hidden', marginBottom: 28, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.25, shadowRadius: 20 },
  glassInner: { padding: 24 },
  cardTitle: { color: '#fff', fontSize: 19, fontWeight: '800', marginBottom: 20 },
  chartContainer: { alignItems: 'center', marginLeft: -12 }, // offset padding for Y axis label

  sectionTitle: { color: '#fff', fontSize: 19, fontWeight: '800', marginBottom: 16 },

  // Vet Card exactly matching mockup
  vetCardWrap: { width: 140, height: 160, marginRight: 16, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 10 },
  vetCardGlass: { flex: 1, padding: 12 },
  vetImgWrap: { width: '100%', height: 75, borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  vetImg: { width: '100%', height: '100%' },
  vetName: { color: '#fff', fontSize: 13, fontWeight: '800', marginVertical: 6, lineHeight: 16 },
  vetMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 },
  vetMetaItem: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: '#F59E0B', fontSize: 10, fontWeight: '800', marginLeft: 4 },
  vetDist: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600', marginLeft: 4 },
});
