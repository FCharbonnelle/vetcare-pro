import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, StyleSheet, SafeAreaView, Animated, Alert, Platform, Modal, ActivityIndicator } from 'react-native';
import { Camera, Save, ChevronLeft, Heart, Sparkles, Dog, Scale, Clock, X, Upload, ImageIcon } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

// Avatar presets by animal type
const DOG_AVATARS = [
  { id: 'd1', label: 'Golden Retriever', uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop&crop=face' },
  { id: 'd2', label: 'Labrador', uri: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=300&h=300&fit=crop&crop=face' },
  { id: 'd3', label: 'Border Collie', uri: 'https://images.unsplash.com/photo-1503256207526-0d5523f31ef6?w=300&h=300&fit=crop&crop=face' },
  { id: 'd4', label: 'Berger Allemand', uri: 'https://images.unsplash.com/photo-1589941013453-ec89f0274498?w=300&h=300&fit=crop&crop=face' },
  { id: 'd5', label: 'Carlin', uri: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop&crop=face' },
  { id: 'd6', label: 'Chihuahua', uri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop&crop=face' },
];
const CAT_AVATARS = [
  { id: 'c1', label: 'Européen', uri: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop&crop=face' },
  { id: 'c2', label: 'Persan', uri: 'https://images.unsplash.com/photo-1518791841217-8f162f1912da?w=300&h=300&fit=crop&crop=face' },
  { id: 'c3', label: 'Siamois', uri: 'https://images.unsplash.com/photo-1561948955-570b270e7c36?w=300&h=300&fit=crop&crop=face' },
  { id: 'c4', label: 'Maine Coon', uri: 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=300&fit=crop&crop=face' },
];

export default function PetProfile() {
  const router = useRouter();
  const { pet, updatePet } = usePet();
  const [name, setName] = useState(pet?.name || 'Buddy');
  const [isSaving, setIsSaving] = useState(false);
  const [breed, setBreed] = useState(pet?.breed || 'Golden Retriever');
  const [age, setAge] = useState(pet?.age || '3 ans');
  const [weight, setWeight] = useState(pet?.weight || '34 kg');
  const [photo, setPhoto] = useState<string | null>((pet as any)?.photo || null);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [animalType, setAnimalType] = useState<'chien' | 'chat'>('chien');

  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updatePet({ name, breed, age, weight, photo } as any);
      router.back();
    } finally {
      setIsSaving(false);
    }
  };

  const pickFromGallery = async () => {
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

  const pickFromCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', "L'accès à l'appareil photo est nécessaire.");
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      setPhoto(result.assets[0].uri);
    }
  };

  const pickFromFile = async () => {
    // On web, launchImageLibraryAsync opens the file explorer
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

  const avatars = animalType === 'chien' ? DOG_AVATARS : CAT_AVATARS;

  const InputField = ({ icon: Icon, label, value, onChangeText, placeholder }: any) => (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <Icon color="#A855F7" size={18} style={{ marginRight: 14 }} />
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
      <LinearGradient colors={['#1A0A3E', '#0E0824', '#000']} style={StyleSheet.absoluteFill} />
      <View style={styles.orb1} /><View style={styles.orb2} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>

        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
            accessibilityLabel="Retour"
            accessibilityRole="button"
          >
            <ChevronLeft color="#fff" size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Éditer le profil</Text>
          <TouchableOpacity
            onPress={handleSave}
            style={styles.saveBtnTop}
            accessibilityLabel="Enregistrer le profil"
            accessibilityRole="button"
            disabled={isSaving}
            accessibilityState={{ disabled: isSaving }}
          >
            <Save color="#A855F7" size={22} />
          </TouchableOpacity>
        </View>

        {/* ── AVATAR SECTION ── */}
        <View style={styles.avatarSection}>
          <TouchableOpacity style={styles.avatarContainer} onPress={() => setShowAvatarModal(true)}>
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatar} />
            ) : (
              <LinearGradient colors={['rgba(168,85,247,0.3)', 'rgba(124,58,237,0.1)']} style={styles.avatarPlaceholder}>
                <Dog color="rgba(168,85,247,0.8)" size={56} />
              </LinearGradient>
            )}
            <View style={styles.cameraBtn}>
              <Camera color="white" size={18} />
            </View>
          </TouchableOpacity>

          <Text style={styles.buddyName}>{name}</Text>
          <View style={styles.tagPro}>
            <Sparkles color="white" size={11} />
            <Text style={styles.tagProText}>SUIVI SANTÉ INTELLIGENT</Text>
          </View>

          {/* Photo options */}
          <View style={styles.photoOptions}>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={pickFromGallery}
              accessibilityLabel="Choisir depuis la galerie"
              accessibilityRole="button"
            >
              <ImageIcon color="#A855F7" size={18} />
              <Text style={styles.photoOptionText}>Galerie</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={pickFromCamera}
              accessibilityLabel="Prendre une photo"
              accessibilityRole="button"
            >
              <Camera color="#10B981" size={18} />
              <Text style={[styles.photoOptionText, { color: '#10B981' }]}>Appareil</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={() => setShowAvatarModal(true)}
              accessibilityLabel="Choisir un avatar"
              accessibilityRole="button"
            >
              <Dog color="#F59E0B" size={18} />
              <Text style={[styles.photoOptionText, { color: '#F59E0B' }]}>Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.photoOption}
              onPress={pickFromFile}
              accessibilityLabel="Choisir un fichier"
              accessibilityRole="button"
            >
              <Upload color="#3B82F6" size={18} />
              <Text style={[styles.photoOptionText, { color: '#3B82F6' }]}>Fichier</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ── FORM ── */}
        <View style={styles.card}>
          <InputField icon={Dog} label="NOM DE L'ANIMAL" value={name} onChangeText={setName} placeholder="Ex: Buddy, Shadow..." />
          <InputField icon={Heart} label="RACE / TYPE" value={breed} onChangeText={setBreed} placeholder="Ex: Golden Retriever..." />
          <InputField icon={Clock} label="ÂGE" value={age} onChangeText={setAge} placeholder="Ex: 3 ans..." />
          <InputField icon={Scale} label="POIDS ACTUEL" value={weight} onChangeText={setWeight} placeholder="Ex: 34 kg..." />
        </View>

        <TouchableOpacity
          style={styles.saveBtnLarge}
          onPress={handleSave}
          disabled={isSaving}
          accessibilityLabel="Enregistrer les modifications"
          accessibilityRole="button"
          accessibilityState={{ disabled: isSaving }}
        >
          <LinearGradient colors={['#A855F7', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.saveBtnGrad}>
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.saveBtnText}>Enregistrer les modifications</Text>
            )}
          </LinearGradient>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      {/* ── AVATAR PICKER MODAL ── */}
      <Modal visible={showAvatarModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <LinearGradient colors={['#1E1040', '#0E0824']} style={[StyleSheet.absoluteFill, { borderRadius: 44 }]} />
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choisir un avatar</Text>
              <TouchableOpacity onPress={() => setShowAvatarModal(false)}>
                <X color="white" size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.typeToggle}>
              <TouchableOpacity
                style={[styles.typeBtn, animalType === 'chien' && styles.typeBtnActive]}
                onPress={() => setAnimalType('chien')}
              >
                <Text style={[styles.typeBtnText, animalType === 'chien' && styles.typeBtnTextActive]}>🐕 Chien</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.typeBtn, animalType === 'chat' && styles.typeBtnActive]}
                onPress={() => setAnimalType('chat')}
              >
                <Text style={[styles.typeBtnText, animalType === 'chat' && styles.typeBtnTextActive]}>🐈 Chat</Text>
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.avatarGrid}>
                {avatars.map(av => (
                  <TouchableOpacity
                    key={av.id}
                    style={[styles.avatarOption, photo === av.uri && styles.avatarOptionSelected]}
                    onPress={() => { setPhoto(av.uri); setShowAvatarModal(false); }}
                  >
                    <Image source={{ uri: av.uri }} style={styles.avatarOptionImg} />
                    <Text style={styles.avatarOptionLabel}>{av.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            <View style={styles.modalPhotoActions}>
              <TouchableOpacity style={styles.modalPhotoBtn} onPress={() => { setShowAvatarModal(false); pickFromGallery(); }}>
                <ImageIcon color="white" size={20} />
                <Text style={styles.modalPhotoBtnText}>Depuis la galerie</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalPhotoBtn, { backgroundColor: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)' }]} onPress={() => { setShowAvatarModal(false); pickFromCamera(); }}>
                <Camera color="#10B981" size={20} />
                <Text style={[styles.modalPhotoBtnText, { color: '#10B981' }]}>Appareil photo</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 24, paddingTop: 60 },
  orb1: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(168,85,247,0.1)', top: -80, right: -60 },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(124,58,237,0.06)', bottom: 200, left: -60 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.06)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#fff' },
  saveBtnTop: { padding: 12, borderRadius: 16, backgroundColor: 'rgba(168,85,247,0.15)', borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  avatarSection: { alignItems: 'center', marginBottom: 40 },
  avatarContainer: { width: 150, height: 150, borderRadius: 75, marginBottom: 20, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.4, shadowRadius: 30 },
  avatar: { width: '100%', height: '100%', borderRadius: 75, borderWidth: 4, borderColor: '#A855F7' },
  avatarPlaceholder: { width: '100%', height: '100%', borderRadius: 75, borderWidth: 4, borderColor: 'rgba(168,85,247,0.5)', alignItems: 'center', justifyContent: 'center' },
  cameraBtn: { position: 'absolute', bottom: 4, right: 4, backgroundColor: '#A855F7', padding: 10, borderRadius: 20, borderWidth: 3, borderColor: '#0E0824' },
  buddyName: { fontSize: 30, fontWeight: '900', color: '#fff', marginBottom: 12 },
  tagPro: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168,85,247,0.15)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12, borderWidth: 1, borderColor: 'rgba(168,85,247,0.25)', marginBottom: 24 },
  tagProText: { color: '#fff', fontSize: 10, fontWeight: '900', marginLeft: 8, letterSpacing: 1 },
  photoOptions: { flexDirection: 'row', justifyContent: 'center' },
  photoOption: { alignItems: 'center', marginHorizontal: 12, backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  photoOptionText: { color: '#A855F7', fontSize: 11, fontWeight: '900', marginTop: 6 },
  card: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.07)', marginBottom: 32 },
  inputGroup: { marginBottom: 24 },
  label: { fontSize: 11, fontWeight: '900', color: 'rgba(168,85,247,0.6)', marginBottom: 10, letterSpacing: 1.5 },
  inputWrapper: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.04)', paddingHorizontal: 20, paddingVertical: 16, borderRadius: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  input: { flex: 1, fontSize: 16, color: '#fff', fontWeight: '800' },
  saveBtnLarge: { borderRadius: 32, overflow: 'hidden', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20 },
  saveBtnGrad: { paddingVertical: 22, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 17, fontWeight: '900' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { borderRadius: 44, borderTopLeftRadius: 44, borderTopRightRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', overflow: 'hidden', maxHeight: '85%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  modalTitle: { color: '#fff', fontSize: 22, fontWeight: '900' },
  typeToggle: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 20, padding: 4, marginBottom: 24 },
  typeBtn: { flex: 1, paddingVertical: 12, borderRadius: 16, alignItems: 'center' },
  typeBtnActive: { backgroundColor: '#A855F7' },
  typeBtnText: { color: 'rgba(255,255,255,0.4)', fontSize: 15, fontWeight: '800' },
  typeBtnTextActive: { color: '#fff' },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  avatarOption: { width: '48%', marginBottom: 16, borderRadius: 24, overflow: 'hidden', borderWidth: 2.5, borderColor: 'rgba(255,255,255,0.05)' },
  avatarOptionSelected: { borderColor: '#A855F7' },
  avatarOptionImg: { width: '100%', height: 120 },
  avatarOptionLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '800', textAlign: 'center', padding: 10, backgroundColor: 'rgba(0,0,0,0.5)' },
  modalPhotoActions: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  modalPhotoBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(168,85,247,0.15)', paddingVertical: 16, borderRadius: 20, marginHorizontal: 8, borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  modalPhotoBtnText: { color: '#A855F7', fontWeight: '900', fontSize: 14, marginLeft: 10 },
});
