import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, Animated } from 'react-native';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Star, Share2, Trash2, Palette } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { useRef, useEffect, memo, useCallback } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const MenuItem = memo(({ icon: Icon, title, subtitle, color = "#A855F7", onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.menuIconBg, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: `${color}40` }]}>
      <Icon color={color} size={22} />
    </View>
    <View style={{ flex: 1, marginLeft: 16 }}>
      <Text style={styles.menuTitle}>{title}</Text>
      {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
    </View>
    <ChevronRight color="rgba(255,255,255,0.2)" size={20} />
  </TouchableOpacity>
));

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { resetPet, pet } = usePet();
  const fullName = user?.user_metadata?.full_name || "Alex Johnson";

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClearCache = useCallback(async () => {
    await resetPet();
    router.push('/onboarding' as any);
  }, [resetPet, router]);

  const navigateToPaywall = useCallback(() => router.push('/paywall'), [router]);
  const navigateToOnboarding = useCallback(() => router.push('/onboarding' as any), [router]);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.inner, { opacity: fadeAnim }]}>
        <Text style={styles.headerTitle}>Paramètres</Text>

        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&h=140&fit=crop' }} 
            style={styles.avatar}
          />
          <View style={{ flex: 1, marginLeft: 24 }}>
            <Text style={styles.profileName}>{fullName}</Text>
            <View style={styles.badgeFree}>
               <Text style={styles.badgeTextFree}>PLAN GRATUIT • {pet?.name || 'Buddy'}</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity 
          onPress={navigateToPaywall}
          style={styles.upsellCard}
        >
          <LinearGradient
            colors={['#A855F7', '#6D28D9']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.upsellGradient}
          >
            <View style={styles.upsellRow}>
              <View style={styles.starIconBg}>
                 <Star color="white" size={24} fill="white" />
              </View>
              <View style={{ flex: 1, marginLeft: 18 }}>
                 <Text style={styles.upsellTitle}>Passer à VetCare+</Text>
                 <Text style={styles.upsellSubtitle}>Support d'urgence 24/7 & scans illimités</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Préférences App</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon={Bell} title="Rappels" subtitle="Vaccins, Toilettage, Médocs" />
          <MenuItem icon={Palette} title="Apparence" subtitle="Thème Pourpre Dynamique" color="#C084FC" />
          <MenuItem icon={Shield} title="Confidentialité" subtitle="Contrôle des données" color="#10B981" />
        </View>

        <Text style={styles.sectionTitle}>Support & Aide</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon={HelpCircle} title="Centre d'aide" color="#3B82F6" />
          <MenuItem icon={Share2} title="Inviter un membre" color="#F59E0B" />
          <MenuItem icon={Trash2} title="Effacer les données" subtitle="Réinitialisation complète" color="#EF4444" onPress={handleClearCache} />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={navigateToOnboarding}>
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>VetCare Pro v1.0.0 (Stack Shadow enabled)</Text>
        <View style={{ height: 120 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  inner: { padding: 24, paddingTop: 60 },
  headerTitle: { fontSize: 34, fontWeight: '900', color: '#FFFFFF', marginBottom: 32 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: 24, borderRadius: 40, borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 32, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 4 },
  avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#A855F7' },
  profileName: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', marginBottom: 6 },
  badgeFree: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeTextFree: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  upsellCard: { borderRadius: 40, overflow: 'hidden', marginBottom: 40, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.2, shadowRadius: 30, elevation: 12 },
  upsellGradient: { padding: 28 },
  upsellRow: { flexDirection: 'row', alignItems: 'center' },
  starIconBg: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 14, borderRadius: 18 },
  upsellTitle: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  upsellSubtitle: { color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: '600', marginTop: 4, lineHeight: 20 },
  sectionTitle: { fontSize: 14, fontWeight: '900', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 16, marginLeft: 12 },
  menuGroup: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 40, padding: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)', marginBottom: 32 },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 20 },
  menuIconBg: { padding: 12, borderRadius: 18, borderWidth: 1 },
  menuTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  menuSubtitle: { fontSize: 13, color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginTop: 2 },
  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 24, borderRadius: 32, backgroundColor: 'rgba(239, 68, 68, 0.1)', marginBottom: 24, borderColor: 'rgba(239, 68, 68, 0.2)', borderWidth: 1 },
  logoutText: { color: '#EF4444', fontSize: 17, fontWeight: '800', marginLeft: 12 },
  versionText: { textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13, fontWeight: '700' }
});
