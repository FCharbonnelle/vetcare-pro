import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, TouchableOpacity, Text, Platform } from 'react-native';
import { AuthProvider } from '@/store/AuthContext';
import { PetProvider } from '@/store/PetContext';
import { AppointmentProvider } from '@/store/AppointmentContext';
import { Home, Heart, MessageSquare, ShoppingCart, Settings, PawPrint } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';

SplashScreen.preventAutoHideAsync();

function UnifiedNav({ isDesktop }: { isDesktop: boolean }) {
  const router = useRouter();
  const segments = useSegments();
  
  const isActive = (path: string) => {
     const s = segments[0];
     if (path === 'dashboard' && (s === 'dashboard' || !s)) return true;
     if (path === 'history' && s === 'history') return true;
     if (path === 'ai-assist' && s === 'ai-assist') return true;
     if (path === 'paywall' && s === 'paywall') return true;
     if (path === 'settings' && s === 'settings') return true;
     return false;
  };

  const NavItem = ({ icon: Icon, label, path }: any) => {
    const active = isActive(path);
    return (
      <TouchableOpacity 
        onPress={() => router.push(path as any)}
        style={[
          isDesktop ? styles.desktopNavItem : styles.mobileNavItem, 
        ]}
        activeOpacity={0.7}
      >
        <View style={[styles.iconWrapper]}>
          {active && (
            <LinearGradient
              colors={['rgba(183, 109, 255, 0.4)', 'rgba(183, 109, 255, 0)']}
              style={styles.activeHalo}
            />
          )}
          <View style={[styles.iconContainer, active && styles.iconContainerActive]}>
             <Icon 
               color={active ? '#FFF' : 'rgba(255,255,255,0.4)'} 
               size={24} 
               strokeWidth={active ? 2.5 : 2}
               fill={active ? 'rgba(255,255,255,0.1)' : 'transparent'}
             />
          </View>
        </View>
        <Text style={[styles.mobileNavLabel, active && styles.navLabelActive]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  if (isDesktop) {
    return (
      <View style={styles.topNav}>
        <View style={styles.brand}>
           <View style={styles.logoBg}><Home color="white" size={20} fill="white" /></View>
           <Text style={styles.brandText}>VetCare <Text style={{ color: Theme.colors.primaryContainer }}>PRO</Text></Text>
        </View>
         <View style={styles.navLinks}>
             <NavItem icon={Home} label="Accueil" path="dashboard" />
             <NavItem icon={PawPrint} label="Animaux" path="history" />
             <NavItem icon={MessageSquare} label="Messages" path="ai-assist" />
             <NavItem icon={ShoppingCart} label="Boutique" path="paywall" />
             <NavItem icon={Settings} label="Réglages" path="settings" />
         </View>
      </View>
    );
  }

  return (
    <View style={styles.bottomNav}>
        <NavItem icon={Home} label="Accueil" path="dashboard" />
        <NavItem icon={PawPrint} label="Animaux" path="history" />
        <NavItem icon={MessageSquare} label="Messages" path="ai-assist" />
        <NavItem icon={ShoppingCart} label="Boutique" path="paywall" />
        <NavItem icon={Settings} label="Réglages" path="settings" />
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

  if (!loaded) return null;

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
    const hiddenIn = ['index', 'onboarding'];
    // In our specific case, we want navigation for dashboard, history, etc.
    return s && !hiddenIn.includes(s);
  };

  return (
    <ThemeProvider value={DarkTheme}>
      <View style={styles.root}>
        <View style={styles.flex}>
           <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#070514' } }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="onboarding" />
              <Stack.Screen name="dashboard" />
              <Stack.Screen name="history" />
              <Stack.Screen name="appointments" />
              <Stack.Screen name="settings" />
              <Stack.Screen name="ai-assist" />
              <Stack.Screen name="pet-profile" />
              <Stack.Screen name="paywall" />
              <Stack.Screen name="market" />
           </Stack>
        </View>
        {showNav(segments as string[]) && <UnifiedNav isDesktop={isDesktop} />}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#070514' },
  flex: { flex: 1 },
  topNav: { 
    height: 80, 
    backgroundColor: '#070514', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 60,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
  },
  brand: { flexDirection: 'row', alignItems: 'center' },
  logoBg: { backgroundColor: '#B76DFF', padding: 8, borderRadius: 10 },
  brandText: { fontSize: 20, fontWeight: '900', color: '#FFF', marginLeft: 12 },
  navLinks: { flexDirection: 'row' },
  desktopNavItem: { alignItems: 'center', marginLeft: 30 },
  
  bottomNav: { 
    height: 85, 
    backgroundColor: 'rgba(7, 5, 20, 0.98)', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingBottom: Platform.OS === 'ios' ? 25 : 10,
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  mobileNavItem: { alignItems: 'center', justifyContent: 'center', flex: 1 },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 54,
  },
  activeHalo: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.5,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  iconContainerActive: {
    backgroundColor: 'rgba(183, 109, 255, 0.25)',
  },
  mobileNavLabel: { fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: '800', marginTop: -4 },
  navLabelActive: { color: '#FFF' }
});
