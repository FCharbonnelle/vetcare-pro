import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Dimensions } from 'react-native';
import { ShoppingBag, Star, ChevronRight, Filter, Search, ChevronLeft } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

const { width } = Dimensions.get('window');

const PRODUCTS = [
  { id: '1', name: 'Élixir Zen Calmant', price: '24.99€', rating: '4.9', img: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400' },
  { id: '2', name: 'Harnais Bio-Tech', price: '45.00€', rating: '4.8', img: 'https://images.unsplash.com/photo-1544568100-847a948585b9?w=400' },
  { id: '3', name: 'Friandises Vitalité', price: '12.50€', rating: '5.0', img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=400' },
  { id: '4', name: 'Kit Hygiène Pro', price: '32.00€', rating: '4.7', img: 'https://images.unsplash.com/photo-1597843796321-230ff73aa2e5?w=400' },
];

export default function Market() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        style={[styles.flex, { opacity: fadeAnim }]}
        contentContainerStyle={{ paddingBottom: 120 }}
      >
        <View style={styles.header}>
           <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
             <ChevronLeft color="#FFF" size={24} />
           </TouchableOpacity>
           <View style={styles.searchBar}>
              <Search color="rgba(255,255,255,0.4)" size={18} />
              <Text style={styles.searchPlaceholder}>Rechercher un produit...</Text>
           </View>
           <TouchableOpacity style={styles.filterBtn}>
              <Filter color="#FFF" size={20} />
           </TouchableOpacity>
        </View>

        <View style={styles.hero}>
           <LinearGradient colors={['#7C3AED', '#4C1D95']} style={styles.heroGrad}>
              <View style={{ flex: 1 }}>
                 <Text style={styles.heroTop}>OFFRE EXCLUSIVE</Text>
                 <Text style={styles.heroTitle}>-20% sur la gamme Santé</Text>
                 <TouchableOpacity style={styles.shopBtn}>
                    <Text style={styles.shopBtnText}>Acheter</Text>
                 </TouchableOpacity>
              </View>
              <ShoppingBag color="rgba(255,255,255,0.2)" size={80} style={{ position: 'absolute', right: -10, bottom: -10 }} />
           </LinearGradient>
        </View>

        <View style={styles.sectionHeader}>
           <Text style={styles.sectionTitle}>Produits Populaires</Text>
           <TouchableOpacity><Text style={styles.seeAll}>Tout voir</Text></TouchableOpacity>
        </View>

        <View style={styles.grid}>
           {PRODUCTS.map(p => (
             <TouchableOpacity key={p.id} style={styles.productCard}>
                <Image source={{ uri: p.img }} style={styles.productImg} />
                <View style={styles.productInfo}>
                   <View style={styles.ratingRow}>
                      <Star color="#FABC4E" size={12} fill="#FABC4E" />
                      <Text style={styles.ratingText}>{p.rating}</Text>
                   </View>
                   <Text style={styles.productName} numberOfLines={1}>{p.name}</Text>
                   <Text style={styles.productPrice}>{p.price}</Text>
                </View>
             </TouchableOpacity>
           ))}
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15, gap: 15 },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  searchBar: { flex: 1, height: 44, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 12, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  searchPlaceholder: { color: 'rgba(255,255,255,0.3)', marginLeft: 10, fontSize: 13, fontWeight: '600' },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: Theme.colors.primary + '20', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: Theme.colors.primary + '40' },

  hero: { padding: 20 },
  heroGrad: { padding: 30, borderRadius: 32, flexDirection: 'row', overflow: 'hidden' },
  heroTop: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '900', letterSpacing: 2 },
  heroTitle: { color: '#FFF', fontSize: 22, fontWeight: '900', marginTop: 8, maxWidth: '80%' },
  shopBtn: { backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12, marginTop: 20, alignSelf: 'flex-start' },
  shopBtnText: { color: '#4C1D95', fontWeight: '900', fontSize: 13 },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, marginTop: 20, marginBottom: 20 },
  sectionTitle: { color: '#FFF', fontSize: 20, fontWeight: '900' },
  seeAll: { color: Theme.colors.primary, fontWeight: '800', fontSize: 13 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 16 },
  productCard: { width: (width - 48) / 2, backgroundColor: Theme.colors.surfaceCard, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)' },
  productImg: { width: '100%', height: 160 },
  productInfo: { padding: 15 },
  ratingRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  ratingText: { color: '#FFF', fontSize: 11, fontWeight: '900', marginLeft: 4 },
  productName: { color: '#FFF', fontSize: 14, fontWeight: '800' },
  productPrice: { color: Theme.colors.primary, fontSize: 16, fontWeight: '900', marginTop: 8 },
});
