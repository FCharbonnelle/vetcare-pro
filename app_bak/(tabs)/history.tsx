import { View, Text, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { MotiView } from 'moti';
import { History, FileText, Camera, Lock, Search, Filter, ClipboardList } from 'lucide-react-native';
import { useRouter } from 'expo-router';

const records = [
  { id: '1', date: 'Oct 12, 2025', type: 'Vaccination', pet: 'Buddy', status: 'verified', premium: false },
  { id: '2', date: 'Sep 05, 2025', type: 'Annual Checkup', pet: 'Buddy', status: 'verified', premium: false },
  { id: '3', date: 'Aug 20, 2025', type: 'OCR Scan: Invoice', pet: 'Buddy', status: 'archived', premium: true },
  { id: '4', date: 'Jun 15, 2025', type: 'Heartworm Med', pet: 'Buddy', status: 'verified', premium: false },
];

export default function HistoryScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-gray-50 pt-20 px-6">
      <MotiView 
        from={{ opacity: 0, translateY: -10 }}
        animate={{ opacity: 1, translateY: 0 }}
        className="flex-row items-center justify-between mb-8"
      >
        <Text className="text-3xl font-black text-gray-900">Medical History</Text>
        <TouchableOpacity className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
          <Search color="#94A3B8" size={20} />
        </TouchableOpacity>
      </MotiView>

      {/* Filter Chips */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-grow-0 mb-8 -mx-6 px-6">
        {['All', 'Buddy', 'Invoices', 'Prescriptions', 'Vaccinations'].map((chip, idx) => (
          <TouchableOpacity 
            key={idx}
            className={`px-6 py-3 rounded-full mr-3 ${idx === 0 ? 'bg-primary' : 'bg-white border border-gray-100'}`}
          >
            <Text className={`font-bold ${idx === 0 ? 'text-white' : 'text-gray-400'}`}>{chip}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Scan Floating Action Hook */}
      <View className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 mb-10 flex-row items-center justify-between">
        <View className="flex-row items-center">
            <View className="bg-primary/10 p-4 rounded-2xl mr-4 border border-primary/20">
               <Camera color="#6D28D9" size={24} />
            </View>
            <View>
               <Text className="text-gray-900 font-bold">Smart OCR Scan</Text>
               <Text className="text-gray-400 text-xs mt-0.5">Automate your pet's journal</Text>
            </View>
        </View>
        <TouchableOpacity 
          onPress={() => router.push('/paywall')}
          className="bg-primary/5 px-4 py-2 rounded-xl border border-primary/20"
        >
          <Text className="text-primary font-bold text-xs uppercase tracking-widest">Go Pro</Text>
        </TouchableOpacity>
      </View>

      {/* Records List */}
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {records.map((record, i) => (
          <MotiView 
            key={record.id}
            from={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 50 }}
            className={`bg-white p-5 rounded-3xl border border-gray-100 mb-4 flex-row items-center ${record.premium ? 'opacity-60' : ''}`}
          >
            <View className={`p-4 rounded-2xl mr-4 ${record.premium ? 'bg-gray-100' : 'bg-secondary/10 border border-secondary/20'}`}>
              {record.premium ? <Lock color="#94A3B8" size={20} /> : <FileText color="#10B981" size={20} />}
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                 <Text className="text-gray-900 font-bold text-md">{record.type}</Text>
                 <Text className="text-gray-400 text-[10px] font-bold uppercase tracking-tighter">{record.date}</Text>
              </View>
              <View className="flex-row items-center mt-1">
                 <ClipboardList color="#94A3B8" size={12} className="mr-1" />
                 <Text className="text-gray-400 text-xs font-medium ml-1">{record.pet}</Text>
              </View>
            </View>
            {record.premium && (
               <TouchableOpacity 
                 onPress={() => router.push('/paywall')}
                 className="ml-3"
               >
                 <Text className="text-primary font-black text-[10px] bg-primary/10 px-2 py-1 rounded-md">UNLOCK</Text>
               </TouchableOpacity>
            )}
          </MotiView>
        ))}
        {/* Placeholder for empty state bottom spacing */}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
