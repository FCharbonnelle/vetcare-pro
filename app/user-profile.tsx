import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Alert, Platform } from 'react-native';
import { User, Mail, Phone, MapPin, ChevronLeft, Save, Camera, Sparkles, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/store/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

export default function UserProfile() {
  const router = useRouter();
  const { user } = useAuth();
  
  const [name, setName] = useState(user?.user_metadata?.full_name || "Alex Johnson");
  const [email, setEmail] = useState(user?.email || "alex.j@example.com");
  const [phone, setPhone] = useState("+33 6 12 34 56 78");
  const [city, setCity] = useState("Paris, France");
  const [photo, setPhoto] = useState<string | null>('https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=140&h=140&fit=crop');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const handleSave = () => {
    Alert.alert("Profil mis à jour", "Vos informations ont été enregistrées avec succès.");
    router.back();
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', "L'accès à votre galerie est nécessaire.");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const InputField = ({ icon: Icon, label, value, onChangeText, keyboardType = 'default' }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon color="#A855F7" size={18} style={{ marginRight: 14 }} />
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
      <LinearGradient colors={['#170B3B', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Mon Compte</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtnTop}>
            <Save color="#A855F7" size={22} />
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={pickImage}>
            <Image source={{ uri: photo || 'https://via.placeholder.com/150' }} style={styles.avatar} />
            <View style={styles.cameraBtn}>
              <Camera color="white" size={18} />
            </View>
          </TouchableOpacity>
          <Text style={styles.userName}>{name}</Text>
          <View style={styles.badgePremium}>
             <Sparkles color="#F59E0B" size={12} fill="#F59E0B" />
             <Text style={styles.badgeText}>MEMBRE PREMIUM</Text>
          </View>
        </View>

        <View style={styles.card}>
          <InputField icon={User} label="NOM COMPLET" value={name} onChangeText={setName} />
          <InputField icon={Mail} label="ADRESSE EMAIL" value={email} onChangeText={setEmail} keyboardType="email-address" />
          <InputField icon={Phone} label="TÉLÉPHONE (URGENCE)" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          <InputField icon={MapPin} label="VILLE / RÉSIDENCE" value={city} onChangeText={setCity} />
        </View>

        <TouchableOpacity style={styles.saveBtnLarge} onPress={handleSave}>
          <LinearGradient colors={['#A855F7', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveBtnGrad}>
            <Text style={styles.saveBtnText}>Enregistrer le profil</Text>
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
  saveBtnTop: { padding: 12, borderRadius: 16, backgroundColor: 'rgba(168,85,247,0.15)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  avatarSection: { alignItems: 'center', marginBottom: 40 },
  avatarContainer: { width: 140, height: 140, borderRadius: 70, marginBottom: 20 },
  avatar: { width: '100%', height: '100%', borderRadius: 70, borderWidth: 4, borderColor: '#A855F7' },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, backgroundColor: '#A855F7', padding: 10, borderRadius: 20, borderWidth: 3, borderColor: '#0E0824' },
  userName: { fontSize: 26, fontWeight: '900', color: '#fff', marginBottom: 8 },
  badgePremium: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)' },
  badgeText: { color: '#F59E0B', fontSize: 10, fontWeight: '900', marginLeft: 6, letterSpacing: 1 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.07)', marginBottom: 32 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 11, fontWeight: '900', color: 'rgba(168,85,247,0.6)', marginBottom: 10, letterSpacing: 1.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 20, paddingVertical: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  input: { flex: 1, fontSize: 16, color: '#fff', fontWeight: '800' },
  saveBtnLarge: { borderRadius: 32, overflow: 'hidden' },
  saveBtnGrad: { paddingVertical: 22, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 17, fontWeight: '900' },
});
