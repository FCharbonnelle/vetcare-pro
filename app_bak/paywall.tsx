import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, StyleSheet, Image, Dimensions } from 'react-native';
import { Sparkles, CheckCircle2, ShieldCheck, X } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const features = [
  { title: 'AI Vet Assistant 🤖', desc: 'Instant emergency triage advice 24/7' },
  { title: 'Smart Health Record 📄', desc: 'OCR scan your invoices & prescriptions' },
  { title: 'Unlimited Pets 🐾', desc: 'Add all your companions in one place' },
  { title: 'Smart Notifications 🔔', desc: 'Vaccine & deworming predictive alerts' },
];

export default function Paywall() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()}
        style={styles.closeBtn}
      >
        <X color="#374151" size={24} />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.hero}>
          <View style={styles.iconBg}>
             <Sparkles color="#6D28D9" size={48} />
          </View>
          <Text style={styles.title}>Upgrade to Pro</Text>
          <Text style={styles.subtitle}>Unlock the full power of your pet's healthcare.</Text>
        </View>

        <View style={styles.featureList}>
          {features.map((f, i) => (
            <View key={i} style={styles.featureRow}>
              <CheckCircle2 color="#10B981" size={24} style={styles.checkIcon} />
              <View style={styles.featureText}>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.pricing}>
          <TouchableOpacity style={[styles.priceCard, styles.priceCardActive]}>
             <View style={styles.badge}><Text style={styles.badgeText}>Best Value</Text></View>
             <View style={styles.row}>
                <View>
                   <Text style={styles.planTitle}>Yearly Access</Text>
                   <Text style={styles.planSub}>Save 45%</Text>
                </View>
                <View style={styles.alignEnd}>
                   <Text style={[styles.planPrice, { color: '#6D28D9' }]}>$49.99</Text>
                   <Text style={styles.planUnit}>/ year</Text>
                </View>
             </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.priceCard}>
             <View style={styles.row}>
                <View>
                   <Text style={styles.planTitle}>Monthly Access</Text>
                   <Text style={styles.planSub}>Flexible plan</Text>
                </View>
                <View style={styles.alignEnd}>
                   <Text style={styles.planPrice}>$7.99</Text>
                   <Text style={styles.planUnit}>/ month</Text>
                </View>
             </View>
          </TouchableOpacity>
        </View>

        <View style={styles.proofRow}>
          <ShieldCheck color="#9CA3AF" size={16} />
          <Text style={styles.proofText}>Safe & Secure Payment via RevenueCat</Text>
        </View>

        <TouchableOpacity style={styles.payBtn}>
           <Text style={styles.payBtnText}>Start 7-Day Free Trial</Text>
        </TouchableOpacity>

        <Text style={styles.disclaimer}>
          By subscribing, you agree to our Terms of Use and Privacy Policy. Subscriptions automatically renew unless cancelled 24h before the end of the period.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  closeBtn: { position: 'absolute', top: 60, left: 24, zIndex: 10, height: 40, width: 40, borderRadius: 20, backgroundColor: '#F3F4F6', alignItems: 'center', justifyContent: 'center' },
  scroll: { padding: 32, paddingTop: 120 },
  hero: { itemsAlignment: 'center', marginBottom: 40 },
  iconBg: { backgroundColor: '#F5F3FF', padding: 24, borderRadius: 40, marginBottom: 24, alignSelf: 'center' },
  title: { fontSize: 36, fontWeight: '900', color: '#111827', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 18, color: '#6B7280', textAlign: 'center', fontWeight: '500' },
  featureList: { marginBottom: 48 },
  featureRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 24, borderRadius: 32, marginBottom: 16, borderSize: 1, borderWidth: 1, borderColor: '#F3F4F6' },
  checkIcon: { marginRight: 16 },
  featureText: { flex: 1 },
  featureTitle: { fontSize: 18, fontWeight: '800', color: '#111827', marginBottom: 2 },
  featureDesc: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  pricing: { marginBottom: 32 },
  priceCard: { backgroundColor: '#F9FAFB', padding: 24, borderRadius: 32, marginBottom: 16, borderSize: 2, borderWidth: 2, borderColor: 'transparent' },
  priceCardActive: { borderColor: '#6D28D9', backgroundColor: '#FFFFFF' },
  badge: { position: 'absolute', top: 0, right: 0, backgroundColor: '#6D28D9', paddingHorizontal: 12, paddingVertical: 4, borderBottomLeftRadius: 16 },
  badgeText: { color: '#FFFFFF', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  planTitle: { fontSize: 20, fontWeight: '900', color: '#111827' },
  planSub: { fontSize: 12, fontWeight: '700', color: '#9CA3AF', textTransform: 'uppercase', marginTop: 4 },
  alignEnd: { alignItems: 'flex-end' },
  planPrice: { fontSize: 28, fontWeight: '900', color: '#111827' },
  planUnit: { fontSize: 12, fontWeight: '600', color: '#9CA3AF' },
  proofRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 32, opacity: 0.5 },
  proofText: { color: '#6B7280', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', marginLeft: 8 },
  payBtn: { backgroundColor: '#6D28D9', padding: 24, borderRadius: 32, alignItems: 'center', shadowColor: '#6D28D9', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10, marginBottom: 24 },
  payBtnText: { color: '#FFFFFF', fontSize: 20, fontWeight: '900' },
  disclaimer: { color: '#9CA3AF', fontSize: 10, textAlign: 'center', lineHeight: 16, paddingHorizontal: 24, marginBottom: 40 }
});
