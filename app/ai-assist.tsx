import { View, Text, ScrollView, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, Animated, ActivityIndicator } from 'react-native';
import { BrainCircuit, Send, Sparkles, AlertCircle, ChevronLeft } from 'lucide-react-native';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { usePet } from '@/store/PetContext';
import { LinearGradient } from 'expo-linear-gradient';
import { analyzeSymptoms } from '@/services/ai';

export default function AIAssist() {
  const [symptom, setSymptom] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<null | any>(null);
  const router = useRouter();
  const { pet } = usePet();
  const petName = pet?.name || 'Buddy';
  const petInfo = `${pet?.breed || 'Inconnu'}, ${pet?.age || 'Inconnu'}, ${pet?.weight || 'Inconnu'}`;

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [analyzing]);

  const handleAnalyze = async () => {
    if (!symptom) return;
    setAnalyzing(true);
    setResult(null);
    try {
      const response = await analyzeSymptoms(petName, petInfo, symptom);
      setResult(response);
    } catch (error) {
      console.error(error);
      setResult({
        severity: 'Inconnu',
        advice: "Une erreur est survenue lors de l'analyse.",
        warning: 'Veuillez réessayer plus tard.'
      });
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <Animated.View style={[styles.inner, { opacity: fadeAnim }]}>
          
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
               <ChevronLeft color="#FFFFFF" size={24} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Expert VetAI</Text>
            <View style={{ width: 44 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
            
            <View style={styles.hero}>
              <View style={styles.iconBg}>
                 <BrainCircuit color="#A855F7" size={56} fill="rgba(168, 85, 247, 0.1)" />
              </View>
              <Text style={styles.title}>Comment va {analyzing ? '...' : petName} ? 🤖</Text>
              <Text style={styles.subtitle}>Posez vos questions sur ses symptômes, son régime ou son comportement.</Text>
            </View>

            <View style={styles.warningCard}>
               <AlertCircle color="#F59E0B" size={24} style={{ marginRight: 16 }} />
               <View style={{ flex: 1 }}>
                  <Text style={styles.warningText}>Intelligence Médicale Beta</Text>
                  <Text style={styles.warningSub}>Ceci ne remplace pas un diagnostic clinique.</Text>
               </View>
            </View>

            {result && (
               <View style={styles.resultCard}>
                  <View style={styles.row}>
                     <Sparkles color="#A855F7" size={24} />
                     <Text style={styles.resultTag}>DIAGNOSTIC IA SIMULÉ</Text>
                  </View>
                  <Text style={styles.adviceText}>{result.advice}</Text>
                  <View style={styles.severityBar}>
                     <Text style={styles.severityLabel}>Sévérité : <Text style={{ color: '#F59E0B' }}>{result.severity}</Text></Text>
                  </View>
               </View>
            )}

            {!result && !analyzing && (
               <View style={styles.inputArea}>
                  <Text style={styles.label}>Décrivez les symptômes de {petName}</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Perte d'appétit et dort plus que d'habitude..."
                    placeholderTextColor="rgba(255,255,255,0.3)"
                    multiline
                    value={symptom}
                    onChangeText={setSymptom}
                  />
                  <TouchableOpacity 
                    onPress={handleAnalyze} 
                    style={styles.analyzeBtn}
                  >
                     <Text style={styles.analyzeText}>Analyser</Text>
                     <Send color="white" size={20} />
                  </TouchableOpacity>
               </View>
            )}

            {analyzing && (
               <View style={styles.analyzingContainer}>
                  <ActivityIndicator size="large" color="#A855F7" />
                  <Text style={styles.analyzingText}>Consultation de la base de données...</Text>
               </View>
            )}

            <TouchableOpacity 
              onPress={() => router.push('/paywall')}
              style={styles.upsellCard}
            >
               <View style={styles.upsellRow}>
                  <Sparkles color="white" size={32} />
                  <View style={{ marginLeft: 20, flex: 1 }}>
                     <Text style={styles.upsellTitle}>Unlock Expert Mode</Text>
                     <Text style={styles.upsellSub}>Get step-by-step emergency care guides.</Text>
                  </View>
                  <View style={styles.proBadge}>
                     <Text style={styles.proText}>PRO</Text>
                  </View>
               </View>
            </TouchableOpacity>

          </ScrollView>
        </Animated.View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  inner: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 24, paddingTop: 60 },
  backBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF' },
  scroll: { padding: 24, paddingBottom: 100 },
  hero: { alignItems: 'center', marginBottom: 40 },
  iconBg: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 32, borderRadius: 48, marginBottom: 24, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 6 },
  title: { fontSize: 28, fontWeight: '900', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: 'rgba(255,255,255,0.4)', textAlign: 'center', fontWeight: '600' },
  warningCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 24, borderRadius: 32, marginBottom: 32, borderWidth: 1, borderColor: 'rgba(245, 158, 11, 0.2)' },
  warningText: { color: '#F59E0B', fontSize: 16, fontWeight: '800' },
  warningSub: { color: 'rgba(245,158,11,0.6)', fontSize: 13, fontWeight: '600', marginTop: 2 },
  inputArea: { marginBottom: 32 },
  label: { fontSize: 14, fontWeight: '900', color: 'rgba(255,255,255,0.3)', marginBottom: 16, marginLeft: 8, textTransform: 'uppercase', letterSpacing: 1.5 },
  input: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 28, borderRadius: 36, height: 180, fontSize: 17, color: '#FFFFFF', borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.1)', textAlignVertical: 'top' },
  analyzeBtn: { position: 'absolute', bottom: 16, right: 16, backgroundColor: '#A855F7', paddingHorizontal: 28, paddingVertical: 14, borderRadius: 24, flexDirection: 'row', alignItems: 'center', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 6 },
  analyzeText: { color: 'white', fontWeight: '800', marginRight: 12, fontSize: 15 },
  resultCard: { backgroundColor: 'rgba(255,255,255,0.08)', padding: 32, borderRadius: 44, borderWidth: 1.5, borderColor: 'rgba(168, 85, 247, 0.2)', marginBottom: 32, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 4 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  resultTag: { marginLeft: 12, color: '#A855F7', fontWeight: '900', fontSize: 13, letterSpacing: 1.5 },
  adviceText: { fontSize: 20, color: '#FFFFFF', lineHeight: 30, fontWeight: '600', marginBottom: 28 },
  severityBar: { borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)', paddingTop: 24 },
  severityLabel: { fontSize: 14, fontWeight: '800', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' },
  analyzingContainer: { padding: 40, alignItems: 'center' },
  analyzingText: { color: '#A855F7', fontWeight: '800', fontSize: 17, marginTop: 24 },
  upsellCard: { backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 44, padding: 36, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)', shadowColor: '#000', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.1, shadowRadius: 30, elevation: 12 },
  upsellRow: { flexDirection: 'row', alignItems: 'center' },
  upsellTitle: { color: '#FFFFFF', fontSize: 22, fontWeight: '900' },
  upsellSub: { color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: '600', marginTop: 4 },
  proBadge: { position: 'absolute', top: -16, right: -8, backgroundColor: '#A855F7', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 14 },
  proText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1 }
});
