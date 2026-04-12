import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Star, MapPin, Heart, ShieldCheck } from 'lucide-react-native';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

interface VetCardProps {
  name: string;
  rating: string;
  dist: string;
  artworkUrl?: string;
}

export const VetCard: React.FC<VetCardProps> = ({ name, rating, dist, artworkUrl }) => {
  const defaultArtwork = 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=400&h=300&fit=crop'; 
  
  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <ImageBackground 
        source={{ uri: artworkUrl || defaultArtwork }} 
        style={styles.bg} 
        imageStyle={{ borderRadius: Theme.radius.xl }}
      >
        <LinearGradient 
          colors={['transparent', Theme.colors.background]} 
          style={styles.gradient}
          locations={[0.1, 0.95]}
        >
          <View style={styles.header}>
             <View style={styles.glassBadge}>
                <Star color={Theme.colors.tertiary} size={12} fill={Theme.colors.tertiary} />
                <Text style={styles.ratingText}>{rating}</Text>
             </View>
             <TouchableOpacity style={styles.favBtn}>
                <Heart color={Theme.colors.onSurface} size={16} />
             </TouchableOpacity>
          </View>
          
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={styles.name} numberOfLines={1}>{name}</Text>
              <ShieldCheck color={Theme.colors.primary} size={18} style={{ marginLeft: 6 }} />
            </View>
            <View style={styles.locRow}>
              <MapPin color={Theme.colors.primary} size={14} />
              <Text style={styles.location}>{dist.toUpperCase()} • DISPONIBLE</Text>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.ghostBorder} />
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: { 
    height: 200, 
    width: 290, 
    marginRight: 20, 
    borderRadius: Theme.radius.xl,
    backgroundColor: Theme.colors.surface,
    overflow: 'hidden',
    shadowColor: Theme.colors.primary,
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 40,
    elevation: 20,
  },
  bg: { flex: 1 },
  gradient: { 
    flex: 1, 
    padding: 24, 
    justifyContent: 'space-between',
  },
  ghostBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Theme.radius.xl,
    borderTopWidth: 1,
    borderTopColor: 'rgba(231, 222, 255, 0.2)',
    pointerEvents: 'none',
  },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  glassBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(21, 15, 43, 0.5)', 
    paddingHorizontal: 14, 
    paddingVertical: 8, 
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  ratingText: { color: Theme.colors.onSurface, fontSize: 13, fontWeight: '900', marginLeft: 8 },
  favBtn: { backgroundColor: 'rgba(21, 15, 43, 0.5)', padding: 12, borderRadius: Theme.radius.md, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.1)' },
  content: { marginBottom: 2 },
  titleRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  name: { color: Theme.colors.onSurface, fontSize: 20, fontWeight: '900', letterSpacing: -0.5 },
  locRow: { flexDirection: 'row', alignItems: 'center' },
  location: { color: Theme.colors.onSurfaceVariant, fontSize: 10, marginLeft: 8, fontWeight: '900', letterSpacing: 2 },
});

