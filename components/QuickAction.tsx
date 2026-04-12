import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';

interface QuickActionProps {
  icon: any;
  label: string;
  color: string;
  onPress: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon: Icon, label, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.actionItem} onPress={onPress}>
      <LinearGradient colors={[color + '30', 'rgba(255,255,255,0.02)']} style={styles.iconBg}>
         <Icon color={color} size={24} />
      </LinearGradient>
      <Text numberOfLines={1} style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionItem: { alignItems: 'center', flex: 1, marginHorizontal: 8 },
  iconBg: { 
    width: 64, 
    height: 64, 
    borderRadius: 32, 
    alignItems: 'center', 
    justifyContent: 'center', 
    marginBottom: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  label: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '800', textTransform: 'uppercase', letterSpacing: 1 },
});
