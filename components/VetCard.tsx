import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface VetCardProps {
  name: string;
  rating: string;
  dist: string;
  img: string;
}

export const VetCard: React.FC<VetCardProps> = ({ name, rating, dist, img }) => {
  const router = useRouter();
  return (
    <TouchableOpacity style={styles.vetCardWrap} onPress={() => router.push('/map' as any)}>
      <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.02)']} style={styles.vetCardGlass}>
        <Image source={{ uri: img }} style={styles.vetImg} />
        <View style={styles.vetContent}>
          <Text style={styles.vetName} numberOfLines={1}>{name}</Text>
          <View style={styles.vetMetaRow}>
            <View style={styles.vetMetaItem}>
              <Star color="#F59E0B" size={10} fill="#F59E0B" />
              <Text style={styles.vetRating}>{rating}</Text>
            </View>
            <Text style={styles.vetDist}>{dist}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  vetCardWrap: { 
    width: 200, 
    marginRight: 20, 
    borderRadius: 36, 
    overflow: 'hidden', 
    backgroundColor: 'rgba(21, 15, 43, 0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8
  },
  vetCardGlass: { flex: 1, padding: 8 },
  vetImg: { width: '100%', height: 120, borderRadius: 28 },
  vetContent: { padding: 16, paddingTop: 12 },
  vetName: { color: '#E7DEFF', fontSize: 16, fontWeight: '900', marginBottom: 8, letterSpacing: -0.2 },
  vetMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vetMetaItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(245, 158, 11, 0.1)', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  vetRating: { color: '#F59E0B', fontSize: 11, fontWeight: '900', marginLeft: 4 },
  vetDist: { color: 'rgba(231, 222, 255, 0.4)', fontSize: 12, fontWeight: '700' },
});
