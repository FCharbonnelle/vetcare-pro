import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Check } from 'lucide-react-native';
import { Appointment, TYPE_OPTIONS } from '@/constants/AppConstants';
import { Theme } from '@/constants/Theme';
import { LinearGradient } from 'expo-linear-gradient';

interface ApptCardProps {
  item: Appointment;
}

export const ApptCard: React.FC<ApptCardProps> = ({ item }) => {
  const t = TYPE_OPTIONS.find(opt => opt.key === item.type) || TYPE_OPTIONS[0];
  const accentColor = t.color || Theme.colors.primary;

  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.cardContainer}>
      <LinearGradient colors={['rgba(255,255,255,0.08)', 'rgba(255,255,255,0.03)']} style={styles.apptCard}>
        <View style={[styles.iconContainer, { backgroundColor: accentColor + '15', borderColor: accentColor + '30' }]}>
          <t.icon color={accentColor} size={22} />
        </View>
        
        <View style={{ flex: 1, marginLeft: 16 }}>
          <Text style={styles.apptTitle}>{item.title}</Text>
          <Text style={styles.apptSub}>{item.vet || 'Clinique Générale'}</Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View style={styles.timeTag}>
            <Clock color={Theme.colors.primary} size={12} />
            <Text style={styles.timeText}>{item.time}</Text>
          </View>
          {item.done && (
            <View style={styles.doneChip}>
               <Check color={Theme.colors.secondary} size={10} strokeWidth={4} />
               <Text style={styles.doneText}>SCELLÉ</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: { marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15 },
  apptCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 20, 
    borderRadius: Theme.radius.xl, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.08)' 
  },
  iconContainer: { 
    width: 52,
    height: 52,
    borderRadius: 16, 
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  apptTitle: { color: '#FFF', fontSize: 16, fontWeight: '800' },
  apptSub: { 
    color: 'rgba(255,255,255,0.4)', 
    fontSize: 13, 
    fontWeight: '600', 
    marginTop: 4 
  },
  timeTag: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    paddingHorizontal: 12, 
    paddingVertical: 6, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.1)' 
  },
  timeText: { color: '#FFF', fontSize: 12, fontWeight: '800', marginLeft: 6 },
  doneChip: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8, 
    backgroundColor: 'rgba(94, 252, 232, 0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 4, 
    borderRadius: 8 
  },
  doneText: { 
    color: Theme.colors.secondary, 
    fontSize: 9, 
    fontWeight: '900', 
    marginLeft: 4, 
    letterSpacing: 1,
  },
});
