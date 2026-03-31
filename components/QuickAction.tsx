import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface QuickActionProps {
  icon: LucideIcon;
  label: string;
  color: string;
  onPress: () => void;
}

export const QuickAction: React.FC<QuickActionProps> = React.memo(({ icon: Icon, label, color, onPress }) => {
  return (
    <TouchableOpacity style={styles.qaBtn} onPress={onPress}>
       <View style={[styles.qaIcon, { backgroundColor: `${color}20`, borderColor: `${color}40` }]}>
          <Icon color={color} size={22} />
       </View>
       <Text style={styles.qaLabel}>{label}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  qaBtn: { alignItems: 'center', flex: 1 },
  qaIcon: { 
    width: 60, 
    height: 60, 
    borderRadius: 24, 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 10, 
    borderWidth: 1 
  },
  qaLabel: { 
    color: '#fff', 
    fontSize: 14, 
    fontWeight: '800' 
  },
});
