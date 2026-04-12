import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Platform, Alert } from 'react-native';
import { Camera, ChevronLeft, Heart, Sparkles, Dog, Scale, Clock, X, Upload, ImageIcon, Activity, Shield, User, Cat, Rat } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { PetArtwork } from '@/components/PetArtwork';
import { BackgroundRefined } from '@/components/BackgroundRefined';

export default function PetProfile() {
  const router = useRouter();
  const { pet, updatePet } = usePet();
  const [name, setName] = useState(pet?.name || 'Buddy');
  const [breed, setBreed] = useState(pet?.breed || 'Golden Retriever');
  const [age, setAge] = useState(pet?.age || '3 ans');
  const [weight, setWeight] = useState(pet?.weight || '34 kg');
  const [type, setType] = useState(pet?.type || 'dog');
  const [photo, setPhoto] = useState<string | null>((pet as any)?.photo || null);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.spring(slideAnim, { toValue: 0, tension: 40, friction: 8, useNativeDriver: true })
    ]).start();
  }, [fadeAnim, slideAnim]);

  const handleSave = async () => {
    if (!name || !breed) {
      Alert.alert("Rituel Incomplet", "Veuillez fournir un nom et une race pour sceller l'identité.");
      return;
    }
    await updatePet({ name, breed, age, weight, photo, type } as any);
    Alert.alert("Identité Scellée", "Le dossier de votre compagnon a été mis à jour dans le Sanctuaire.");
    router.back();
  };

  const InputField = ({ icon: Icon, label, value, onChangeText, placeholder }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon color={Theme.colors.primary} size={18} style={{ marginRight: 14 }} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="rgba(255,255,255,0.2)"
        />
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={[styles.scroll, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Identité de l'Animal</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveBtnTop}>
             <Text style={styles.saveBtnTopText}>SCELLER</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarWrapper}>
             <View style={styles.avatarGlow} />
             <PetArtwork 
               breed={breed}
               type={type as any}
               style={styles.avatar} 
               resizeMode="cover"
             />
             <TouchableOpacity style={styles.cameraBtn} onPress={() => Alert.alert("Capture de Vision", "L'accès caméra est restreint dans ce Sanctuaire d'essai.")}>
                <Camera color="#FFF" size={20} />
             </TouchableOpacity>
          </View>
          <Text style={styles.petName}>{name}</Text>
          <View style={styles.badgePro}>
             <Sparkles color={Theme.colors.primary} size={10} fill={Theme.colors.primary} />
             <Text style={styles.badgeTextPro}>CERTIFIÉ VETCARE</Text>
          </View>
        </View>

        <View style={styles.formCard}>
           <Text style={styles.label}>ESPÈCE ANIMALE</Text>
           <View style={styles.typeRow}>
              <TouchableOpacity style={[styles.typeBtn, type === 'dog' && styles.typeBtnActive]} onPress={() => setType('dog')}>
                <Dog color={type === 'dog' ? '#000' : 'rgba(255,255,255,0.4)'} size={20} />
                <Text style={[styles.typeLabel, type === 'dog' && { color: '#000' }]}>Canin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.typeBtn, type === 'cat' && styles.typeBtnActive]} onPress={() => setType('cat')}>
                <Cat color={type === 'cat' ? '#000' : 'rgba(255,255,255,0.4)'} size={20} />
                <Text style={[styles.typeLabel, type === 'cat' && { color: '#000' }]}>Félin</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.typeBtn, type === 'rabbit' && styles.typeBtnActive]} onPress={() => setType('rabbit')}>
                <Rat color={type === 'rabbit' ? '#000' : 'rgba(255,255,255,0.4)'} size={20} />
                <Text style={[styles.typeLabel, type === 'rabbit' && { color: '#000' }]}>Lagomorphe</Text>
              </TouchableOpacity>
           </View>

           <InputField icon={Dog} label="NOM" value={name} onChangeText={setName} placeholder="Buddy..." />
           <InputField icon={Heart} label="RACE" value={breed} onChangeText={setBreed} placeholder="Golden Retriever..." />
           
           <View style={{ flexDirection: 'row' }}>
              <View style={{ flex: 1, marginRight: 16 }}>
                 <InputField icon={Clock} label="ÂGE" value={age} onChangeText={setAge} placeholder="3 ans..." />
              </View>
              <View style={{ flex: 1 }}>
                 <InputField icon={Scale} label="POIDS" value={weight} onChangeText={setWeight} placeholder="34 kg..." />
              </View>
           </View>

           <TouchableOpacity style={styles.saveBtnLarge} onPress={handleSave}>
              <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.saveGrad}>
                 <Text style={styles.saveBtnText}>Mettre à jour le Dossier</Text>
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
  headerTitle: { fontSize: 24, fontWeight: '900', color: '#FFF', letterSpacing: -1 },
  saveBtnTop: { backgroundColor: 'rgba(191,90,242,0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 10, borderWidth: 1, borderColor: 'rgba(191,90,242,0.3)' },
  saveBtnTopText: { color: Theme.colors.primary, fontWeight: '900', fontSize: 13 },
  
  avatarSection: { alignItems: 'center', marginBottom: 40 },
  avatarWrapper: { width: 140, height: 140, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  avatarGlow: { position: 'absolute', width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(191, 90, 242, 0.12)', filter: 'blur(40px)' },
  avatar: { width: 120, height: 120, borderRadius: 60, borderWidth: 3, borderColor: Theme.colors.primary },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, width: 40, height: 40, borderRadius: 20, backgroundColor: Theme.colors.primary, alignItems: 'center', justifyContent: 'center', borderWidth: 3, borderColor: Theme.colors.background },
  petName: { fontSize: 28, fontWeight: '900', color: '#FFF', marginTop: 20, letterSpacing: -0.5 },
  badgePro: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8, marginTop: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  badgeTextPro: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', marginLeft: 6, letterSpacing: 1 },

  formCard: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.xl, padding: 32, borderWidth: 1, borderColor: Theme.colors.border },
  inputGroup: { marginBottom: 24 },
  label: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 2, marginBottom: 16 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 20, paddingVertical: 18, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  input: { flex: 1, color: '#FFF', fontSize: 16, fontWeight: '700' },
  
  typeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  typeBtn: { flex: 1, height: 80, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.04)', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  typeBtnActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  typeLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 9, fontWeight: '900', marginTop: 8, letterSpacing: 0.5 },

  saveBtnLarge: { marginTop: 20, borderRadius: 20, overflow: 'hidden' },
  saveGrad: { paddingVertical: 22, alignItems: 'center' },
  saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900' },
});
