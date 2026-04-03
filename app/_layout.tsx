import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import React from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme, View, StyleSheet, useWindowDimensions, TouchableOpacity, Text, SafeAreaView, Platform } from 'react-native';
import { AuthProvider } from '@/store/AuthContext';
import { PetProvider } from '@/store/PetContext';
import { AppointmentProvider } from '@/store/AppointmentContext';
import { Home, Heart, Calendar, MapPin, User, Bell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LucideIcon } from 'lucide-react-native';

SplashScreen.preventAutoHideAsync();

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  path: string;
  active: boolean;
  isDesktop: boolean;
  onPress: () => void;
}

const NavItem = React.memo(({ icon: Icon, label, path, active, isDesktop, onPress }: NavItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      isDesktop ? styles.desktopNavItem : styles.mobileNavItem,
    ]}
  >
    <Icon color={active ? '#A855F7' : '#94A3B8'} size={isDesktop ? 22 : 24} fill={active ? '#A855F7' : 'transparent'} />
    <Text style={[isDesktop ? styles.navLabel : styles.mobileNavLabel, active && styles.navLabelActive]}>{label}</Text>
  </TouchableOpacity>
));

function UnifiedNav({ isDesktop }: { isDesktop: boolean }) {
  const router = useRouter();
  const segments = useSegments();

  const handleDashboard = React.useCallback(() => router.push('dashboard' as any), [router]);
  const handleHistory = React.useCallback(() => router.push('history' as any), [router]);
  const handleAppointments = React.useCallback(() => router.push('appointments' as any), [router]);
  const handleMap = React.useCallback(() => router.push('map' as any), [router]);
  const handleSettings = React.useCallback(() => router.push('settings' as any), [router]);
  
  const isActive = (path: string) => {
     const s = segments[0];
     if (path === 'dashboard' && s === 'dashboard') return true;
     if (path === 'history' && s === 'history') return true;
     if (path === 'appointments' && s === 'appointments') return true;
     if (path === 'map' && s === 'map') return true;
     if (path === 'settings' && s === 'settings') return true;
     return false;
  };

  if (isDesktop) {
    return (
      <View style={styles.topNav}>
        <View style={styles.brand}>
           <View style={styles.logoBg}><Heart color="white" size={20} fill="white" /></View>
           <Text style={styles.brandText}>VetCare Pro</Text>
        </View>
        <View style={styles.navLinks}>
           <NavItem icon={Home} label="Accueil" path="dashboard" isDesktop={true} active={isActive('dashboard')} onPress={handleDashboard} />
           <NavItem icon={Heart} label="Santé" path="history" isDesktop={true} active={isActive('history')} onPress={handleHistory} />
           <NavItem icon={Calendar} label="Rendez-vous" path="appointments" isDesktop={true} active={isActive('appointments')} onPress={handleAppointments} />
           <NavItem icon={MapPin} label="Carte" path="map" isDesktop={true} active={isActive('map')} onPress={handleMap} />
           <NavItem icon={User} label="Profil" path="settings" isDesktop={true} active={isActive('settings')} onPress={handleSettings} />
        </View>
        <View style={styles.topRight}>
           <TouchableOpacity style={styles.notifBtn}><Bell color="white" size={20} /></TouchableOpacity>
           <TouchableOpacity style={styles.upgradeBtn} activeOpacity={0.8} onPress={() => router.push('/paywall')}>
              <LinearGradient
                colors={['#A855F7', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.upgradeGradient}
              >
                <Text style={styles.upgradeText}>Passer Pro</Text>
              </LinearGradient>
           </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.bottomNav}>
       <NavItem icon={Home} label="Accueil" path="dashboard" isDesktop={false} active={isActive('dashboard')} onPress={handleDashboard} />
       <NavItem icon={Heart} label="Santé" path="history" isDesktop={false} active={isActive('history')} onPress={handleHistory} />
       <NavItem icon={Calendar} label="Agenda" path="appointments" isDesktop={false} active={isActive('appointments')} onPress={handleAppointments} />
       <NavItem icon={MapPin} label="Carte" path="map" isDesktop={false} active={isActive('map')} onPress={handleMap} />
       <NavItem icon={User} label="Profil" path="settings" isDesktop={false} active={isActive('settings')} onPress={handleSettings} />
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
        <AppointmentProvider>
          <RootLayoutNav />
        </AppointmentProvider>
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
  root: { flex: 1, backgroundColor: '#0F0925' },
  flex: { flex: 1 },
  topNav: { 
    height: 90, 
    backgroundColor: 'rgba(21, 15, 43, 0.7)', 
    borderBottomWidth: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    zIndex: 100,
    // Glassmorphism effect
    ...Platform.select({
      web: { backdropFilter: 'blur(20px)' },
    })
  },
  brand: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { 
    backgroundColor: '#A855F7', 
    padding: 10, 
    borderRadius: 16,
    shadowColor: '#A855F7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8
  },
  brandText: { 
    fontSize: 26, 
    fontWeight: '900', 
    color: '#E7DEFF', 
    marginLeft: 16, 
    letterSpacing: -0.8 
  },
  navLinks: { flexDirection: 'row', alignItems: 'center' },
  desktopNavItem: { alignItems: 'center', paddingHorizontal: 20 },
  navLabel: { fontSize: 13, fontWeight: '700', color: '#94A3B8', marginTop: 6, letterSpacing: 0.2 },
  navLabelActive: { color: '#A855F7' },
  topRight: { flexDirection: 'row', alignItems: 'center' },
  notifBtn: { 
    marginRight: 20, 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 14, 
    borderRadius: 18,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)'
  },
  upgradeBtn: { 
    overflow: 'hidden',
    borderRadius: 22,
  },
  upgradeGradient: {
    paddingHorizontal: 30, 
    paddingVertical: 15, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  upgradeText: { color: '#FFFFFF', fontWeight: '900', fontSize: 14, letterSpacing: 0.5 },
  
  containerDesktop: { 
    maxWidth: 1300, 
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'rgba(21, 15, 43, 0.4)',
    marginTop: 30,
    marginBottom: 30,
    borderRadius: 48,
    borderWidth: 0,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.3,
    shadowRadius: 50,
    elevation: 25
  },
  
  bottomNav: { 
    height: 95, 
    backgroundColor: 'rgba(15, 9, 37, 0.9)', 
    borderTopWidth: 0, 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: 25,
    paddingHorizontal: 15,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    ...Platform.select({
      web: { backdropFilter: 'blur(30px)' },
    })
  },
  mobileNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  mobileNavLabel: { fontSize: 10, color: '#94A3B8', fontWeight: '700', marginTop: 8, textTransform: 'uppercase', letterSpacing: 0.5 }
});
