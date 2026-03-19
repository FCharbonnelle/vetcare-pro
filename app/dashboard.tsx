import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { Activity, Bell, MapPin, Heart, Sparkles, Clock, Scale, Dog, Star, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import React, { useState, useRef, useEffect } from 'react';
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
          <Stop offset="0" stopColor="#A855F7" stopOpacity="0.5" />
          <Stop offset="1" stopColor="#A855F7" stopOpacity="0.05" />
        </SvgGradient>
        <SvgGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#8B5CF6" />
          <Stop offset="1" stopColor="#D946EF" />
        </SvgGradient>
      </Defs>

      {/* Grid lines */}
      {[0.25, 0.5, 0.75].map((t, i) => (
        <Line key={i}
          x1={padL} y1={padT + H * t}
          x2={padL + W} y2={padT + H * t}
          stroke="rgba(255,255,255,0.08)" strokeWidth="1"
        />
      ))}

      {/* Area fill */}
      <Path d={areaPath} fill="url(#areaGrad)" />

      {/* Line */}
      <Path d={linePath} fill="none" stroke="url(#lineGrad)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      {/* Dots and Labels */}
      {CHART_DATA.map((d, i) => {
        const isPeak = i === peakIdx;
        const cx = toX(i); const cy = toY(d.value);
        return (
          <React.Fragment key={i}>
            <Circle
              cx={cx} cy={cy}
              r={5}
              fill="#fff"
              stroke="#D946EF"
              strokeWidth={3}
            />
            {/* Value text above dot */}
            <SvgText x={cx} y={cy - 12} textAnchor="middle" fill="#fff" fontSize="10" fontWeight="700">
              {d.value.toFixed(1)}
            </SvgText>
            {isPeak && (
              <>
                <Rect x={cx - 24} y={cy - 38} width={48} height={20} rx={10} fill="#8B5CF6" />
                <SvgText x={cx} y={cy - 24} textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
                  +1.5kg
                </SvgText>
              </>
            )}
          </React.Fragment>
        );
      })}

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
      {/* Y axis rotated label */}
      <SvgText
        x={-chartH / 2} y={15}
        transform="rotate(-90)"
        textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600"
      >
        Weight (kg)
      </SvgText>
      
      {/* X axis subtitle */}
      <SvgText x={padL + W / 2} y={chartH + 12} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10" fontWeight="600">
        Months
      </SvgText>
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
      <LinearGradient colors={['#2A0B59', '#14032E', '#0B011A']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      {/* Bokeh orbs */}
      <View style={styles.orb1} /><View style={styles.orb2} /><View style={styles.orb3} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>

        {/* ── HEADER ── */}
        <View style={styles.header}>
          <View style={styles.logoRow}>
            <LinearGradient colors={['#A855F7', '#D946EF']} style={styles.logoBg}>
              <Heart color="white" size={18} fill="white" />
            </LinearGradient>
            <Text style={styles.brand}>VetCare <Text style={{ fontWeight: '400', color: 'rgba(255,255,255,0.7)' }}>Pro</Text></Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.iconBtn}><Bell color="white" size={20} /></TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings' as any)}>
              {petPhoto ? (
                <Image source={{ uri: petPhoto }} style={styles.avatar} />
              ) : (
                <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop' }} style={styles.avatar} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.welcomeText}>Welcome back, <Text style={styles.nameHighlight}>{fullName}</Text>!</Text>

        {/* ── HERO PET CARD ── */}
        <TouchableOpacity style={styles.heroCard} activeOpacity={0.9} onPress={() => router.push('/pet-profile' as any)}>
          <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.03)']} style={styles.heroGlass}>
            <View style={styles.heroRow}>
              {/* Left Side: Image */}
              <View style={styles.heroLeft}>
                <Image
                  source={petPhoto ? { uri: petPhoto } : { uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop&crop=face' }}
                  style={styles.heroPetImg}
                />
                <LinearGradient colors={['transparent', 'rgba(30,12,60,0.8)']} style={styles.heroPetOverlay} />
                <Text style={styles.heroName}>{currentPet.name}</Text>
              </View>

              {/* Right Side: Stats vertically */}
              <View style={styles.heroRight}>
                <View style={styles.statPill}>
                  <View style={styles.statIconBg}><Clock color="#fff" size={14} /></View>
                  <View>
                    <Text style={styles.statL}>Age</Text>
                    <Text style={styles.statV}>{currentPet.age}</Text>
                  </View>
                </View>
                <View style={[styles.statPill, { marginVertical: 14 }]}>
                  <View style={styles.statIconBg}><Scale color="#fff" size={14} /></View>
                  <View>
                    <Text style={styles.statL}>Weight</Text>
                    <Text style={styles.statV}>{currentPet.weight}</Text>
                  </View>
                </View>
                <View style={styles.statPill}>
                  <View style={styles.statIconBg}><Dog color="#fff" size={14} /></View>
                  <View>
                    <Text style={styles.statL}>Type</Text>
                    <Text style={styles.statV}>{currentPet.breed}</Text>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* ── WEIGHT TRACKER ── */}
        <View style={styles.card}>
          <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.03)']} style={styles.cardGlass}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Health Weight Tracker</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <WeightLineChart />
            </ScrollView>
          </LinearGradient>
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
          <Text style={styles.sectionTitle}>Local Veterinarians</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 8 }}>
          <VetCard name="Happy Paws Clinic" rating="4.9" dist="1.2 mi" img="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop" />
          <VetCard name="City Vet Hospital" rating="4.7" dist="2.5 mi" img="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop" />
          <VetCard name="Pet Wellness Center" rating="4.8" dist="0.8 mi" img="https://images.unsplash.com/photo-1594824436998-fa58cb854736?w=300&h=300&fit=crop" />
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
      <LinearGradient colors={['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.02)']} style={styles.vetCardGlass}>
        <View style={styles.vetImgContainer}>
          <Image source={{ uri: img }} style={styles.vetImg} />
        </View>
        <View style={styles.vetContent}>
          <Text style={styles.vetName}>{name}</Text>
          <View style={styles.vetMeta}>
            <Star color="#F59E0B" size={12} fill="#F59E0B" />
            <Text style={styles.vetRating}>{rating}</Text>
            <MapPin color="rgba(255,255,255,0.6)" size={10} style={{ marginLeft: 8 }} />
            <Text style={styles.vetDist}>{dist}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 24, paddingTop: 60, paddingBottom: 100 },
  orb1: { position: 'absolute', width: 500, height: 500, borderRadius: 250, backgroundColor: 'rgba(124,58,237,0.15)', top: -100, right: -150, filter: 'blur(40px)' },
  orb2: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(217,70,239,0.12)', top: 250, left: -100, filter: 'blur(30px)' },
  orb3: { position: 'absolute', width: 400, height: 400, borderRadius: 200, backgroundColor: 'rgba(168,85,247,0.08)', bottom: 0, right: -100, filter: 'blur(40px)' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { padding: 8, borderRadius: 10 },
  brand: { color: 'white', fontSize: 20, fontWeight: '900', marginLeft: 8 },
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { backgroundColor: 'transparent', padding: 10, marginRight: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#fff' },
  welcomeText: { color: '#fff', fontSize: 26, fontWeight: '800', marginBottom: 24 },
  nameHighlight: { color: '#fff' },
  
  heroCard: { borderRadius: 32, overflow: 'hidden', marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 30 },
  heroGlass: { flex: 1, padding: 16 },
  heroRow: { flexDirection: 'row', alignItems: 'center' },
  heroLeft: { width: '45%', aspectRatio: 0.8, borderRadius: 24, overflow: 'hidden' },
  heroPetImg: { width: '100%', height: '100%' },
  heroPetOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: 'flex-end', padding: 16 },
  heroName: { color: 'white', fontSize: 28, fontWeight: '900', zIndex: 5 },
  heroRight: { flex: 1, paddingLeft: 16, justifyContent: 'center' },
  statPill: { flexDirection: 'row', alignItems: 'center' },
  statIconBg: { backgroundColor: 'rgba(255,255,255,0.15)', padding: 10, borderRadius: 16, marginRight: 12 },
  statL: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: '500' },
  statV: { color: '#fff', fontSize: 15, fontWeight: '800', marginTop: 2 },

  card: { borderRadius: 32, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)', marginBottom: 28 },
  cardGlass: { padding: 24, flex: 1 },
  cardHeader: { marginBottom: 16 },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: '800' },

  quickActions: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 36 },
  quickBtn: { width: '48%', marginBottom: 12, borderRadius: 28, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  quickBtnGrad: { padding: 20, alignItems: 'center' },
  quickIcon: { fontSize: 28, marginBottom: 8 },
  quickLabel: { color: '#fff', fontSize: 13, fontWeight: '900' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '800', marginBottom: 16 },
  seeAll: { color: '#A855F7', fontSize: 14, fontWeight: '800' },
  
  vetCard: { width: 150, marginRight: 16, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.3)' },
  vetCardGlass: { flex: 1, padding: 12 },
  vetImgContainer: { width: '100%', aspectRatio: 1.5, borderRadius: 16, overflow: 'hidden', marginBottom: 12 },
  vetImg: { width: '100%', height: '100%' },
  vetContent: { flex: 1 },
  vetName: { color: '#fff', fontSize: 13, fontWeight: '800', marginBottom: 6 },
  vetMeta: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: '#F59E0B', fontSize: 11, fontWeight: '800', marginLeft: 4 },
  vetDist: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600', marginLeft: 4 },
});
