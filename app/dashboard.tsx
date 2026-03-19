import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { Activity, Bell, MapPin, Heart, Sparkles, Clock, Scale, Dog, Star, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Defs, LinearGradient as SvgGradient, Stop, Line, Text as SvgText, Rect } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

// Weight chart data
const CHART_DATA = [
  { month: 'Oct', value: 32.5 },
  { month: 'Nov', value: 33.1 },
  { month: 'Déc', value: 33.8 },
  { month: 'Jan', value: 34.2 },
  { month: 'Fév', value: 34.0 },
  { month: 'Mar', value: 33.9 },
  { month: 'Avr', value: 34.0 },
];

function WeightLineChart() {
  const chartW = Math.min(SCREEN_W - 96, 600);
  const chartH = 160;
  const padL = 40; const padR = 20; const padT = 20; const padB = 40;
  const W = chartW - padL - padR;
  const H = chartH - padT - padB;

  const vals = CHART_DATA.map(d => d.value);
  const minV = Math.min(...vals) - 1;
  const maxV = Math.max(...vals) + 0.5;

  const toX = (i: number) => padL + (i / (CHART_DATA.length - 1)) * W;
  const toY = (v: number) => padT + H - ((v - minV) / (maxV - minV)) * H;

  // SVG path for the line
  const linePath = CHART_DATA.map((d, i) => `${i === 0 ? 'M' : 'L'} ${toX(i).toFixed(1)} ${toY(d.value).toFixed(1)}`).join(' ');
  // Fill area under line
  const areaPath = linePath + ` L ${toX(CHART_DATA.length - 1).toFixed(1)} ${(padT + H).toFixed(1)} L ${toX(0).toFixed(1)} ${(padT + H).toFixed(1)} Z`;

  // Peak point index
  const peakIdx = vals.indexOf(Math.max(...vals));

  return (
    <Svg width={chartW} height={chartH}>
      <Defs>
        <SvgGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#A855F7" stopOpacity="0.35" />
          <Stop offset="1" stopColor="#A855F7" stopOpacity="0" />
        </SvgGradient>
        <SvgGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#7C3AED" />
          <Stop offset="1" stopColor="#C084FC" />
        </SvgGradient>
      </Defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => (
        <Line key={i}
          x1={padL} y1={padT + H * t}
          x2={padL + W} y2={padT + H * t}
          stroke="rgba(255,255,255,0.05)" strokeWidth="1"
        />
      ))}

      {/* Area fill */}
      <Path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <Path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      {CHART_DATA.map((d, i) => {
        const isPeak = i === peakIdx;
        const cx = toX(i); const cy = toY(d.value);
        return (
          <Circle key={i}
            cx={cx} cy={cy}
            r={isPeak ? 7 : 5}
            fill={isPeak ? '#C084FC' : '#A855F7'}
            stroke={isPeak ? 'rgba(192,132,252,0.4)' : 'transparent'}
            strokeWidth={isPeak ? 6 : 0}
          />
        );
      })}

      {/* Peak label */}
      {(() => {
        const px = toX(peakIdx); const py = toY(vals[peakIdx]);
        return (
          <>
            <Rect x={px - 22} y={py - 30} width={44} height={20} rx={8} fill="#A855F7" />
            <SvgText x={px} y={py - 16} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
              +1.5kg
            </SvgText>
          </>
        );
      })()}

      {/* X axis labels */}
      {CHART_DATA.map((d, i) => (
        <SvgText key={i}
          x={toX(i)} y={chartH - 5}
          textAnchor="middle" fill="rgba(255,255,255,0.35)" fontSize="10" fontWeight="600"
        >
          {d.month}
        </SvgText>
      ))}

      {/* Y axis */}
      {[minV + 0.5, minV + 1.5, minV + 2.5].map((v, i) => (
        <SvgText key={i}
          x={padL - 5} y={toY(v) + 4}
          textAnchor="end" fill="rgba(255,255,255,0.25)" fontSize="9"
        >
          {v.toFixed(0)}
        </SvgText>
      ))}
    </Svg>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const { pet, loading } = usePet();
  const router = useRouter();
  const fullName = user?.user_metadata?.full_name?.split(' ')[0] || 'Sarah';
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.96)).current;

  useEffect(() => {
    if (!loading) {
      Animated.parallel([
        Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
        Animated.spring(scaleAnim, { toValue: 1, tension: 60, friction: 8, useNativeDriver: true }),
      ]).start();
    }
  }, [loading]);

  if (loading) return (
    <View style={styles.loading}>
      <LinearGradient colors={['#170B3B', '#000']} style={StyleSheet.absoluteFill} />
      <Activity color="#A855F7" size={40} />
    </View>
  );

  const currentPet = pet || { name: 'Buddy', breed: 'Golden Retriever', age: '3 ans', weight: '34 kg', photo: null };
  const petPhoto = (pet as any)?.photo || null;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1A0A3E', '#0D0720', '#000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {/* Bokeh orbs */}
      <View style={styles.orb1} /><View style={styles.orb2} /><View style={styles.orb3} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.logoBg}>
              <Heart color="white" size={20} fill="white" />
            </LinearGradient>
            <Text style={styles.brand}>VetCare <Text style={{ fontWeight: '400', color: 'rgba(255,255,255,0.7)' }}>Pro</Text></Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}><Bell color="rgba(255,255,255,0.8)" size={22} /></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings' as any)}>
              {petPhoto ? (
                <Image source={{ uri: petPhoto }} style={styles.avatar} />
              ) : (
                <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop' }} style={styles.avatar} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcomeText}>Ravi de vous revoir, <Text style={styles.nameHighlight}>{fullName}</Text> !</Text>

        {/* ── HERO PET CARD ── */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={() => router.push('/pet-profile' as any)}>
          <Image
            source={petPhoto ? { uri: petPhoto } : { uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=400&fit=crop&crop=center' }}
            style={styles.buddyImg}
          />
          {/* Gradient overlay */}
          <LinearGradient colors={['transparent', 'rgba(14,8,36,0.95)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.heroOverlayGrad} />
          
          <View style={styles.heroContent}>
            <Text style={styles.heroName}>{currentPet.name}</Text>
            <View style={styles.heroStats}>
              <View style={styles.statPill}>
                <Clock color="rgba(168,85,247,0.9)" size={14} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.statL}>Âge</Text>
                  <Text style={styles.statV}>{currentPet.age}</Text>
                </View>
              </View>
              <View style={styles.statPill}>
                <Scale color="rgba(168,85,247,0.9)" size={14} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.statL}>Poids</Text>
                  <Text style={styles.statV}>{currentPet.weight}</Text>
                </View>
              </View>
              <View style={styles.statPill}>
                <Dog color="rgba(168,85,247,0.9)" size={14} />
                <View style={{ marginLeft: 8 }}>
                  <Text style={styles.statL}>Race</Text>
                  <Text style={styles.statV}>{currentPet.breed}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Pagination dots */}
          <View style={styles.dots}>
            {[0, 1, 2].map(i => <View key={i} style={[styles.dot, i === 0 && styles.dotActive]} />)}
          </View>
        </TouchableOpacity>

        {/* ── WEIGHT TRACKER ── */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Suivi du poids santé</Text>
              <Text style={styles.cardSub}>7 derniers mois • kg</Text>
            </View>
            <View style={styles.trendBadge}>
              <Sparkles color="white" size={12} />
              <Text style={styles.trendText}>+1.5 kg</Text>
            </View>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <WeightLineChart />
          </ScrollView>
        </View>

        {/* ── QUICK ACTIONS ── */}
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/appointments' as any)}>
            <LinearGradient colors={['rgba(168,85,247,0.25)', 'rgba(124,58,237,0.1)']} style={styles.quickBtnGrad}>
              <Text style={styles.quickIcon}>📅</Text>
              <Text style={styles.quickLabel}>Agenda</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/map' as any)}>
            <LinearGradient colors={['rgba(59,130,246,0.25)', 'rgba(37,99,235,0.1)']} style={styles.quickBtnGrad}>
              <Text style={styles.quickIcon}>🗺️</Text>
              <Text style={styles.quickLabel}>Carte & Météo</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/ai-assist' as any)}>
            <LinearGradient colors={['rgba(16,185,129,0.25)', 'rgba(5,150,105,0.1)']} style={styles.quickBtnGrad}>
              <Text style={styles.quickIcon}>🤖</Text>
              <Text style={styles.quickLabel}>VetAI</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickBtn} onPress={() => router.push('/history' as any)}>
            <LinearGradient colors={['rgba(245,158,11,0.25)', 'rgba(217,119,6,0.1)']} style={styles.quickBtnGrad}>
              <Text style={styles.quickIcon}>📋</Text>
              <Text style={styles.quickLabel}>Historique</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* ── VETS ── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Vétérinaires à proximité</Text>
          <TouchableOpacity onPress={() => router.push('/map' as any)}>
            <Text style={styles.seeAll}>Voir tout →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
          <VetCard name="Happy Paws Clinic" rating="4.9" dist="1.2 km" img="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop" />
          <VetCard name="City Vet Hospital" rating="4.7" dist="2.5 km" img="https://images.unsplash.com/photo-1599423300746-b62533397364?w=300&h=200&fit=crop" />
          <VetCard name="Pet Wellness Center" rating="4.8" dist="0.8 km" img="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=300&h=200&fit=crop" />
        </ScrollView>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function VetCard({ name, rating, dist, img }: any) {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.vetCard} onPress={() => router.push('/map' as any)}>
      <Image source={{ uri: img }} style={styles.vetImg} />
      <LinearGradient colors={['transparent', 'rgba(0,0,0,0.7)']} style={styles.vetImgOverlay} />
      <View style={styles.vetContent}>
        <Text style={styles.vetName}>{name}</Text>
        <View style={styles.vetMeta}>
          <Star color="#F59E0B" size={13} fill="#F59E0B" />
          <Text style={styles.vetRating}>{rating}</Text>
          <MapPin color="rgba(255,255,255,0.4)" size={11} style={{ marginLeft: 10 }} />
          <Text style={styles.vetDist}>{dist}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 24, paddingTop: 60 },
  orb1: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(168,85,247,0.12)', top: -120, right: -100 },
  orb2: { position: 'absolute', width: 250, height: 250, borderRadius: 125, backgroundColor: 'rgba(124,58,237,0.08)', bottom: 200, left: -80 },
  orb3: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(192,132,252,0.06)', top: 300, left: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { padding: 10, borderRadius: 14, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.5, shadowRadius: 12 },
  brand: { color: 'white', fontSize: 22, fontWeight: '900', marginLeft: 12 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 10, borderRadius: 14, marginRight: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2.5, borderColor: '#A855F7' },
  welcomeText: { color: 'rgba(255,255,255,0.5)', fontSize: 20, fontWeight: '700', marginBottom: 28 },
  nameHighlight: { color: '#fff', fontWeight: '900' },
  heroCard: { borderRadius: 44, overflow: 'hidden', height: 320, marginBottom: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.15, shadowRadius: 40 },
  buddyImg: { width: '100%', height: '100%', position: 'absolute' },
  heroOverlayGrad: { position: 'absolute', bottom: 0, left: 0, right: 0, height: '70%' },
  heroContent: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 28 },
  heroName: { color: 'white', fontSize: 44, fontWeight: '900', marginBottom: 16, textShadowColor: 'rgba(0,0,0,0.5)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between' },
  statPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  statL: { color: 'rgba(255,255,255,0.5)', fontSize: 9, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 0.5 },
  statV: { color: '#fff', fontSize: 13, fontWeight: '900' },
  dots: { position: 'absolute', bottom: 12, right: 28, flexDirection: 'row' },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 3 },
  dotActive: { backgroundColor: '#A855F7', width: 18 },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 40, padding: 28, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 36, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.08, shadowRadius: 30 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  cardTitle: { color: '#fff', fontSize: 19, fontWeight: '900' },
  cardSub: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '700', marginTop: 3 },
  trendBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#A855F7', paddingHorizontal: 12, paddingVertical: 7, borderRadius: 12 },
  trendText: { color: '#fff', fontSize: 12, fontWeight: '900', marginLeft: 5 },
  quickActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 36 },
  quickBtn: { width: '48%', marginBottom: 12, borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  quickBtnGrad: { padding: 20, alignItems: 'center' },
  quickIcon: { fontSize: 28, marginBottom: 8 },
  quickLabel: { color: '#fff', fontSize: 13, fontWeight: '900' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 20 },
  seeAll: { color: '#A855F7', fontSize: 14, fontWeight: '800' },
  vetCard: { width: 180, marginRight: 20, borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  vetImg: { width: '100%', height: 120 },
  vetImgOverlay: { ...StyleSheet.absoluteFillObject },
  vetContent: { backgroundColor: 'rgba(255,255,255,0.04)', padding: 14 },
  vetName: { color: '#fff', fontSize: 14, fontWeight: '900', marginBottom: 8 },
  vetMeta: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: '#F59E0B', fontSize: 12, fontWeight: '800', marginLeft: 4 },
  vetDist: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '700', marginLeft: 4 },
});
