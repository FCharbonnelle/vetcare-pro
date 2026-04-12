import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions, Animated } from 'react-native';
import { Sparkles, Check, X, ShieldCheck, Crown, Zap, Heart } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

const { width } = Dimensions.get('window');

export default function Paywall() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const Feature = ({ text }: { text: string }) => (
    <View style={styles.featureRow}>
       <View style={styles.checkCircle}>
          <Check color={Theme.colors.primary} size={14} strokeWidth={3} />
       </View>
       <Text style={styles.featureText}>{text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        style={[styles.flex, { opacity: fadeAnim }]}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <TouchableOpacity style={styles.closeBtn} onPress={() => router.back()}>
           <X color="rgba(255,255,255,0.4)" size={24} />
        </TouchableOpacity>

        <View style={styles.header}>
           <Crown color={Theme.colors.primary} size={48} fill={Theme.colors.primary} />
           <Text style={styles.title}>VetCare <Text style={{ color: Theme.colors.primary }}>PRO</Text></Text>
           <Text style={styles.subtitle}>Libérez le plein potentiel du Sanctuaire</Text>
        </View>

        <View style={styles.card}>
           <Text style={styles.cardHeader}>AVANTAGES EXCLUSIFS</Text>
           <Feature text="Accès illimité à VetCare AI" />
           <Feature text="Historique médical sans fin" />
           <Feature text="Analyses de santé prédictives" />
           <Feature text="Support vétérinaire 24/7" />
           <Feature text="Réductions sur la boutique" />
        </View>

        <View style={styles.pricingContainer}>
           <TouchableOpacity style={styles.priceCard}>
              <Text style={styles.priceLabel}>MENSUEL</Text>
              <Text style={styles.priceValue}>9.99€</Text>
              <Text style={styles.priceSub}>Par mois, sans engagement</Text>
           </TouchableOpacity>

           <TouchableOpacity style={[styles.priceCard, styles.priceCardActive]}>
              <View style={styles.popularBadge}>
                 <Text style={styles.popularText}>POPULAIRE</Text>
              </View>
              <Text style={[styles.priceLabel, { color: '#000' }]}>ANNUEL</Text>
              <Text style={[styles.priceValue, { color: '#000' }]}>79.99€</Text>
              <Text style={[styles.priceSub, { color: 'rgba(0,0,0,0.6)' }]}>Économisez 33% par an</Text>
           </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.subscribeBtn}>
           <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.subscribeGrad}>
              <Text style={styles.subscribeBtnText}>Commencer mon essai gratuit</Text>
           </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.footerText}>Pas d'engagement. Annulez à tout moment dans les réglages.</Text>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  flex: { flex: 1 },
  closeBtn: { padding: 20, alignSelf: 'flex-end' },
  header: { alignItems: 'center', marginTop: 10, marginBottom: 40 },
  title: { color: '#FFF', fontSize: 32, fontWeight: '900', marginTop: 16 },
  subtitle: { color: 'rgba(255,255,255,0.5)', fontSize: 16, textAlign: 'center', marginTop: 10, paddingHorizontal: 40, fontWeight: '600' },

  card: { backgroundColor: 'rgba(183,109,255,0.05)', marginHorizontal: 20, borderRadius: 32, padding: 30, borderWidth: 1, borderColor: 'rgba(183,109,255,0.2)' },
  cardHeader: { color: Theme.colors.primary, fontSize: 11, fontWeight: '900', letterSpacing: 2, marginBottom: 20 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  checkCircle: { width: 24, height: 24, borderRadius: 12, backgroundColor: Theme.colors.primary + '20', alignItems: 'center', justifyContent: 'center', marginRight: 14 },
  featureText: { color: '#FFF', fontSize: 14, fontWeight: '700' },

  pricingContainer: { flexDirection: 'row', paddingHorizontal: 20, gap: 15, marginTop: 30 },
  priceCard: { flex: 1, backgroundColor: Theme.colors.surfaceCard, borderRadius: 24, padding: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)', alignItems: 'center' },
  priceCardActive: { backgroundColor: Theme.colors.primary, borderColor: Theme.colors.primary },
  priceLabel: { color: Theme.colors.primary, fontSize: 10, fontWeight: '900', letterSpacing: 1.5 },
  priceValue: { color: '#FFF', fontSize: 24, fontWeight: '900', marginVertical: 8 },
  priceSub: { color: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: '700', textAlign: 'center' },
  popularBadge: { position: 'absolute', top: -10, backgroundColor: '#000', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  popularText: { color: Theme.colors.primary, fontSize: 8, fontWeight: '900' },

  subscribeBtn: { marginHorizontal: 20, marginTop: 40, borderRadius: 24, overflow: 'hidden', ...Theme.shadows.glow },
  subscribeGrad: { paddingVertical: 24, alignItems: 'center' },
  subscribeBtnText: { color: '#FFF', fontSize: 18, fontWeight: '900' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', marginTop: 24, paddingHorizontal: 60, fontWeight: '600' },
});
