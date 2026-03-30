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
    width: 160, 
    marginRight: 16, 
    borderRadius: 28, 
    overflow: 'hidden', 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  vetCardGlass: { flex: 1 },
  vetImg: { width: '100%', height: 100 },
  vetContent: { padding: 12 },
  vetName: { color: '#fff', fontSize: 14, fontWeight: '900', marginBottom: 6 },
  vetMetaRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  vetMetaItem: { flexDirection: 'row', alignItems: 'center' },
  vetRating: { color: '#F59E0B', fontSize: 11, fontWeight: '900', marginLeft: 4 },
  vetDist: { color: 'rgba(255,255,255,0.5)', fontSize: 11, fontWeight: '800' },
});
