import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Animated, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect, memo } from 'react';
import { usePet } from '@/store/PetContext';
import { ChevronRight, Heart, Sparkles, Dog, Cat, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const TypeCard = memo(({ icon: Icon, label, isSelected, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.typeCard, isSelected && styles.typeCardSelected]}
  >
    <View style={[styles.typeIconBg, isSelected && styles.typeIconBgSelected]}>
      <Icon color={isSelected ? 'white' : 'rgba(255,255,255,0.4)'} size={32} />
    </View>
    <Text style={[styles.typeLabel, isSelected && styles.typeLabelSelected]}>{label}</Text>
  </TouchableOpacity>
));

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();
  const { updatePet } = usePet();

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [step]);

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      await updatePet({ name, breed: type, age, weight: '34 kg' });
      router.push('/dashboard' as any);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
        
        <View style={styles.progressBar}>
           {[1, 2, 3].map(s => (
              <View key={s} style={[styles.progressStep, s <= step && styles.progressStepActive]} />
           ))}
        </View>

        <View style={styles.hero}>
           <View style={styles.logoBg}><Heart color="white" fill="white" size={32} /></View>
           <Text style={styles.brand}>VetCare <Text style={{ fontWeight: '400' }}>Pro</Text></Text>
        </View>

        {step === 1 && (
          <View style={styles.stepContent}>
            <Text style={styles.title}>Comment s'appelle{'\n'}votre animal ?</Text>
            <Text style={styles.subtitle}>Nous allons créer un profil personnalisé pour lui.</Text>
            <View style={styles.inputArea}>
               <TextInput
                 style={styles.input}
                 placeholder="Ex: Shadow, Rex, Bella..."
                 placeholderTextColor="rgba(255,255,255,0.2)"
                 value={name}
                 onChangeText={setName}
                 autoFocus
               />
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.title}>Quel type d'animal{'\n'}avez-vous ?</Text>
            <Text style={styles.subtitle}>Choisissez la catégorie qui lui correspond le mieux.</Text>
            <View style={styles.typeGrid}>
              <TypeCard icon={Dog} label="Chien" isSelected={type === 'Chien'} onPress={() => setType('Chien')} />
              <TypeCard icon={Cat} label="Chat" isSelected={type === 'Chat'} onPress={() => setType('Chat')} />
              <TypeCard icon={Plus} label="Autre" isSelected={type === 'Autre'} onPress={() => setType('Autre')} />
            </View>
          </View>
        )}

        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.title}>Quel âge a{'\n'}{name} ?</Text>
            <Text style={styles.subtitle}>Cela nous aide à adapter ses routines de santé.</Text>
            <View style={styles.inputArea}>
               <TextInput
                 style={styles.input}
                 placeholder="Ex: 3 ans, 5 mois..."
                 placeholderTextColor="rgba(255,255,255,0.2)"
                 value={age}
                 onChangeText={setAge}
                 autoFocus
               />
            </View>
          </View>
        )}

        <View style={styles.footer}>
           <TouchableOpacity 
             style={[styles.nextBtn, (!name && step === 1 || !type && step === 2 || !age && step === 3) && styles.nextBtnDisabled]} 
             onPress={handleNext}
             disabled={!name && step === 1 || !type && step === 2 || !age && step === 3}
           >
              <Text style={styles.nextText}>{step === 3 ? "C'est parti !" : "Suivant"}</Text>
              <ChevronRight color="black" size={24} />
           </TouchableOpacity>
        </View>

      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  inner: { flex: 1, padding: 32, paddingBottom: 60 },
  progressBar: { flexDirection: 'row', justifyContent: 'center', marginTop: 24, marginBottom: 40 },
  progressStep: { width: 60, height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginHorizontal: 6 },
  progressStepActive: { backgroundColor: '#A855F7' },
  hero: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 60 },
  logoBg: { backgroundColor: '#A855F7', padding: 12, borderRadius: 16 },
  brand: { fontSize: 28, fontWeight: '900', color: 'white', marginLeft: 16 },
  stepContent: { flex: 1 },
  title: { fontSize: 36, fontWeight: '900', color: 'white', marginBottom: 20, lineHeight: 44 },
  subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.4)', fontWeight: '700', lineHeight: 28, marginBottom: 48 },
  inputArea: { width: '100%', marginBottom: 40 },
  input: { backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 32, paddingVertical: 28, borderRadius: 36, fontSize: 22, color: 'white', fontWeight: '800', borderWidth: 2, borderColor: 'rgba(255,255,255,0.1)' },
  typeGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  typeCard: { flex: 1, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 36, padding: 24, alignItems: 'center', marginHorizontal: 8, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.06)' },
  typeCardSelected: { backgroundColor: 'rgba(168, 85, 247, 0.15)', borderColor: '#A855F7' },
  typeIconBg: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 24, marginBottom: 16 },
  typeIconBgSelected: { backgroundColor: '#A855F7' },
  typeLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 15, fontWeight: '900' },
  typeLabelSelected: { color: 'white' },
  footer: { marginTop: 'auto' },
  nextBtn: { backgroundColor: 'white', paddingVertical: 24, borderRadius: 32, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#FFF', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 8 },
  nextBtnDisabled: { opacity: 0.3 },
  nextText: { color: 'black', fontSize: 18, fontWeight: '900', marginRight: 12 }
});
