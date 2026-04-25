import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LucideIcon } from 'lucide-react-native';

interface NotifItemProps {
  icon: LucideIcon;
  title: string;
  time: string;
  color: string;
}

export const NotifItem: React.FC<NotifItemProps> = React.memo(({ icon: Icon, title, time, color }) => {
  return (
    <View style={styles.notifItem}>
      <View style={[styles.notifIcon, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
        <Icon color={color} size={18} />
      </View>
      <View style={{ flex: 1, marginLeft: 16 }}>
        <Text style={styles.notifTitle}>{title}</Text>
        <Text style={styles.notifTime}>{time}</Text>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  notifItem: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 16, 
    borderBottomWidth: 1, 
    borderBottomColor: 'rgba(255,255,255,0.05)' 
  },
  notifIcon: { padding: 10, borderRadius: 14, borderWidth: 1 },
  notifTitle: { color: '#fff', fontSize: 15, fontWeight: '700' },
  notifTime: { 
    color: 'rgba(255,255,255,0.4)', 
    fontSize: 12, 
    fontWeight: '600', 
    marginTop: 2 
  },
});
