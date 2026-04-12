import {
  View, Text, ScrollView, Image, TouchableOpacity,
  StyleSheet, SafeAreaView, Dimensions, Animated, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import {
  Bell, ChevronRight, Calendar, Pill, FileText,
  Phone, MessageSquare, MoreHorizontal, PawPrint, FlaskConical
} from 'lucide-react-native';
import React, { useRef, useEffect } from 'react';
import { PetArtwork } from '@/components/PetArtwork';
import { BackgroundRefined } from '@/components/BackgroundRefined';

const { width: SCREEN_W } = Dimensions.get('window');
const IS_DESKTOP = SCREEN_W >= 900;

const CardGlow = ({ color = '#00D4FF', opacity = 0.15 }: { color?: string; opacity?: number }) => (
  <View style={[s.cardGlowPos, { backgroundColor: color, opacity }]} />
);

export default function Dashboard() {
  const { pet } = usePet();
  const router = useRouter();
  const petName = pet?.name || 'Buddy';
  const floatAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -8, duration: 2500, useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 2500, useNativeDriver: true }),
      ])
    ).start();
  }, [floatAnim]);

  const PET_SZ = IS_DESKTOP ? 260 : 200;

  return (
    <SafeAreaView style={s.layout}>
      <BackgroundRefined />
      
      <View style={s.header}>
        <View style={s.userBanner}>
          <View style={s.avatarGroup}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?u=sarah' }} style={s.userAvatar} />
            <View style={s.petMiniAvatar}>
              <PetArtwork breed={pet?.breed} type={pet?.type as any} style={s.full} />
            </View>
          </View>
          <View style={s.userText}>
            <Text style={s.userWelcome}>Ravi de vous revoir,</Text>
            <Text style={s.userName}>Sarah & {petName}!</Text>
          </View>
        </View>
        <TouchableOpacity style={s.notifBtn} activeOpacity={0.7}>
          <Bell color="#FFF" size={20} />
          <View style={s.notifDot} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={s.scroll}>
        {/* New Pro Layout: Titles Above, Pet in Card */}
        <View style={s.heroContainer}>
          <View style={s.titlesContainer}>
             <View style={s.heroBadge}>
                <PawPrint color="#00D4FF" size={14} fill="#00D4FF" />
                <Text style={s.heroBadgeText}>SANTÉ OPTIMALE</Text>
             </View>
             <Text style={s.heroTitle}>Votre Sanctuaire Digital</Text>
             <Text style={s.heroSubtitle}>Suivi intelligent pour {petName}</Text>
          </View>

          <View style={s.petCardWrapper}>
            <LinearGradient colors={['rgba(255,255,255,0.18)', 'rgba(255,255,255,0.06)']} style={s.petCard}>
              <View style={s.petCardInnerGlow} />
              <Animated.View style={[s.petArtContainer, { transform: [{ translateY: floatAnim }] }]}>
                <PetArtwork
                  breed={pet?.breed}
                  type={pet?.type as any}
                  style={{ width: PET_SZ, height: PET_SZ * 1.1 }}
                />
              </Animated.View>
              <View style={s.petShadow} />
            </LinearGradient>
          </View>
        </View>

        <View style={s.bentoGrid}>
          {IS_DESKTOP ? (
            <View style={s.desktopCols}>
              <View style={s.colMain}>
                <View>
                  <CardGlow color="#00D4FF" />
                  <AppointmentCard petName={petName} onPress={() => router.push('/appointments' as any)} />
                </View>
                <View style={{ marginTop: 16 }}>
                  <CardGlow color="#0082FF" />
                  <HealthCard />
                </View>
              </View>
              <View style={s.colActivity}>
                <CardGlow color="#00D4FF" />
                <ActivityCard />
              </View>
              <View style={s.colActions}>
                <CardGlow color="#10B981" />
                <QuickActionsCard router={router} />
              </View>
            </View>
          ) : (
            <View>
              <View>
                <CardGlow color="#00D4FF" />
                <AppointmentCard petName={petName} onPress={() => router.push('/appointments' as any)} />
              </View>
              <View style={s.mobRow}>
                <View style={s.flex1}>
                   <CardGlow color="#0082FF" />
                   <HealthCard flex />
                </View>
                <View style={s.flex1}>
                   <CardGlow color="#00D4FF" />
                   <ActivityCard flex />
                </View>
              </View>
              <View style={{ marginTop: 16 }}>
                <CardGlow color="#10B981" />
                <QuickActionsCard router={router} />
              </View>
            </View>
          )}
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function CardHeader({ label, iconR }: { label: string; iconR?: 'arrow' | 'dots' }) {
  return (
    <View style={s.cardHdr}>
      <Text style={s.cardLabel}>{label}</Text>
      {iconR === 'arrow' && <ChevronRight color="rgba(255,255,255,0.5)" size={16} />}
      {iconR === 'dots' && <MoreHorizontal color="rgba(255,255,255,0.5)" size={18} />}
    </View>
  );
}

function AppointmentCard({ petName, onPress }: { petName: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={s.cardMargin}>
      <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={s.card}>
        <CardHeader label="Prochains Rendez-vous" iconR="arrow" />
        <View style={s.apptRow}>
          <View style={[s.iconBox, { backgroundColor: 'rgba(0,212,255,0.2)' }]}>
            <Calendar color="#00D4FF" size={20} />
          </View>
          <View style={s.apptContent}>
            <Text style={s.apptTitle}>Dr. Emily Chen - Mardi, 14h</Text>
            <Text style={s.apptSub}>Animal: {petName}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

function HealthCard({ flex }: { flex?: boolean }) {
  const bars = [30, 45, 20, 55, 35, 60, 40];
  return (
    <View style={[s.cardMargin, flex && s.flex1]}>
      <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={s.card}>
        <CardHeader label="Santé & Vitalité" iconR="arrow" />
        <View style={s.healthVisual}>
          <View style={s.healthGauge}>
            <Text style={s.healthPct}>95%</Text>
          </View>
          <View style={s.healthChart}>
            <View style={s.healthBars}>
              {bars.map((h, i) => (
                <View key={i} style={[s.healthBar, { height: h * 0.4 }]} />
              ))}
            </View>
          </View>
        </View>
        <View style={s.healthStats}>
          <Text style={s.statText}>Vaccins: <Text style={s.statVal}>95%</Text></Text>
          <Text style={s.statText}>Prochain Checkup: <Text style={s.statVal}>12 Oct</Text></Text>
        </View>
      </LinearGradient>
    </View>
  );
}

function ActivityCard({ flex }: { flex?: boolean }) {
  return (
    <View style={[s.cardMargin, flex && s.flex1]}>
      <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={s.card}>
        <CardHeader label="Activités Récentes" iconR="dots" />
        <ActivityItem icon={Pill} color="#88E7FF" title="Rappel Médication" desc="Dose du Dr. Martin" time="Mar, 14h" />
        <ActivityItem icon={FileText} color="#00D4FF" title="Résultats Labo" desc="Analyses sanguines" time="Disponible" />
        <ActivityItem icon={FlaskConical} color="#0082FF" title="Suivi Santé" desc="Contrôle de routine" time="Terminé" isLast />
      </LinearGradient>
    </View>
  );
}

function ActivityItem({ icon: Icon, color, title, desc, time, isLast }: any) {
  return (
    <View style={s.actItem}>
      <View style={s.actTimeline}>
        <View style={[s.actIcon, { backgroundColor: color + '20', borderColor: color + '40' }]}>
          <Icon color={color} size={14} />
        </View>
        {!isLast && <View style={s.actLine} />}
      </View>
      <View style={s.actInfo}>
        <Text style={s.actTitle}>{title}</Text>
        <Text style={s.actDesc}>{desc}</Text>
        <Text style={s.actTime}>{time}</Text>
      </View>
    </View>
  );
}

function QuickActionsCard({ router }: { router: any }) {
  return (
    <View style={s.flex1}>
      <LinearGradient colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.05)']} style={s.card}>
        <CardHeader label="Actions Rapides" iconR="arrow" />
        <View style={s.qaGrid}>
          <QAButton icon={Calendar} label="Réserver" sub="Rendez-vous" color="#00D4FF" onPress={() => router.push('/appointments' as any)} />
          <QAButton icon={MessageSquare} label="Message" sub="Vétérinaire" color="#10B981" />
          <QAButton icon={FileText} label="Ordonnances" sub="" color="#0082FF" />
          <QAButton icon={Phone} label="Urgence" sub="Appeler" color="#FF375F" />
        </View>
      </LinearGradient>
    </View>
  );
}

function QAButton({ icon: Icon, label, sub, color, onPress }: any) {
  return (
    <TouchableOpacity style={s.qaBtn} onPress={onPress} activeOpacity={0.7}>
      <View style={[s.qaRing, { borderColor: color + '50' }]}>
        <LinearGradient colors={[color + '30', color + '05']} style={s.qaGlow}>
          <Icon color={color} size={24} />
        </LinearGradient>
      </View>
      <Text style={s.qaLabel}>{label}</Text>
      {sub && <Text style={s.qaSub}>{sub}</Text>}
    </TouchableOpacity>
  );
}

const s = StyleSheet.create({
  layout: { flex: 1, backgroundColor: '#1E2235' },
  scroll: { paddingBottom: 100 },
  cardGlowPos: { position: 'absolute', top: '10%', left: '10%', right: '10%', bottom: '10%', borderRadius: 30, filter: 'blur(50px)' },
  header: { paddingHorizontal: 20, paddingTop: 15, paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  userBanner: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', borderRadius: 24, paddingHorizontal: 12, paddingVertical: 8 },
  avatarGroup: { position: 'relative', width: 44, height: 44 },
  userAvatar: { width: 38, height: 38, borderRadius: 19, borderWidth: 2, borderColor: '#00D4FF' },
  petMiniAvatar: { position: 'absolute', bottom: -2, right: -2, width: 22, height: 22, borderRadius: 11, backgroundColor: '#292D4E', borderWidth: 1.5, borderColor: '#00D4FF', overflow: 'hidden' },
  full: { width: '100%', height: '100%' },
  userText: { marginLeft: 16 },
  userWelcome: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '700' },
  userName: { color: '#FFF', fontSize: 16, fontWeight: '900' },
  notifBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  notifDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#00D4FF', borderWidth: 1.5, borderColor: '#1E2235' },
  
  heroContainer: { paddingHorizontal: 20, paddingVertical: 10, alignItems: 'center' },
  titlesContainer: { width: '100%', alignItems: 'flex-start', marginBottom: 20 },
  heroBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(0,212,255,0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(0,212,255,0.3)', marginBottom: 8 },
  heroBadgeText: { color: '#00D4FF', fontSize: 10, fontWeight: '900', marginLeft: 6, letterSpacing: 1 },
  heroTitle: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: -0.8 },
  heroSubtitle: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '600', marginTop: 4 },

  petCardWrapper: { width: '100%', marginTop: 10 },
  petCard: { width: '100%', height: 280, borderRadius: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  petCardInnerGlow: { position: 'absolute', top: 0, left: 0, right: 0, height: 100, backgroundColor: 'rgba(0,212,255,0.04)', filter: 'blur(30px)' },
  petArtContainer: { zIndex: 2 },
  petShadow: { width: 140, height: 10, backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 100, filter: 'blur(8px)', marginTop: -10 },

  bentoGrid: { paddingHorizontal: 16, marginTop: 24 },
  desktopCols: { flexDirection: 'row', gap: 16 },
  colMain: { flex: 1.4 },
  colActivity: { flex: 1 },
  colActions: { flex: 0.9 },
  mobRow: { flexDirection: 'row', gap: 12 },
  card: { borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)', padding: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.25, shadowRadius: 20 },
  cardMargin: { marginBottom: 16 },
  flex1: { flex: 1 },
  cardHdr: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  cardLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
  apptRow: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  apptContent: { marginLeft: 16 },
  apptTitle: { color: '#FFF', fontSize: 15, fontWeight: '800' },
  apptSub: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 3, fontWeight: '600' },
  healthVisual: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  healthGauge: { width: 60, height: 60, borderRadius: 30, borderWidth: 3, borderColor: '#00D4FF', alignItems: 'center', justifyContent: 'center', shadowColor: '#00D4FF', shadowRadius: 12, shadowOpacity: 0.5 },
  healthPct: { color: '#FFF', fontSize: 16, fontWeight: '900' },
  healthChart: { flex: 1, marginLeft: 16, position: 'relative' },
  healthBars: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', paddingHorizontal: 5 },
  healthBar: { width: 4, backgroundColor: 'rgba(0,212,255,0.2)', borderRadius: 2 },
  healthStats: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 12 },
  statText: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '700', marginBottom: 4 },
  statVal: { color: '#FFF', fontWeight: '800' },
  actItem: { flexDirection: 'row', marginBottom: 14 },
  actTimeline: { width: 30, alignItems: 'center' },
  actIcon: { width: 28, height: 28, borderRadius: 14, borderWidth: 1, alignItems: 'center', justifyContent: 'center', zIndex: 2 },
  actLine: { flex: 1, width: 1.5, backgroundColor: 'rgba(255,255,255,0.15)', marginVertical: 4 },
  actInfo: { flex: 1, marginLeft: 14, paddingBottom: 4 },
  actTitle: { color: '#FFF', fontSize: 12, fontWeight: '800' },
  actDesc: { color: 'rgba(255,255,255,0.6)', fontSize: 11, fontWeight: '600', marginTop: 1 },
  actTime: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '600' },
  qaGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 14, justifyContent: 'space-around' },
  qaBtn: { alignItems: 'center', minWidth: 68 },
  qaRing: { width: 60, height: 60, borderRadius: 30, borderWidth: 1.5, padding: 2, marginBottom: 8 },
  qaGlow: { flex: 1, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  qaLabel: { color: '#FFF', fontSize: 11, fontWeight: '800', textAlign: 'center' },
  qaSub: { color: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: '600', textAlign: 'center' },
});
