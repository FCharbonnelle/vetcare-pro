import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatPillProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

export const StatPill: React.FC<StatPillProps> = React.memo(({ icon: Icon, label, value }) => {
  return (
    <View style={styles.statPill}>
      <View style={styles.statIcon}><Icon color="#A855F7" size={14} /></View>
      <View>
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  statPill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255,255,255,0.04)', 
    paddingHorizontal: 12, 
    paddingVertical: 10, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: 'rgba(255,255,255,0.06)' 
  },
  statIcon: { marginRight: 10 },
  statLabel: { 
    color: 'rgba(255,255,255,0.4)', 
    fontSize: 10, 
    fontWeight: '800', 
    textTransform: 'uppercase' 
  },
  statValue: { 
    color: '#fff', 
    fontSize: 13, 
    fontWeight: '900', 
    marginTop: 1 
  },
});
