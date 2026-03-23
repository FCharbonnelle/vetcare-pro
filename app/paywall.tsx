import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Animated } from 'react-native';
import { Check, X, Sparkles, Heart, Shield, Zap, Star } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useRef, useEffect, memo } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

const Feature = memo(({ text }: { text: string }) => (
  <View style={styles.featureRow}>
    <View style={styles.checkBg}>
       <Check color="#FFFFFF" size={14} strokeWidth={4} />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
));

export default function Paywall() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#170B3B', '#0E0824', '#000000']}
        style={StyleSheet.absoluteFill}
      />
      
      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>
        
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
            <X color="#FFFFFF" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.hero}>
           <View style={styles.iconGlow}>
              <Sparkles color="#A855F7" size={64} fill="rgba(168, 85, 247, 0.2)" />
           </View>
           <Text style={styles.title}>VetCare <Text style={{ color: '#A855F7' }}>PRO</Text></Text>
           <Text style={styles.subtitle}>Le meilleur pour votre meilleur ami.</Text>
        </View>

        <View style={styles.card}>
           <Text style={styles.cardHeader}>FONCTIONNALITÉS EXCLUSIVES</Text>
           <Feature text="Assistant IA Illimité 🤖" />
           <Feature text="Support Vétérinaire 24h/24 📞" />
           <Feature text="Analyses de Santé Avancées 📊" />
           <Feature text="Rappels de Soins Illimités 🔔" />
           <Feature text="Zéro Publicité ✨" />
        </View>

        <View style={styles.pricingContainer}>
           <View style={styles.planCard}>
              <View style={styles.bestValueBadge}>
                 <Text style={styles.bestValueText}>POPULAIRE</Text>
              </View>
              <Text style={styles.planTitle}>Annuel</Text>
              <View style={styles.priceRow}>
                 <Text style={styles.price}>4.99€</Text>
                 <Text style={styles.perMonth}>/mois</Text>
              </View>
              <Text style={styles.billingText}>Facturé annuellement (59.88€)</Text>
              
              <TouchableOpacity style={styles.subscribeBtn} onPress={() => router.back()}>
                 <Text style={styles.subscribeBtnText}>Essai Gratuit 7 Jours</Text>
              </TouchableOpacity>
           </View>

           <TouchableOpacity style={styles.secondaryPlan}>
              <Text style={styles.secondaryPlanTitle}>Mensuel</Text>
              <Text style={styles.secondaryPrice}>9.99€/mois</Text>
           </TouchableOpacity>
        </View>

        <View style={styles.footer}>
           <Text style={styles.footerText}>Annulez à tout moment. Conditions Générales applicables.</Text>
           <View style={styles.footerLinks}>
              <Text style={styles.footerLink}>Restaurer</Text>
              <View style={styles.dot} />
              <Text style={styles.footerLink}>Conditions</Text>
              <View style={styles.dot} />
              <Text style={styles.footerLink}>Confidentialité</Text>
           </View>
        </View>

        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000' },
  scroll: { padding: 24, paddingTop: 60 },
  header: { alignItems: 'flex-end', marginBottom: 20 },
  closeBtn: { backgroundColor: 'rgba(255,255,255,0.05)', padding: 12, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  hero: { alignItems: 'center', marginBottom: 40 },
  iconGlow: { marginBottom: 24, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 20 }, shadowOpacity: 0.5, shadowRadius: 40, elevation: 12 },
  title: { fontSize: 44, fontWeight: '900', color: '#FFFFFF', marginBottom: 12 },
  subtitle: { fontSize: 18, color: 'rgba(255,255,255,0.4)', fontWeight: '700', textAlign: 'center' },
  card: { backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 44, padding: 32, borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.08)', marginBottom: 32 },
  cardHeader: { fontSize: 12, fontWeight: '900', color: '#A855F7', marginBottom: 24, letterSpacing: 2 },
  featureRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 18 },
  checkBg: { backgroundColor: '#A855F7', padding: 4, borderRadius: 8, marginRight: 16 },
  featureText: { fontSize: 17, color: '#FFFFFF', fontWeight: '800' },
  pricingContainer: { marginBottom: 32 },
  planCard: { backgroundColor: 'rgba(168, 85, 247, 0.1)', borderRadius: 44, padding: 36, borderWidth: 2, borderColor: '#A855F7', shadowColor: '#A855F7', shadowOffset: { width: 0, height: 15 }, shadowOpacity: 0.2, shadowRadius: 30, elevation: 6 },
  bestValueBadge: { position: 'absolute', top: -14, alignSelf: 'center', backgroundColor: '#A855F7', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 12 },
  bestValueText: { color: 'white', fontSize: 11, fontWeight: '900', letterSpacing: 1 },
  planTitle: { color: 'white', fontSize: 24, fontWeight: '900', marginBottom: 12 },
  priceRow: { flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 },
  price: { color: 'white', fontSize: 44, fontWeight: '900' },
  perMonth: { color: 'rgba(255,255,255,0.4)', fontSize: 18, fontWeight: '800', marginLeft: 6 },
  billingText: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '700', marginBottom: 32 },
  subscribeBtn: { backgroundColor: 'white', paddingVertical: 24, borderRadius: 32, alignItems: 'center', shadowColor: '#FFF', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 8 },
  subscribeBtnText: { color: '#000000', fontSize: 18, fontWeight: '900' },
  secondaryPlan: { backgroundColor: 'rgba(255,255,255,0.03)', padding: 28, borderRadius: 36, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.06)' },
  secondaryPlanTitle: { color: '#FFFFFF', fontSize: 17, fontWeight: '800' },
  secondaryPrice: { color: 'rgba(255,255,255,0.5)', fontSize: 17, fontWeight: '800' },
  footer: { alignItems: 'center' },
  footerText: { color: 'rgba(255,255,255,0.3)', fontSize: 12, textAlign: 'center', fontWeight: '600', marginBottom: 16 },
  footerLinks: { flexDirection: 'row', alignItems: 'center' },
  footerLink: { color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: '700' },
  dot: { width: 3, height: 3, borderRadius: 1.5, backgroundColor: 'rgba(255,255,255,0.2)', marginHorizontal: 12 }
});
