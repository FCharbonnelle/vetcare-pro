import { View, Text, ScrollView, TouchableOpacity, StyleSheet, SafeAreaView, Animated, Linking, Platform, ActivityIndicator } from 'react-native';
import { MapPin, Navigation, Star, Phone, Globe, Thermometer, Droplets, Wind, AlertTriangle, ExternalLink, Heart } from 'lucide-react-native';
import { useRef, useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

// Static vet data (in production: query real API with geolocation)
const VETS = [
  { id: '1', name: 'Happy Paws Clinic', rating: 4.9, dist: '1.2 km', address: '12 Rue des Lilas, Paris', phone: '+33 1 23 45 67 89', open: true, speciality: 'Médecine générale', lat: 48.8566, lng: 2.3522 },
  { id: '2', name: 'City Vet Hospital', rating: 4.7, dist: '2.5 km', address: '45 Boulevard Haussmann, Paris', phone: '+33 1 98 76 54 32', open: true, speciality: 'Urgences 24h/24', lat: 48.8737, lng: 2.3264 },
  { id: '3', name: 'Pet Wellness Center', rating: 4.8, dist: '0.8 km', address: '7 Rue du Faubourg, Paris', phone: '+33 1 11 22 33 44', open: false, speciality: 'Chirurgie & Dentaire', lat: 48.8606, lng: 2.3376 },
  { id: '4', name: 'Clinique Animale du Marais', rating: 4.6, dist: '3.1 km', address: '28 Rue de la Roquette, Paris', phone: '+33 1 55 66 77 88', open: true, speciality: 'Exotiques & NAC', lat: 48.8553, lng: 2.3720 },
];

// Open-Meteo free API (no key needed)
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=48.8566&longitude=2.3522&current=temperature_2m,weathercode,windspeed_10m,relativehumidity_2m&timezone=Europe%2FParis';

const WMO_CODES: Record<number, { label: string; icon: string }> = {
  0: { label: 'Ciel dégagé', icon: '☀️' },
  1: { label: 'Peu nuageux', icon: '🌤️' },
  2: { label: 'Partiellement nuageux', icon: '⛅' },
  3: { label: 'Couvert', icon: '☁️' },
  45: { label: 'Brouillard', icon: '🌫️' },
  61: { label: 'Pluie légère', icon: '🌧️' },
  63: { label: 'Pluie modérée', icon: '🌧️' },
  80: { label: 'Averses', icon: '🌦️' },
  95: { label: 'Orage', icon: '⛈️' },
};

function getWeatherInfo(code: number) {
  return WMO_CODES[code] ?? { label: 'Variable', icon: '🌡️' };
}

function openInMaps(name: string, lat: number, lng: number) {
  const query = encodeURIComponent(`${name} ${lat},${lng}`);
  const url = Platform.OS === 'ios'
    ? `maps://?q=${query}&ll=${lat},${lng}`
    : `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  Linking.openURL(url);
}

export default function MapScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [weather, setWeather] = useState<any>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [selectedVet, setSelectedVet] = useState<string | null>(null);

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
    fetchWeather();
  }, []);

  const fetchWeather = async () => {
    try {
      const res = await fetch(WEATHER_API);
      const data = await res.json();
      setWeather(data.current);
    } catch (e) {
      console.log('Weather fetch failed', e);
    } finally {
      setWeatherLoading(false);
    }
  };

  const temp = weather?.temperature_2m ?? null;
  const humidity = weather?.relativehumidity_2m ?? null;
  const wind = weather?.windspeed_10m ?? null;
  const wCode = weather?.weathercode ?? 0;
  const { label: weatherLabel, icon: weatherIcon } = getWeatherInfo(wCode);
  const isHot = temp !== null && temp >= 25;
  const isVeryHot = temp !== null && temp >= 30;

  const openWeatherApp = () => {
    Linking.openURL('https://www.meteofrance.com');
  };

  const openGoogleMaps = () => {
    Linking.openURL('https://www.google.com/maps/search/vétérinaire+près+de+moi/');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1A0A3E', '#0E0824', '#000']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />
      <View style={styles.orb1} /><View style={styles.orb2} />

      <Animated.ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.scroll, { opacity: fadeAnim }]}>

        <View style={styles.header}>
          <View>
            <Text style={styles.headerSub}>GÉOLOCALISATION</Text>
            <Text style={styles.headerTitle}>Carte & Météo 🗺️</Text>
          </View>
          <TouchableOpacity style={styles.openMapBtn} onPress={openGoogleMaps}>
            <Navigation color="#A855F7" size={22} />
            <Text style={styles.openMapText}>Ouvrir Maps</Text>
          </TouchableOpacity>
        </View>

        {/* WEATHER CARD */}
        {isVeryHot && (
          <TouchableOpacity style={styles.alertCard} onPress={openWeatherApp}>
            <AlertTriangle color="#F59E0B" size={28} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.alertTitle}>🌡️ Chaleur Extrême ! Hydratez {'\u2764\ufe0f'}</Text>
              <Text style={styles.alertSub}>Température &gt; 30°C • Donnez de l'eau fraîche toutes les 2h. Évitez les sorties entre 12h-16h.</Text>
            </View>
          </TouchableOpacity>
        )}

        {isHot && !isVeryHot && (
          <TouchableOpacity style={styles.warnCard} onPress={openWeatherApp}>
            <Droplets color="#3B82F6" size={24} />
            <View style={{ flex: 1, marginLeft: 16 }}>
              <Text style={styles.warnTitle}>💧 Pensez à l'hydratation !</Text>
              <Text style={styles.warnSub}>{temp}°C • Vérifiez que votre animal a toujours de l'eau fraîche disponible.</Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.weatherCard} onPress={openWeatherApp} activeOpacity={0.85}>
          <LinearGradient colors={['rgba(168,85,247,0.15)', 'rgba(124,58,237,0.08)']} style={styles.weatherGradient}>
            <View style={styles.weatherTop}>
              <View>
                <Text style={styles.weatherCity}>Paris, France</Text>
                <Text style={styles.weatherDesc}>{weatherLoading ? 'Chargement...' : weatherLabel}</Text>
              </View>
              <View style={styles.weatherTempRow}>
                {weatherLoading ? <ActivityIndicator color="#A855F7" /> : (
                  <>
                    <Text style={styles.weatherIcon}>{weatherIcon}</Text>
                    <Text style={[styles.weatherTemp, isVeryHot && { color: '#EF4444' }, isHot && !isVeryHot && { color: '#F59E0B' }]}>
                      {temp !== null ? `${Math.round(temp)}°` : '--°'}
                    </Text>
                  </>
                )}
              </View>
            </View>
            <View style={styles.weatherStats}>
              <View style={styles.weatherStat}>
                <Droplets color="#3B82F6" size={16} />
                <Text style={styles.weatherStatText}>{humidity ?? '--'}%</Text>
                <Text style={styles.weatherStatLabel}>Humidité</Text>
              </View>
              <View style={styles.weatherDivider} />
              <View style={styles.weatherStat}>
                <Wind color="#10B981" size={16} />
                <Text style={styles.weatherStatText}>{wind ?? '--'} km/h</Text>
                <Text style={styles.weatherStatLabel}>Vent</Text>
              </View>
              <View style={styles.weatherDivider} />
              <View style={styles.weatherStat}>
                <Thermometer color={isHot ? '#F59E0B' : '#A855F7'} size={16} />
                <Text style={[styles.weatherStatText, isHot && { color: '#F59E0B' }]}>
                  {isVeryHot ? 'Danger' : isHot ? 'Chaud' : 'Idéal'}
                </Text>
                <Text style={styles.weatherStatLabel}>Pour animal</Text>
              </View>
            </View>
            <View style={styles.weatherLink}>
              <ExternalLink color="rgba(255,255,255,0.3)" size={14} />
              <Text style={styles.weatherLinkText}>Voir sur Météo France</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Hydration advice */}
        <View style={styles.hydrationCard}>
          <Text style={styles.hydrationTitle}>💧 Guide d'hydratation</Text>
          <View style={styles.hydrationRow}>
            <View style={[styles.thermoBg, { backgroundColor: temp && temp < 20 ? 'rgba(59,130,246,0.15)' : temp && temp < 28 ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' }]}>
              <Text style={styles.thermoText}>{temp !== null ? `${Math.round(temp)}°C` : '--°C'}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              {temp === null && <Text style={styles.hydrationAdvice}>Vérifiez l'hydratation régulièrement.</Text>}
              {temp !== null && temp < 20 && <Text style={styles.hydrationAdvice}>Conditions fraîches 🥶 • Eau à disposition, portions normales.</Text>}
              {temp !== null && temp >= 20 && temp < 25 && <Text style={styles.hydrationAdvice}>Conditions normales 😊 • 1 à 2 bols d'eau fraîche / jour.</Text>}
              {temp !== null && temp >= 25 && temp < 30 && <Text style={styles.hydrationAdvice}>Chaud 🌞 • Eau fraîche toutes les 3h. Évitez les efforts.</Text>}
              {temp !== null && temp >= 30 && <Text style={styles.hydrationAdvice}>Très chaud 🔥 • Eau fraîche toutes les 2h ! Refroidir les pattes. Consulter si léthargie.</Text>}
            </View>
          </View>
        </View>

        {/* Map placeholder + Open Maps button */}
        <TouchableOpacity style={styles.mapPlaceholder} onPress={openGoogleMaps} activeOpacity={0.85}>
          <LinearGradient colors={['rgba(168,85,247,0.08)', 'rgba(14,8,36,0.9)']} style={styles.mapOverlay}>
            {/* Fake map grid */}
            {[...Array(6)].map((_, r) => (
              <View key={r} style={styles.mapRow}>
                {[...Array(5)].map((_, c) => (
                  <View key={c} style={[styles.mapCell, (r + c) % 3 === 0 && styles.mapCellDark]} />
                ))}
              </View>
            ))}
            <View style={styles.mapCenterContent}>
              <View style={styles.mapPinGlow}><MapPin color="white" size={32} /></View>
              <Text style={styles.mapCenterText}>Vétérinaires à proximité</Text>
              <Text style={styles.mapCenterSub}>Appuyez pour ouvrir Google Maps</Text>
              <View style={styles.mapOpenBtn}>
                <Navigation color="white" size={18} />
                <Text style={styles.mapOpenText}>Ouvrir la carte</Text>
              </View>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Vétérinaires recommandés</Text>

        {VETS.map(vet => (
          <TouchableOpacity
            key={vet.id}
            style={[styles.vetCard, selectedVet === vet.id && styles.vetCardSelected]}
            onPress={() => setSelectedVet(vet.id === selectedVet ? null : vet.id)}
          >
            <View style={styles.vetRow}>
              <View style={styles.vetIconBg}>
                <Heart color="#A855F7" size={24} fill="rgba(168,85,247,0.3)" />
              </View>
              <View style={{ flex: 1, marginLeft: 16 }}>
                <Text style={styles.vetName}>{vet.name}</Text>
                <Text style={styles.vetSpeciality}>{vet.speciality}</Text>
                <View style={styles.vetMeta}>
                  <Star color="#F59E0B" size={14} fill="#F59E0B" />
                  <Text style={styles.vetRating}>{vet.rating}</Text>
                  <MapPin color="rgba(255,255,255,0.3)" size={12} style={{ marginLeft: 12 }} />
                  <Text style={styles.vetDist}>{vet.dist}</Text>
                  <View style={[styles.openBadge, { backgroundColor: vet.open ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)' }]}>
                    <Text style={[styles.openText, { color: vet.open ? '#10B981' : '#EF4444' }]}>{vet.open ? 'Ouvert' : 'Fermé'}</Text>
                  </View>
                </View>
              </View>
            </View>

            {selectedVet === vet.id && (
              <View style={styles.vetExpanded}>
                <Text style={styles.vetAddress}>📍 {vet.address}</Text>
                <View style={styles.vetActions}>
                  <TouchableOpacity style={styles.vetActionBtn} onPress={() => Linking.openURL(`tel:${vet.phone}`)}>
                    <Phone color="#A855F7" size={18} />
                    <Text style={styles.vetActionText}>Appeler</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.vetActionBtn} onPress={() => openInMaps(vet.name, vet.lat, vet.lng)}>
                    <Navigation color="#10B981" size={18} />
                    <Text style={[styles.vetActionText, { color: '#10B981' }]}>Itinéraire</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </TouchableOpacity>
        ))}

        <View style={{ height: 120 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  scroll: { padding: 24, paddingTop: 60 },
  orb1: { position: 'absolute', width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(168,85,247,0.1)', top: -100, right: -80 },
  orb2: { position: 'absolute', width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(59,130,246,0.06)', bottom: 100, left: -50 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  headerSub: { color: 'rgba(168,85,247,0.7)', fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  headerTitle: { color: '#fff', fontSize: 34, fontWeight: '900', marginTop: 4 },
  openMapBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(168,85,247,0.15)', paddingHorizontal: 16, paddingVertical: 12, borderRadius: 18, borderWidth: 1, borderColor: 'rgba(168,85,247,0.3)' },
  openMapText: { color: '#A855F7', fontSize: 13, fontWeight: '900', marginLeft: 8 },
  alertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(239,68,68,0.12)', padding: 20, borderRadius: 28, marginBottom: 20, borderWidth: 1.5, borderColor: 'rgba(239,68,68,0.3)' },
  alertTitle: { color: '#EF4444', fontSize: 16, fontWeight: '900', marginBottom: 4 },
  alertSub: { color: 'rgba(255,255,255,0.5)', fontSize: 13, fontWeight: '600', lineHeight: 20 },
  warnCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(59,130,246,0.10)', padding: 20, borderRadius: 28, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(59,130,246,0.25)' },
  warnTitle: { color: '#3B82F6', fontSize: 16, fontWeight: '900', marginBottom: 4 },
  warnSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600' },
  weatherCard: { borderRadius: 40, overflow: 'hidden', marginBottom: 24, borderWidth: 1.5, borderColor: 'rgba(168,85,247,0.2)' },
  weatherGradient: { padding: 28 },
  weatherTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  weatherCity: { color: '#fff', fontSize: 22, fontWeight: '900' },
  weatherDesc: { color: 'rgba(255,255,255,0.4)', fontSize: 14, fontWeight: '700', marginTop: 4 },
  weatherTempRow: { flexDirection: 'row', alignItems: 'center' },
  weatherIcon: { fontSize: 40, marginRight: 8 },
  weatherTemp: { fontSize: 56, fontWeight: '900', color: '#fff' },
  weatherStats: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.08)' },
  weatherStat: { alignItems: 'center' },
  weatherStatText: { color: '#fff', fontSize: 15, fontWeight: '900', marginTop: 6 },
  weatherStatLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 11, fontWeight: '700', marginTop: 2 },
  weatherDivider: { width: 1, height: 40, backgroundColor: 'rgba(255,255,255,0.08)' },
  weatherLink: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 16 },
  weatherLinkText: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '700', marginLeft: 6 },
  hydrationCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 32, padding: 24, marginBottom: 32, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  hydrationTitle: { color: '#fff', fontSize: 17, fontWeight: '900', marginBottom: 16 },
  hydrationRow: { flexDirection: 'row', alignItems: 'center' },
  thermoBg: { padding: 16, borderRadius: 20 },
  thermoText: { color: '#fff', fontWeight: '900', fontSize: 18 },
  hydrationAdvice: { color: 'rgba(255,255,255,0.6)', fontSize: 14, fontWeight: '700', lineHeight: 22 },
  mapPlaceholder: { height: 220, borderRadius: 40, overflow: 'hidden', marginBottom: 32, borderWidth: 1.5, borderColor: 'rgba(168,85,247,0.15)' },
  mapOverlay: { flex: 1 },
  mapRow: { flex: 1, flexDirection: 'row' },
  mapCell: { flex: 1, backgroundColor: 'rgba(255,255,255,0.01)', borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.04)' },
  mapCellDark: { backgroundColor: 'rgba(168,85,247,0.03)' },
  mapCenterContent: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
  mapPinGlow: { backgroundColor: '#A855F7', padding: 16, borderRadius: 28, marginBottom: 16, shadowColor: '#A855F7', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.6, shadowRadius: 20 },
  mapCenterText: { color: '#fff', fontSize: 18, fontWeight: '900', marginBottom: 6 },
  mapCenterSub: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600', marginBottom: 20 },
  mapOpenBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#A855F7', paddingHorizontal: 24, paddingVertical: 14, borderRadius: 20 },
  mapOpenText: { color: 'white', fontWeight: '900', fontSize: 14, marginLeft: 10 },
  sectionTitle: { color: '#fff', fontSize: 20, fontWeight: '900', marginBottom: 20 },
  vetCard: { backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: 32, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.07)' },
  vetCardSelected: { borderColor: '#A855F7', backgroundColor: 'rgba(168,85,247,0.07)' },
  vetRow: { flexDirection: 'row', alignItems: 'center' },
  vetIconBg: { backgroundColor: 'rgba(168,85,247,0.12)', padding: 14, borderRadius: 20 },
  vetName: { color: '#fff', fontSize: 16, fontWeight: '900' },
  vetSpeciality: { color: 'rgba(255,255,255,0.4)', fontSize: 13, fontWeight: '600', marginTop: 2 },
  vetMeta: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  vetRating: { color: '#F59E0B', fontSize: 13, fontWeight: '800', marginLeft: 5 },
  vetDist: { color: 'rgba(255,255,255,0.3)', fontSize: 12, fontWeight: '700', marginLeft: 4 },
  openBadge: { marginLeft: 12, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  openText: { fontSize: 11, fontWeight: '900' },
  vetExpanded: { marginTop: 20, paddingTop: 20, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.07)' },
  vetAddress: { color: 'rgba(255,255,255,0.5)', fontSize: 14, fontWeight: '600', marginBottom: 16 },
  vetActions: { flexDirection: 'row' },
  vetActionBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', paddingHorizontal: 20, paddingVertical: 12, borderRadius: 16, marginRight: 12 },
  vetActionText: { color: '#A855F7', fontSize: 14, fontWeight: '800', marginLeft: 8 },
});
