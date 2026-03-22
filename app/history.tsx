import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Animated, ActivityIndicator, Alert } from 'react-native';
import { Calendar, Stethoscope, Scissors, Syringe, Plus, ChevronLeft, Heart, Sparkles, Camera } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { scanHealthRecord } from '@/services/ocr';
import { supabase, isMockMode } from '@/services/supabase';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';

export default function HistoryScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { pet } = usePet();
  const [loading, setLoading] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleScan = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission refusée', "L'accès à l'appareil photo est requis.");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setLoading(true);
      try {
        const ocrResult = await scanHealthRecord(result.assets[0].uri);

        if (!isMockMode && user && pet) {
           const { error } = await supabase
             .from('health_records')
             .insert({
               pet_id: pet.id,
               record_type: ocrResult.record_type,
               visit_date: ocrResult.visit_date,
               extracted_text: { summary: ocrResult.extracted_info },
             });

           if (error) throw error;
        }

        Alert.alert('Scan Réussi', `Le document (${ocrResult.record_type}) a été analysé et enregistré.`);
      } catch (error) {
        Alert.alert('Erreur', "Le scan n'a pas pu être complété.");
      } finally {
        setLoading(false);
      }
    }
  };

  const HistoryItem = ({ icon: Icon, title, date, type, color = "#A855F7" }: any) => (
    <TouchableOpacity style={styles.historyItem}>
      <View style={[styles.iconContainer, { backgroundColor: 'rgba(255,255,255,0.05)', borderColor: `${color}40` }]}>
        <Icon color={color} size={20} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemType}>{type}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={styles.itemDate}>{date}</Text>
        <Text style={styles.itemStatus}>Terminé</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
           <Text style={styles.welcomeText}>VISITES PASSÉES</Text>
           <Text style={styles.headerTitle}>Historique Médical 📜</Text>
        </View>

        <View style={styles.summaryCard}>
           <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                 <Text style={styles.summaryValue}>12</Text>
                 <Text style={styles.summaryLabel}>Total visites</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                 <Text style={styles.summaryValue}>3</Text>
                 <Text style={styles.summaryLabel}>Mois prochain</Text>
              </View>
           </View>
        </View>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Activités récentes</Text>
           <View style={{ flexDirection: 'row' }}>
             <TouchableOpacity style={[styles.addBtnContainer, { marginRight: 10 }]} onPress={handleScan}>
                {loading ? <ActivityIndicator size="small" color="#A855F7" /> : <Camera color="#A855F7" size={20} />}
                <Text style={styles.addBtnText}>Scanner</Text>
             </TouchableOpacity>
             <TouchableOpacity style={styles.addBtnContainer}>
                <Plus color="#A855F7" size={20} />
                <Text style={styles.addBtnText}>Nouveau</Text>
             </TouchableOpacity>
           </View>
        </View>

        <View style={styles.listContainer}>
          <HistoryItem icon={Syringe} title="Vaccination Annuelle" date="12 Oct, 2025" type="Préventif" color="#A855F7" />
          <HistoryItem icon={Stethoscope} title="Contrôle Général" date="28 Sep, 2025" type="Clinique" color="#10B981" />
          <HistoryItem icon={Scissors} title="Toilettage Complet" date="15 Sep, 2025" type="Hygiène" color="#F59E0B" />
          <HistoryItem icon={Calendar} title="Consultation Vétérinaire" date="30 Aoû, 2025" type="Clinique" color="#3B82F6" />
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>

      <TouchableOpacity style={styles.fab}>
         <Plus color="white" size={28} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scroll: { flexGrow: 1 },
  header: { padding: 24, paddingTop: 60 },
  welcomeText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '800', letterSpacing: 1.5 },
  headerTitle: { color: '#FFFFFF', fontSize: 32, fontWeight: '900', marginTop: 8 },
  summaryCard: { margin: 24, marginTop: 0, backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 36, padding: 32, borderColor: 'rgba(255,255,255,0.08)', borderWidth: 1.5, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 6 },
  summaryRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  summaryItem: { alignItems: 'center' },
  summaryValue: { color: '#FFFFFF', fontSize: 24, fontWeight: '900' },
  summaryLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: '700', marginTop: 4 },
  summaryDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.1)', marginHorizontal: 40 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, marginBottom: 20, marginTop: 24 },
  sectionTitle: { fontSize: 20, fontWeight: '900', color: '#FFFFFF' },
  addBtnContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168, 85, 247, 0.15)', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 16 },
  addBtnText: { color: '#A855F7', fontWeight: '800', fontSize: 13, marginLeft: 8 },
  listContainer: { paddingHorizontal: 24 },
  historyItem: { flexDirection: 'row', alignItems: 'center', padding: 20, marginBottom: 16, borderRadius: 32, borderWidth: 1.2, borderColor: 'rgba(255,255,255,0.06)', backgroundColor: 'rgba(255,255,255,0.03)' },
  iconContainer: { padding: 12, borderRadius: 18, borderWidth: 1 },
  itemTitle: { fontSize: 17, fontWeight: '800', color: '#FFFFFF' },
  itemType: { fontSize: 12, color: 'rgba(255,255,255,0.4)', fontWeight: '600', marginTop: 2 },
  itemDate: { fontSize: 13, fontWeight: '700', color: 'rgba(255,255,255,0.8)' },
  itemStatus: { fontSize: 11, fontWeight: '800', color: '#10B981', marginTop: 4, textTransform: 'uppercase' },
  fab: { position: 'absolute', bottom: 32, right: 32, backgroundColor: '#A855F7', width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 8 }
});
