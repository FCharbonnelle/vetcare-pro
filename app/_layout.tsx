import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, memo, useCallback, useMemo } from 'react';
import { useColorScheme, View, StyleSheet, useWindowDimensions, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import { AuthProvider } from '@/store/AuthContext';
import { PetProvider } from '@/store/PetContext';
import { Home, Heart, Calendar, MapPin, User, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

SplashScreen.preventAutoHideAsync();

interface NavItemProps {
  icon: any;
  label: string;
  isDesktop: boolean;
  isActive: boolean;
  onPress: () => void;
}

const NavItem = memo(({ icon: Icon, label, isDesktop, isActive, onPress }: NavItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      isDesktop ? styles.desktopNavItem : styles.mobileNavItem,
    ]}
  >
    <Icon color={isActive ? '#A855F7' : '#94A3B8'} size={isDesktop ? 22 : 24} fill={isActive ? '#A855F7' : 'transparent'} />
    <Text style={[isDesktop ? styles.navLabel : styles.mobileNavLabel, isActive && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
));

function UnifiedNav({ isDesktop }: { isDesktop: boolean }) {
  const router = useRouter();
  const segments = useSegments();

  const navigateToDashboard = useCallback(() => router.push('dashboard' as any), [router]);
  const navigateToHistory = useCallback(() => router.push('history' as any), [router]);
  const navigateToAppointments = useCallback(() => router.push('appointments' as any), [router]);
  const navigateToMap = useCallback(() => router.push('map' as any), [router]);
  const navigateToSettings = useCallback(() => router.push('settings' as any), [router]);
  const navigateToPaywall = useCallback(() => router.push('/paywall'), [router]);

  const activeSegment = segments[0];

  const activeStates = useMemo(() => ({
    dashboard: activeSegment === 'dashboard',
    history: activeSegment === 'history',
    appointments: activeSegment === 'appointments',
    map: activeSegment === 'map',
    settings: activeSegment === 'settings',
  }), [activeSegment]);

  if (isDesktop) {
    return (
      <View style={styles.topNav}>
        <View style={styles.brand}>
           <View style={styles.logoBg}><Heart color="white" size={20} fill="white" /></View>
           <Text style={styles.brandText}>VetCare Pro</Text>
        </View>
        <View style={styles.navLinks}>
           <NavItem icon={Home} label="Accueil" isDesktop={isDesktop} isActive={activeStates.dashboard} onPress={navigateToDashboard} />
           <NavItem icon={Heart} label="Santé" isDesktop={isDesktop} isActive={activeStates.history} onPress={navigateToHistory} />
           <NavItem icon={Calendar} label="Rendez-vous" isDesktop={isDesktop} isActive={activeStates.appointments} onPress={navigateToAppointments} />
           <NavItem icon={MapPin} label="Carte" isDesktop={isDesktop} isActive={activeStates.map} onPress={navigateToMap} />
           <NavItem icon={User} label="Profil" isDesktop={isDesktop} isActive={activeStates.settings} onPress={navigateToSettings} />
        </View>
        <View style={styles.topRight}>
           <TouchableOpacity style={styles.notifBtn}><Bell color="white" size={20} /></TouchableOpacity>
           <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8} onPress={navigateToPaywall}>
              <Text style={styles.upgradeText}>Passer Pro</Text>
           </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bottomNav}>
       <NavItem icon={Home} label="Accueil" isDesktop={isDesktop} isActive={activeStates.dashboard} onPress={navigateToDashboard} />
       <NavItem icon={Heart} label="Santé" isDesktop={isDesktop} isActive={activeStates.history} onPress={navigateToHistory} />
       <NavItem icon={Calendar} label="Agenda" isDesktop={isDesktop} isActive={activeStates.appointments} onPress={navigateToAppointments} />
       <NavItem icon={MapPin} label="Carte" isDesktop={isDesktop} isActive={activeStates.map} onPress={navigateToMap} />
       <NavItem icon={User} label="Profil" isDesktop={isDesktop} isActive={activeStates.settings} onPress={navigateToSettings} />
    </View>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AuthProvider>
      <PetProvider>
        <RootLayoutNav />
      </PetProvider>
    </AuthProvider>
  );
}

function RootLayoutNav() {
  const { width } = useWindowDimensions();
  const isDesktop = width > 1024;
  const segments = useSegments();

  const showNav = (segments: string[]) => {
    const s = segments[0];
    const hiddenIn = ['index', 'onboarding', 'paywall'];
    return s && !hiddenIn.includes(s) && s !== '(tabs)';
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <View style={styles.root}>
        {/* Global Dark Background mirroring the image's bokeh purple/black */}
        <LinearGradient
          colors={['#170B3B', '#0E0824', '#000000']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        
        {isDesktop && showNav(segments as string[]) && <UnifiedNav isDesktop={true} />}
        
        <View style={[styles.flex, isDesktop && showNav(segments as string[]) && styles.containerDesktop]}>
           <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: 'transparent' } }}>
             <Stack.Screen name="index" />
             <Stack.Screen name="onboarding" />
             <Stack.Screen name="dashboard" />
             <Stack.Screen name="history" />
             <Stack.Screen name="appointments" />
             <Stack.Screen name="map" />
             <Stack.Screen name="settings" />
             <Stack.Screen name="ai-assist" />
             <Stack.Screen name="pet-profile" />
             <Stack.Screen name="paywall" options={{ presentation: 'fullScreenModal' }} />
           </Stack>
        </View>

        {!isDesktop && showNav(segments as string[]) && <UnifiedNav isDesktop={false} />}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#0E0824' },
  flex: { flex: 1 },
  topNav: { 
    height: 80, 
    backgroundColor: 'rgba(255,255,255,0.02)', 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 80,
    zIndex: 100
  },
  brand: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { backgroundColor: '#A855F7', padding: 8, borderRadius: 12 },
  brandText: { fontSize: 24, fontWeight: '900', color: '#FFFFFF', marginLeft: 16, letterSpacing: -0.5 },
  navLinks: { flexDirection: 'row', alignItems: 'center' },
  desktopNavItem: { alignItems: 'center', paddingHorizontal: 24 },
  navLabel: { fontSize: 13, fontWeight: '800', color: '#94A3B8', marginTop: 4 },
  navLabelActive: { color: '#A855F7' },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  notifBtn: { marginRight: 24, backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 16 },
  upgradeBtn: { backgroundColor: '#A855F7', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 20 },
  upgradeText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14 },
  
  containerDesktop: { 
    maxWidth: 1200, 
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    marginTop: 40,
    marginBottom: 40,
    borderRadius: 60,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.1)',
    overflow: 'hidden',
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.2,
    shadowRadius: 60,
    elevation: 20
  },
  
  bottomNav: { 
    height: 100, 
    backgroundColor: 'rgba(0,0,0,0.85)', 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.1)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 20,
    paddingHorizontal: 10,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40
  },
  mobileNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  mobileNavLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '800', marginTop: 6, textTransform: 'capitalize' }
});
