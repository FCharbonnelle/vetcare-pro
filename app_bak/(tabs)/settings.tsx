import { View, Text, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import { MotiView } from 'moti';
import { User, Bell, Shield, HelpCircle, LogOut, ChevronRight, Sparkles, CreditCard, Share2 } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/store/AuthContext';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [notifications, setNotifications] = useState(true);

  const menuGroups = [
    {
      title: 'Preferences',
      items: [
        { icon: Bell, label: 'Notifications', type: 'switch', value: notifications, onValueChange: setNotifications },
        { icon: Shield, label: 'Privacy & Security', type: 'link' },
      ]
    },
    {
      title: 'Support',
      items: [
        { icon: HelpCircle, label: 'Help Center', type: 'link' },
        { icon: Share2, label: 'Invite Family', type: 'link' },
      ]
    }
  ];

  return (
    <ScrollView className="flex-1 bg-gray-50 pt-20">
      <View className="px-6 pb-24">
        {/* Profile Header */}
        <MotiView 
          from={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="items-center mb-10"
        >
          <View className="relative">
            <Image 
              source={{ uri: user?.user_metadata?.avatar_url }} 
              className="h-24 w-24 rounded-full border-4 border-white shadow-lg"
            />
            <View className="absolute bottom-0 right-0 bg-secondary p-2 rounded-full border-4 border-white">
               <User color="white" size={14} />
            </View>
          </View>
          <Text className="text-2xl font-black text-gray-900 mt-4">{user?.user_metadata?.full_name}</Text>
          <Text className="text-gray-400 font-medium">{user?.email}</Text>
        </MotiView>

        {/* Subscription Card */}
        <TouchableOpacity 
          onPress={() => router.push('/paywall')}
          className="bg-primary p-6 rounded-[32px] shadow-xl shadow-primary/20 mb-8 flex-row items-center overflow-hidden relative"
        >
          <View className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-10 -mt-10" />
          <View className="bg-white/20 p-4 rounded-2xl mr-4 border border-white/30 backdrop-blur-md">
             <Sparkles color="white" size={24} />
          </View>
          <View className="flex-1">
             <Text className="text-white font-black text-lg">VetCare Pro</Text>
             <Text className="text-white/70 font-bold text-xs uppercase tracking-widest">Free Plan</Text>
          </View>
          <TouchableOpacity 
            onPress={() => router.push('/paywall')}
            className="bg-white px-4 py-2 rounded-xl"
          >
             <Text className="text-primary font-black text-xs uppercase tracking-widest">Upgrade</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        {/* Menu Groups */}
        {menuGroups.map((group, gIdx) => (
          <View key={gIdx} className="mb-8">
            <Text className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-4 ml-2">{group.title}</Text>
            <View className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
               {group.items.map((item, iIdx) => (
                 <View key={iIdx} className={`px-6 py-5 flex-row items-center justify-between ${iIdx < group.items.length - 1 ? 'border-b border-gray-50' : ''}`}>
                   <View className="flex-row items-center">
                      <View className="bg-gray-50 p-3 rounded-2xl mr-4">
                         <item.icon color="#64748B" size={20} />
                      </View>
                      <Text className="text-gray-900 font-bold">{item.label}</Text>
                   </View>
                   
                   {item.type === 'switch' ? (
                     <Switch 
                        value={item.value as boolean} 
                        onValueChange={item.onValueChange as (v: boolean) => void}
                        trackColor={{ true: '#6D28D9', false: '#CBD5E1' }}
                        thumbColor="white"
                     />
                   ) : (
                     <ChevronRight color="#CBD5E1" size={20} />
                   )}
                 </View>
               ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity className="flex-row items-center justify-center p-6 bg-red-50 rounded-3xl border border-red-100 mt-4">
           <LogOut color="#EF4444" size={20} className="mr-3" />
           <Text className="text-red-500 font-black text-lg ml-3">Log Out</Text>
        </TouchableOpacity>

        <Text className="text-center text-gray-300 font-bold text-[10px] tracking-widest uppercase mt-12">VetCare Pro v1.0.0 (MVP)</Text>

      </View>
    </ScrollView>
  );
}
