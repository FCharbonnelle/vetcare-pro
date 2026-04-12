import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Theme } from '@/constants/Theme';

interface StatPillProps {
  label: string;
  value: string;
  color: string;
}

export const StatPill: React.FC<StatPillProps> = ({ label, value, color }) => {
  return (
    <View style={styles.pill}>
      <View style={[styles.dot, { backgroundColor: color || Theme.colors.primary, shadowColor: color || Theme.colors.primary }]} />
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: 'rgba(255, 255, 255, 0.08)', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 16, 
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 12,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 8,
  },
  content: { justifyContent: 'center' },
  label: { 
    color: 'rgba(255, 255, 255, 0.6)', 
    fontSize: 9, 
    fontWeight: '900', 
    textTransform: 'uppercase', 
    letterSpacing: 1.5 
  },
  value: { 
    color: '#FFF', 
    fontSize: 17, 
    fontWeight: '900', 
    marginTop: 2,
  },
});
