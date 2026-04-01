import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onPress: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = ({ icon: Icon, label, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.qaBtn} onPress={onPress}>
       <View style={[styles.qaIcon, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
          <Icon color={color} size={22} />
       </View>
       <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  qaBtn: { alignItems: 'center', flex: 1 },
  qaIcon: { 
    width: 65, 
    height: 65, 
    borderRadius: 26, 
    backgroundColor: 'rgba(21, 15, 43, 0.6)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 12, 
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 10
  },
  qaLabel: { 
    color: '#E7DEFF', 
    fontSize: 13, 
    fontWeight: '700',
    letterSpacing: 0.3
  },
});
