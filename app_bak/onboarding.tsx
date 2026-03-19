import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ChevronRight, Dog, Cat, Shell } from 'lucide-react-native';

const speciesOptions = [
  { label: 'Dog', icon: Dog, key: 'dog' },
  { label: 'Cat', icon: Cat, key: 'cat' },
  { label: 'NAC', icon: Shell, key: 'nac' },
];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [petData, setPetData] = useState({ name: '', species: '', breed: '', age: '' });
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Simple animation on step change
  useEffect(() => {
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, { toValue: 1, duration: 400, useNativeDriver: true }).start();
  }, [step]);

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
    else router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        {/* Progress Bar */}
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${(step / 3) * 100}%` }]} />
        </View>

        <Animated.View style={[styles.stepContainer, { opacity: fadeAnim }]}>
          {step === 1 && (
            <View>
              <Text style={styles.heroTitle}>Welcome! 🐾</Text>
              <Text style={styles.subtitle}>What's the name of your best friend?</Text>
              
              <TextInput
                style={styles.input}
                placeholder="Ex: Buddy, Luna..."
                value={petData.name}
                onChangeText={(text) => setPetData({ ...petData, name: text })}
              />
            </View>
          )}

          {step === 2 && (
            <View>
              <Text style={styles.heroTitle}>Great name! ✨</Text>
              <Text style={styles.subtitle}>What kind of animal is {petData.name}?</Text>

              <View style={styles.speciesContainer}>
                {speciesOptions.map((opt) => (
                  <TouchableOpacity
                    key={opt.key}
                    onPress={() => setPetData({ ...petData, species: opt.key })}
                    style={[styles.speciesCard, petData.species === opt.key && styles.selectedSpeciesCard]}
                  >
                    <opt.icon size={32} color={petData.species === opt.key ? '#6D28D9' : '#9CA3AF'} />
                    <Text style={[styles.speciesLabel, petData.species === opt.key && styles.selectedSpeciesLabel]}>
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}

          {step === 3 && (
            <View>
              <Text style={styles.heroTitle}>Almost there! 🎂</Text>
              <Text style={styles.subtitle}>How old is {petData.name}?</Text>

              <TextInput
                style={styles.input}
                placeholder="Age (Years)"
                keyboardType="numeric"
                value={petData.age}
                onChangeText={(text) => setPetData({ ...petData, age: text })}
              />
              <TextInput
                style={[styles.input, { marginTop: 16 }]}
                placeholder="Breed (Optional)"
                value={petData.breed}
                onChangeText={(text) => setPetData({ ...petData, breed: text })}
              />
            </View>
          )}
        </Animated.View>

        {/* Next Button */}
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={nextStep}
            disabled={(step === 1 && !petData.name) || (step === 2 && !petData.species) || (step === 3 && !petData.age)}
            style={[styles.button, ((step === 1 && !petData.name) || (step === 2 && !petData.species) || (step === 3 && !petData.age)) && styles.buttonDisabled]}
          >
            <Text style={styles.buttonText}>
              {step === 3 ? "Let's Go!" : 'Continue'}
            </Text>
            <ChevronRight color="white" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  inner: { flex: 1, padding: 32, justifyContent: 'center' },
  progressBarBg: { height: 8, backgroundColor: '#F3F4F6', borderRadius: 4, marginBottom: 48, overflow: 'hidden' },
  progressBarFill: { height: '100%', backgroundColor: '#6D28D9', borderRadius: 4 },
  stepContainer: { flex: 1 },
  heroTitle: { fontSize: 32, fontWeight: '900', color: '#111827', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#6B7280', marginBottom: 32 },
  input: { backgroundColor: '#F9FAFB', padding: 24, borderRadius: 20, fontSize: 18, color: '#111827', borderWidth: 1, borderColor: '#F3F4F6' },
  speciesContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  speciesCard: { alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 24, borderSize: 2, borderWidth: 2, borderColor: '#F9FAFB', width: '30%' },
  selectedSpeciesCard: { borderColor: '#6D28D9', backgroundColor: '#F5F3FF' },
  speciesLabel: { marginTop: 8, fontWeight: '600', color: '#9CA3AF' },
  selectedSpeciesLabel: { color: '#6D28D9' },
  footer: { marginTop: 32 },
  button: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 20, borderRadius: 20, backgroundColor: '#6D28D9', shadowColor: '#6D28D9', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 6 },
  buttonDisabled: { backgroundColor: '#E5E7EB', shadowOpacity: 0, elevation: 0 },
  buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: '700', marginRight: 8 }
});
