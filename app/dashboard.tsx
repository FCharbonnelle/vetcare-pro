import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Platform, Animated } from 'react-native';
import { Activity, Bell, MapPin, ChevronRight, Plus, Heart, Sparkles, Clock, Scale, Dog, Star } from 'lucide-react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '@/store/AuthContext';
import { usePet } from '@/store/PetContext';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

export default function Dashboard() {
  const { user } = useAuth();
  const { pet, loading } = usePet();
  const fullName = user?.user_metadata?.full_name?.split(' ')[0] || "Sarah";
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!loading) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [loading]);

  if (loading) return <View style={styles.loading}><Activity color="#A855F7" size={40} /></View>;

  const currentPet = pet || { name: 'Buddy', breed: 'Golden Retriever', age: '3 yrs', weight: '34 kg' };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background Bokeh Gradient */}
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        {/* Header Row */}
        <View style={styles.header}>
           <View style={styles.logoRow}>
              <Heart color="#A855F7" size={32} fill="#A855F7" />
              <Text style={styles.brand}>VetCare <Text style={{fontWeight: '400'}}>Pro</Text></Text>
           </View>
           <View style={styles.headerBtns}>
              <TouchableOpacity style={styles.iconBtn}><Bell color="white" size={24} /></TouchableOpacity>
              <Image source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop' }} style={styles.avatar} />
           </View>
        </View>

        <Text style={styles.welcomeText}>Ravi de vous revoir, {fullName} !</Text>

        {/* Hero Pet Card (Glass) */}
        <View style={styles.heroCard}>
           <Image 
             source={{ uri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=400&fit=crop' }}
             style={styles.buddyImg}
           />
           <View style={styles.heroOverlay}>
              <Text style={styles.heroName}>{currentPet.name}</Text>
              
              <View style={styles.heroStats}>
                 <View style={styles.statItem}>
                    <Clock color="rgba(255,255,255,0.6)" size={16} />
                    <View style={{marginLeft: 12}}>
                       <Text style={styles.statLabel}>Âge</Text>
                       <Text style={styles.statValue}>{currentPet.age}</Text>
                    </View>
                 </View>
                 <View style={styles.statItem}>
                    <Scale color="rgba(255,255,255,0.6)" size={16} />
                    <View style={{marginLeft: 12}}>
                       <Text style={styles.statLabel}>Poids</Text>
                       <Text style={styles.statValue}>{currentPet.weight}</Text>
                    </View>
                 </View>
                 <View style={styles.statItem}>
                    <Dog color="rgba(255,255,255,0.6)" size={16} />
                    <View style={{marginLeft: 12}}>
                       <Text style={styles.statLabel}>Race</Text>
                       <Text style={styles.statValue}>{currentPet.breed}</Text>
                    </View>
                 </View>
              </View>
           </View>
        </View>

        {/* Weight Tracker Card */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Suivi du poids santé</Text>
           </View>
           
           <View style={styles.chartArea}>
              {/* Mocking the line chart from image */}
              <View style={styles.chartLineContainer}>
                 {[32.5, 33.1, 33.8, 34.2, 34.0, 33.9, 34.0].map((v, i) => (
                    <View key={i} style={styles.chartPointContainer}>
                       <View style={[styles.chartBar, { height: (v - 30) * 40, backgroundColor: i === 6 ? '#A855F7' : 'rgba(168, 85, 247, 0.2)' }]} />
                       <Text style={styles.chartValue}>{v}</Text>
                    </View>
                 ))}
                 {/* Highlighting the peak */}
                 <View style={styles.peakBadge}>
                    <Text style={styles.peakText}>+1.5kg</Text>
                 </View>
              </View>
              <View style={styles.monthLabels}>
                 {['Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mar', 'Avr'].map(m => (
                    <Text key={m} style={styles.monthLabel}>{m}</Text>
                 ))}
              </View>
              <Text style={styles.monthsTag}>Mois</Text>
           </View>
        </View>

        {/* Vets Section */}
        <Text style={styles.sectionTitle}>Vétérinaires à proximité</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
           <VetCard name="Happy Paws Clinic" rating="4.9" dist="1.2 mi" img="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=300&h=200&fit=crop" />
           <VetCard name="City Vet Hospital" rating="4.7" dist="2.5 mi" img="https://images.unsplash.com/photo-1599423300746-b62533397364?w=300&h=200&fit=crop" />
           <VetCard name="Pet Wellness Center" rating="4.8" dist="0.8 mi" img="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=300&h=200&fit=crop" />
        </ScrollView>

        <View style={{ height: 120 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

function VetCard({ name, rating, dist, img }: any) {
  return (
    <View style={styles.vetCard}>
      <Image source={{ uri: img }} style={styles.vetImg} />
      <View style={styles.vetContent}>
         <Text style={styles.vetName}>{name}</Text>
         <View style={styles.vetMeta}>
            <View style={styles.row}>
               <Star color="#F59E0B" size={14} fill="#F59E0B" />
               <Text style={styles.vetRating}>{rating}</Text>
            </View>
            <View style={[styles.row, { marginLeft: 16 }]}>
               <MapPin color="#94A3B8" size={12} />
               <Text style={styles.vetDist}>{dist}</Text>
            </View>
         </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#000000' },
  scroll: { padding: 24, paddingTop: 60 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  logoRow: { flexDirection: 'row', alignItems: 'center' },
  brand: { color: 'white', fontSize: 24, fontWeight: '900', marginLeft: 12 },
  headerBtns: { flexDirection: 'row', alignItems: 'center' },
  iconBtn: { padding: 8, marginRight: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1.5, borderColor: '#A855F7' },
  welcomeText: { color: 'white', fontSize: 28, fontWeight: '900', marginBottom: 32 },
  heroCard: { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 48, overflow: 'hidden', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 32 },
  buddyImg: { width: '100%', height: 280, opacity: 0.9 },
  heroOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 32, backgroundColor: 'rgba(0,0,0,0.4)' },
  heroName: { color: 'white', fontSize: 42, fontWeight: '900', marginBottom: 16 },
  heroStats: { flexDirection: 'row', justifyContent: 'space-between' },
  statItem: { flexDirection: 'row', alignItems: 'center' },
  statLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '700', textTransform: 'uppercase' },
  statValue: { color: 'white', fontSize: 13, fontWeight: '800', marginTop: 2 },
  card: { backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: 40, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.1)', marginBottom: 40 },
  cardHeader: { marginBottom: 32 },
  cardTitle: { color: 'white', fontSize: 20, fontWeight: '900' },
  chartArea: { width: '100%', alignItems: 'center' },
  chartLineContainer: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', height: 180, marginBottom: 20 },
  chartPointContainer: { alignItems: 'center', flex: 1 },
  chartBar: { width: 12, borderRadius: 6, opacity: 0.8 },
  chartValue: { color: 'white', fontSize: 10, fontWeight: '900', marginTop: 8 },
  monthLabels: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)', paddingTop: 16 },
  monthLabel: { color: '#94A3B8', fontSize: 11, fontWeight: '700' },
  monthsTag: { color: 'rgba(255,255,255,0.3)', fontSize: 9, fontWeight: '800', textTransform: 'uppercase', marginTop: 12, letterSpacing: 1 },
  peakBadge: { position: 'absolute', top: 0, right: 40, backgroundColor: '#A855F7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  peakText: { color: 'white', fontSize: 10, fontWeight: '900' },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: '900', marginBottom: 24 },
  vetCard: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 36, width: 200, marginRight: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  vetImg: { width: '100%', height: 120 },
  vetContent: { padding: 16 },
  vetName: { color: 'white', fontSize: 15, fontWeight: '900', marginBottom: 12 },
  vetMeta: { flexDirection: 'row', alignItems: 'center' },
  row: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: 'white', fontSize: 12, fontWeight: '800', marginLeft: 4 },
  vetDist: { color: '#94A3B8', fontSize: 11, fontWeight: '700', marginLeft: 4 }
});
