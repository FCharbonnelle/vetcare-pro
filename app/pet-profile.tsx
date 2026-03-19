import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, Animated } from 'react-native';
import { Camera, Save, ChevronLeft, Heart, Sparkles, Dog, Scale, Calendar, Clock } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';

export default function PetProfile() {
  const router = useRouter();
  const { pet, updatePet } = usePet();
  const [name, setName] = useState(pet?.name || 'Buddy');
  const [breed, setBreed] = useState(pet?.breed || 'Golden Retriever');
  const [age, setAge] = useState(pet?.age || '3 ans');
  const [weight, setWeight] = useState(pet?.weight || '34 kg');

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleSave = async () => {
    await updatePet({ name, breed, age, weight });
    router.back();
  };

  const InputField = ({ icon: Icon, label, value, onChangeText, placeholder }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon color="#A855F7" size={20} style={{ marginRight: 16 }} />
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
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <ChevronLeft color="#FFFFFF" size={24} />
           </TouchableOpacity>
           <Text style={styles.headerTitle}>Éditer le profil</Text>
           <TouchableOpacity onPress={handleSave} style={styles.saveBtnTop}>
              <Save color="#A855F7" size={24} />
           </TouchableOpacity>
        </View>

        <View style={styles.hero}>
           <TouchableOpacity style={styles.avatarContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop' }}
                style={styles.avatar}
              />
              <View style={styles.cameraBtn}>
                 <Camera color="white" size={20} />
              </View>
           </TouchableOpacity>
           <Text style={styles.buddyName}>{name}</Text>
           <View style={styles.tagPro}>
              <Sparkles color="white" size={12} fill="white" />
              <Text style={styles.tagProText}>SUIVI SANTÉ INTELLIGENT</Text>
           </View>
        </View>

        <View style={styles.card}>
           <InputField icon={Dog} label="NOM DE L'ANIMAL" value={name} onChangeText={setName} />
           <InputField icon={Heart} label="RACE / TYPE" value={breed} onChangeText={setBreed} />
           <InputField icon={Clock} label="ÂGE" value={age} onChangeText={setAge} />
           <InputField icon={Scale} label="POIDS ACTUEL" value={weight} onChangeText={setWeight} />
        </View>

        <TouchableOpacity 
          style={styles.saveBtnLarge}
          onPress={handleSave}
        >
          <Text style={styles.saveBtnLargeText}>Enregistrer les modifications</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scroll: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF' },
  saveBtnTop: { padding: 12, borderRadius: 16, backgroundColor: 'rgba(168, 85, 247, 0.15)' },
  hero: { alignItems: 'center', marginBottom: 40 },
  avatarContainer: { width: 140, height: 140, borderRadius: 70, position: 'relative', marginBottom: 24, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.3, shadowRadius: 30, elevation: 12 },
  avatar: { width: '100%', height: '100%', borderRadius: 70, borderWidth: 4, borderColor: '#A855F7' },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, backgroundColor: '#A855F7', padding: 10, borderRadius: 20, borderWidth: 3, borderColor: '#0E0824' },
  buddyName: { fontSize: 32, fontWeight: '900', color: '#FFFFFF', marginBottom: 12 },
  tagPro: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168, 85, 247, 0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(168, 85, 247, 0.3)' },
  tagProText: { color: '#FFFFFF', fontSize: 11, fontWeight: '900', marginLeft: 8, letterSpacing: 1 },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 40, shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 4 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 12, fontWeight: '900', color: 'rgba(255,255,255,0.3)', marginBottom: 12, marginLeft: 4, letterSpacing: 1.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.03)', paddingHorizontal: 20, paddingVertical: 18, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  input: { flex: 1, fontSize: 17, color: '#FFFFFF', fontWeight: '800' },
  saveBtnLarge: { backgroundColor: '#A855F7', paddingVertical: 24, borderRadius: 32, alignItems: 'center', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 8 },
  saveBtnLargeText: { color: 'white', fontSize: 18, fontWeight: '900' }
});
