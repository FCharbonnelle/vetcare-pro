import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import { Plus, MapPin, TrendingUp, ChevronRight, Activity, Bell } from 'lucide-react-native';
import { Link } from 'expo-router';
import { useAuth } from '@/store/AuthContext';

const { width } = Dimensions.get('window');

export default function Dashboard() {
  const { user } = useAuth();
  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || "User";

  const currentPet = {
    name: "Buddy",
    breed: "Golden Retriever",
    weight: 28.5,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcomeText}>WELCOME BACK</Text>
            <Text style={styles.nameText}>Hello, {firstName}! 🐾</Text>
          </View>
          <TouchableOpacity style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop' }} 
              style={styles.avatar}
            />
          </TouchableOpacity>
        </View>

        {/* Pet Card */}
        <View style={styles.petCard}>
          <View style={styles.petIconBg}>
            <Activity color="white" size={28} />
          </View>
          <View style={styles.petInfo}>
            <Text style={styles.petName}>{currentPet.name}</Text>
            <Text style={styles.petBreed}>{currentPet.breed}</Text>
          </View>
          <Link href="/(tabs)/ai-assist" asChild>
            <TouchableOpacity style={styles.updateBtn}>
              <Text style={styles.updateBtnText}>Update</Text>
            </TouchableOpacity>
          </Link>
        </View>

        {/* Weight Section */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View style={styles.row}>
              <TrendingUp color="#10B981" size={20} style={{ marginRight: 8 }} />
              <Text style={styles.cardTitle}>Health Tracker</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Manual</Text>
            </View>
          </View>

          <View style={styles.chartContainer}>
             {[30, 45, 38, 52, 60, 48, 55].map((h, i) => (
                <View key={i} style={[styles.bar, { height: `${h}%`, backgroundColor: i === 6 ? '#6D28D9' : '#F3F4F6' }]} />
             ))}
          </View>

          <View style={styles.weightFooter}>
            <View>
               <Text style={styles.weightLabel}>Current Weight</Text>
               <Text style={styles.weightValue}>{currentPet.weight} kg</Text>
            </View>
            <TouchableOpacity style={styles.plusBtn}>
               <Plus color="#6D28D9" size={20} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Local Vets */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Local Veterinarians</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See all</Text></TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.vetScroll}>
           {[
             { name: "City Center Pet Hospital", dist: "1.2 km", img: "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=200&h=200&fit=crop" },
             { name: "Emergency Vet 24/7", dist: "3.5 km", img: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?w=200&h=200&fit=crop" }
           ].map((vet, idx) => (
             <TouchableOpacity key={idx} style={styles.vetCard}>
               <Image source={{ uri: vet.img }} style={styles.vetImg} />
               <Text style={styles.vetName} numberOfLines={1}>{vet.name}</Text>
               <View style={styles.row}>
                 <MapPin color="#6D28D9" size={12} style={{ marginRight: 4 }} />
                 <Text style={styles.vetDist}>{vet.dist}</Text>
               </View>
             </TouchableOpacity>
           ))}
        </ScrollView>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9FAFB' },
  scroll: { padding: 24, paddingBottom: 100 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32, marginTop: 16 },
  welcomeText: { color: '#9CA3AF', fontSize: 12, fontWeight: '700', letterSpacing: 1 },
  nameText: { color: '#111827', fontSize: 28, fontWeight: '900' },
  avatarContainer: { height: 48, width: 48, borderRadius: 24, overflow: 'hidden', borderWidth: 2, borderColor: '#F3F4F6' },
  avatar: { height: '100%', width: '100%' },
  petCard: { backgroundColor: '#6D28D9', borderRadius: 24, padding: 24, flexDirection: 'row', alignItems: 'center', marginBottom: 32, shadowColor: '#6D28D9', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10 },
  petIconBg: { backgroundColor: 'rgba(255,255,255,0.2)', padding: 12, borderRadius: 16, marginRight: 16 },
  petInfo: { flex: 1 },
  petName: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  petBreed: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  updateBtn: { backgroundColor: 'rgba(255,255,255,0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  updateBtnText: { color: '#FFFFFF', fontSize: 12, fontWeight: '700' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 24, borderSize: 1, borderWidth: 1, borderColor: '#F3F4F6', marginBottom: 32 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  row: { flexDirection: 'row', alignItems: 'center' },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  chip: { backgroundColor: '#F0FDF4', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
  chipText: { color: '#10B981', fontSize: 10, fontWeight: '700' },
  chartContainer: { height: 80, flexDirection: 'row', alignItems: 'end', justifyContent: 'space-between', marginBottom: 20 },
  bar: { width: 20, borderRadius: 6 },
  weightFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopWidth: 1, borderTopColor: '#F9FAFB', paddingTop: 20 },
  weightLabel: { color: '#9CA3AF', fontSize: 10, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  weightValue: { color: '#111827', fontSize: 24, fontWeight: '800', marginTop: 4 },
  plusBtn: { backgroundColor: '#F5F3FF', padding: 12, borderRadius: 16 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#111827' },
  seeAll: { color: '#6D28D9', fontSize: 14, fontWeight: '700' },
  vetScroll: { overflow: 'visible' },
  vetCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 16, width: 200, marginRight: 16, borderSize: 1, borderWidth: 1, borderColor: '#F3F4F6' },
  vetImg: { width: '100%', height: 100, borderRadius: 16, marginBottom: 12 },
  vetName: { color: '#111827', fontSize: 14, fontWeight: '700', marginBottom: 4 },
  vetDist: { color: '#6B7280', fontSize: 12, fontWeight: '500' }
});
