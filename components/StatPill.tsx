import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface StatPillProps {
  icon: LucideIcon;
  label: string;
  value: string;
}

/**
 * StatPill component displaying a metric with an icon.
 * Optimized with React.memo to prevent unnecessary re-renders in the Dashboard.
 */
export const StatPill = React.memo<StatPillProps>(({ icon: Icon, label, value }) => {
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
    backgroundColor: 'rgba(21, 15, 43, 0.4)', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 24, 
    borderWidth: 1, 
    borderColor: 'rgba(255, 255, 255, 0.05)',
    flex: 1,
    marginHorizontal: 4
  },
  statIcon: { 
    marginRight: 12,
    backgroundColor: 'rgba(168, 85, 247, 0.1)',
    padding: 8,
    borderRadius: 12
  },
  statLabel: { 
    color: 'rgba(231, 222, 255, 0.5)', 
    fontSize: 9, 
    fontWeight: '700', 
    textTransform: 'uppercase',
    letterSpacing: 0.8
  },
  statValue: { 
    color: '#FFFFFF', 
    fontSize: 14, 
    fontWeight: '900', 
    marginTop: 2 
  },
});
