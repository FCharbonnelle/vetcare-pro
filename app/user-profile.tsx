import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Platform } from 'react-native';
import { User, Mail, Phone, MapPin, ChevronLeft, Camera, Sparkles } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/store/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';

export default function UserProfile() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.user_metadata?.full_name || "Sarah Anderson");
  const [email, setEmail] = useState(user?.email || "sarah.a@sanctuary.io");
  const [phone, setPhone] = useState("+1 555 0123 4567");
  const [city, setCity] = useState("Aspen, USA");

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 40, friction: 8, useNativeDriver: true })
    ]).start();
  }, []);

  const handleSave = () => {
    router.back();
  };

  const InputField = ({ icon: Icon, label, value, onChangeText, keyboardType = 'default' }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon color={Theme.colors.primary} size={18} style={{ marginRight: 14 }} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          placeholderTextColor="rgba(255,255,255,0.2)"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={[Theme.colors.background, '#05030F']} style={StyleSheet.absoluteFill} />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Guardian Profile</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtnTop}>
             <Text style={styles.saveBtnTopText}>DONE</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
             <View style={styles.avatarGlow} />
             <Image 
               source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' }} 
               style={styles.avatar} 
             />
             <TouchableOpacity style={styles.cameraBtn}>
                <Camera color="#FFF" size={20} />
             </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.badgeTier}>
             <Sparkles color={Theme.colors.tertiary} size={10} fill={Theme.colors.tertiary} />
             <Text style={styles.badgeText}>ELITE GUARDIAN</Text>
          </View>
        </View>

        <View style={styles.formCard}>
           <InputField icon={User} label="FULL NAME" value={name} onChangeText={setName} />
           <InputField icon={Mail} label="EMAIL ADDRESS" value={email} onChangeText={setEmail} keyboardType="email-address" />
           <InputField icon={Phone} label="EMERGENCY CONTACT" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
           <InputField icon={MapPin} label="LOCATION" value={city} onChangeText={setCity} />

           <TouchableOpacity style={styles.saveBtnLarge} onPress={handleSave}>
              <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.saveGrad}>
                 <Text style={styles.saveBtnText}>Seal Profile</Text>
              </LinearGradient>
           </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  scroll: { padding: 24, paddingTop: Platform.OS === 'ios' ? 10 : 40 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF' },
  saveBtnTop: { backgroundColor: 'rgba(191,90,242,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(191,90,242,0.3)' },
  saveBtnTopText: { color: Theme.colors.primary, fontWeight: '900', fontSize: 13 },
  
  avatarSection: { alignItems: 'center', marginBottom: 40 },
  avatarWrapper: { width: 140, height: 140, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatarGlow: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: 'rgba(191, 90, 242, 0.15)', filter: 'blur(30px)' },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: Theme.colors.primary },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, width: 40, height: 40, borderRadius: 20, backgroundColor: Theme.colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Theme.colors.background },
  userName: { fontSize: 28, fontWeight: '900', color: '#FFF', marginTop: 20 },
  badgeTier: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  badgeText: { color: Theme.colors.tertiary, fontSize: 10, fontWeight: '900', marginLeft: 6, letterSpacing: 1 },

  formCard: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.xl, padding: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  inputGroup: { marginBottom: 24 },
  label: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 20, paddingVertical: 18, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  input: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '700' },
  saveBtnLarge: { marginTop: 20, borderRadius: 20, overflow: 'hidden' },
  saveGrad: { paddingVertical: 22, alignItems: 'center' },
  saveBtnText: { color: '#FFF', fontSize: 17, fontWeight: '900' },
});
