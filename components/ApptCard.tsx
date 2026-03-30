import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Clock, Check } from 'lucide-react-native';
import { Appointment, TYPE_OPTIONS } from '@/constants/AppConstants';

interface ApptCardProps {
  item: Appointment;
}

export const ApptCard: React.FC<ApptCardProps> = ({ item }) => {
  const t = TYPE_OPTIONS.find(opt => opt.key === item.type) ?? TYPE_OPTIONS[0];

  return (
    <TouchableOpacity style={styles.apptCard} activeOpacity={0.8}>
      <View style={[styles.apptIcon, { backgroundColor: `${t.color}15`, borderColor: `${t.color}30` }]}>
        <t.icon color={t.color} size={22} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.apptTitle}>{item.title}</Text>
        <Text style={styles.apptSub}>{item.vet}</Text>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <View style={styles.timeTag}>
          <Clock color="#A855F7" size={12} />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        {item.done && (
          <View style={styles.doneBadge}>
             <Check color="#10B981" size={10} strokeWidth={3} />
             <Text style={styles.doneText}>Fait</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  apptCard: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    padding: 20, 
    borderRadius: 32, 
    marginBottom: 16, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.08)' 
  },
  apptIcon: { padding: 14, borderRadius: 22, borderWidth: 1 },
  apptTitle: { color: '#fff', fontSize: 17, fontWeight: '800' },
  apptSub: { 
    color: 'rgba(255,255,255,0.4)', 
    fontSize: 13, 
    fontWeight: '600', 
    marginTop: 4 
  },
  timeTag: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(168,85,247,0.1)', 
    paddingHorizontal: 10, 
    paddingVertical: 6, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: 'rgba(168,85,247,0.1)' 
  },
  timeText: { color: '#A855F7', fontSize: 12, fontWeight: '900', marginLeft: 6 },
  doneBadge: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 8, 
    backgroundColor: 'rgba(16,185,129,0.1)', 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 10 
  },
  doneText: { 
    color: '#10B981', 
    fontSize: 10, 
    fontWeight: '900', 
    marginLeft: 4, 
    textTransform: 'uppercase' 
  },
});
