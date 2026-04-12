import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Switch, Animated, Alert } from 'react-native';
import { ChevronRight, Bell, Shield, CircleHelp, LogOut, Moon, User, Database, Globe, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

export default function SettingsScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const SettingItem = ({ icon: Icon, label, value, type = 'arrow', onPress }: any) => (
    <TouchableOpacity style={styles.item} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.itemLeft}>
        <View style={styles.iconBox}>
           <Icon color={Theme.colors.primary} size={20} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
      <View style={styles.itemRight}>
         {type === 'switch' ? (
           <Switch 
             value={value} 
             onValueChange={onPress} 
             trackColor={{ false: '#333', true: Theme.colors.primary }}
             thumbColor="#FFF"
           />
         ) : (
           <>
             {value && <Text style={styles.valueText}>{value}</Text>}
             <ChevronRight color="rgba(255,255,255,0.2)" size={18} />
           </>
         )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        style={[styles.scroll, { opacity: fadeAnim }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
             <ChevronLeft color="#FFF" size={24} />
           </TouchableOpacity>
           <Text style={styles.headerTitle}>Réglages</Text>
           <View style={{ width: 44 }} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>COMPTE & SÉCURITÉ</Text>
          <View style={styles.card}>
             <SettingItem icon={User} label="Profil Utilisateur" value="Sarah Miller" onPress={() => router.push('/user-profile' as any)} />
             <SettingItem icon={Shield} label="Confidentialité" onPress={() => Alert.alert("Sécurité", "Vos données sont cryptées en bout en bout.")} />
             <SettingItem icon={Database} label="Sauvegarde iCloud" value="Activée" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>PRÉFÉRENCES</Text>
          <View style={styles.card}>
             <SettingItem icon={Bell} label="Notifications Push" type="switch" value={notifications} onPress={() => setNotifications(!notifications)} />
             <SettingItem icon={Moon} label="Mode Sombre" type="switch" value={darkMode} onPress={() => setDarkMode(!darkMode)} />
             <SettingItem icon={Globe} label="Langue" value="Français (FR)" />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SUPPORT</Text>
          <View style={styles.card}>
             <SettingItem icon={CircleHelp} label="Centre d'aide" />
             <SettingItem icon={Shield} label="Conditions Générales" />
          </View>
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/')}>
           <LogOut color="#FF3B30" size={20} />
           <Text style={styles.logoutText}>Se déconnecter</Text>
        </TouchableOpacity>

        <Text style={styles.version}>VetCare Pro v3.4.2 • Scellé par Antigravity</Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  scroll: { padding: 24 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, marginTop: 10 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: -1 },

  section: { marginBottom: 32 },
  sectionTitle: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 16, marginLeft: 8 },
  card: { backgroundColor: Theme.colors.surfaceCard, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  item: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.03)' },
  itemLeft: { flexDirection: 'row', alignItems: 'center' },
  iconBox: { width: 36, height: 36, borderRadius: 10, backgroundColor: 'rgba(183,109,255,0.1)', alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  label: { color: '#FFF', fontSize: 16, fontWeight: '700' },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  valueText: { color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: '600', marginRight: 10 },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,59,48,0.1)', padding: 20, borderRadius: 20, marginTop: 20, borderWidth: 1, borderColor: 'rgba(255,59,48,0.2)' },
  logoutText: { color: '#FF3B30', fontSize: 16, fontWeight: '900', marginLeft: 12 },
  version: { color: 'rgba(255,255,255,0.2)', fontSize: 11, fontWeight: '700', textAlign: 'center', marginTop: 40, letterSpacing: 1 },
});
