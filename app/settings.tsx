import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Alert, Animated, Share, Modal, Switch } from 'react-native';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Star, Share2, Trash2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { X } from 'lucide-react-native';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { resetPet, pet } = usePet();
  const fullName = user?.user_metadata?.full_name || "Alex Johnson";
  
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState<'privacy' | null>(null);
  const [shareData, setShareData] = useState(true);

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleClearCache = async () => {
    await resetPet();
    router.push('/onboarding' as any);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Rejoignez-moi sur VetCare Pro et prenez soin de votre animal avec l\'IA ! 🐾 https://vetcare.pro',
      });
    } catch (error) {
      Alert.alert('Erreur', 'Impossible d\'ouvrir le partage.');
    }
  };

  const openSubSetting = (type: 'privacy') => {
    setModalType(type);
    setModalVisible(true);
  };

  const MenuItem = ({ icon: Icon, title, subtitle, color = "#A855F7", onPress }: any) => (
    <TouchableOpacity style={styles.menuItem} onPress={onPress || (() => Alert.alert(title, "Cette fonctionnalité sera disponible dans une prochaine mise à jour."))}>
      <View style={[styles.menuIconBg, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: `${color}40` }]}>
        <Icon color={color} size={22} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.menuTitle}>{title}</Text>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
      </View>
      <ChevronRight color="rgba(255,255,255,0.2)" size={20} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.inner, { opacity: fadeAnim }]}>
        <Text style={styles.headerTitle}>Paramètres</Text>

        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => router.push('/pet-profile' as any)}
          style={styles.profileHeader}
        >
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
          <ChevronRight color="rgba(255,255,255,0.2)" size={20} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/paywall')}
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
          <MenuItem icon={Bell} title="Rappels" subtitle="Vaccins, Toilettage, Médocs" onPress={() => router.push('/appointments' as any)} />
          <MenuItem icon={Shield} title="Confidentialité" subtitle="Contrôle des données" color="#10B981" onPress={() => openSubSetting('privacy')} />
        </View>

        <Text style={styles.sectionTitle}>Support & Aide</Text>
        <View style={styles.menuGroup}>
          <MenuItem icon={HelpCircle} title="Centre d'aide" color="#3B82F6" onPress={() => router.push('/ai-assist' as any)} />
          <MenuItem icon={Share2} title="Inviter un membre" color="#F59E0B" onPress={handleShare} />
          <MenuItem icon={Trash2} title="Effacer les données" subtitle="Réinitialisation complète" color="#EF4444" onPress={handleClearCache} />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.push('/onboarding' as any)}>
          <LogOut color="#EF4444" size={20} />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>

        <Text style={styles.versionText}>VetCare Pro v1.0.0 (Stack Shadow enabled)</Text>
        <View style={{ height: 120 }} />
      </Animated.ScrollView>

      {/* ── SUB-SETTINGS MODAL ── */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 44 }]} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Confidentialité</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBtn}>
                <X color="white" size={24} />
              </TouchableOpacity>
            </View>

            <View>
              <View style={styles.settingRow}>
                  <View style={{ flex: 1, marginRight: 15 }}>
                    <Text style={styles.settingText}>Amélioration IA</Text>
                    <Text style={styles.settingSub}>Partager les diagnostics anonymisés pour entraîner l'IA.</Text>
                  </View>
                  <Switch 
                    value={shareData} 
                    onValueChange={setShareData} 
                    trackColor={{ false: '#3e3e3e', true: '#10B981' }}
                    thumbColor={shareData ? '#fff' : '#f4f3f4'}
                  />
              </View>
              <View style={styles.privacyNote}>
                  <Shield color="rgba(255,255,255,0.4)" size={20} />
                  <Text style={styles.privacyNoteText}>
                    Vos données personnelles et photos ne sont jamais partagées sans votre consentement explicite.
                  </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.modalSaveBtn} onPress={() => setModalVisible(false)}>
              <LinearGradient colors={['#A855F7', '#7C3AED']} style={styles.modalSaveGrad}>
                <Text style={styles.modalSaveText}>Fermer</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  inner: { padding: 24, paddingTop: 60 },
  headerTitle: { fontSize: 34, fontWeight: '900', color: '#FFFFFF', marginBottom: 32 },
  profileHeader: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', padding: 24, borderRadius: 40, borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 32 },
  avatar: { width: 72, height: 72, borderRadius: 36, borderWidth: 3, borderColor: '#A855F7' },
  profileName: { fontSize: 22, fontWeight: '900', color: '#FFFFFF', marginBottom: 6 },
  badgeFree: { alignSelf: 'flex-start', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  badgeTextFree: { color: 'rgba(255,255,255,0.4)', fontSize: 10, fontWeight: '800', letterSpacing: 0.5, textTransform: 'uppercase' },
  upsellCard: { borderRadius: 40, overflow: 'hidden', marginBottom: 40 },
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
  versionText: { textAlign: 'center', color: 'rgba(255,255,255,0.2)', fontSize: 13, fontWeight: '700' },

  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.15)', maxHeight: '70%', overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#fff', fontSize: 24, fontWeight: '900' },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 10, borderRadius: 14 },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'rgba(255,255,255,0.04)', padding: 20, borderRadius: 24, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  settingText: { color: 'white', fontSize: 17, fontWeight: '800' },
  settingSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600', marginTop: 4 },
  privacyNote: { flexDirection: 'row', padding: 20, backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: 24, marginBottom: 32 },
  privacyNoteText: { flex: 1, marginLeft: 14, color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600', lineHeight: 20 },
  modalSaveBtn: { borderRadius: 24, overflow: 'hidden' },
  modalSaveGrad: { paddingVertical: 18, alignItems: 'center' },
  modalSaveText: { color: '#fff', fontSize: 17, fontWeight: '900' },
});
