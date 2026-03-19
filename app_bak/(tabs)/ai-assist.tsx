import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useState } from 'react';
import { MotiView, AnimatePresence } from 'moti';
import { BrainCircuit, Lock, Sparkles, Send, Stethoscope } from 'lucide-react-native';
import { useRouter } from 'expo-router';

export default function AIAssistScreen() {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const router = useRouter();

  const handleMockAnalysis = () => {
    if (!query) return;
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult("D'après les symptômes décrits (perte d'appétit, léthargie), cela pourrait être lié à une légère déshydratation ou un changement alimentaire. Surveillez Buddy de près. Si les symptômes persistent plus de 24h, consultez un vétérinaire. (Ceci est une simulation)");
    }, 2000);
  };

  return (
    <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingTop: 80, paddingHorizontal: 24, paddingBottom: 40 }}>
      <MotiView 
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
      >
        <View className="items-center mb-8">
            <View className="bg-primary/10 p-6 rounded-full border border-primary/20 mb-6">
               <BrainCircuit color="#6D28D9" size={48} />
            </View>
            <Text className="text-3xl font-black text-center text-gray-900 mb-2">VetAI Assistant</Text>
            <Text className="text-gray-500 font-medium text-center">Pré-diagnostic intelligent 24/7</Text>
        </View>

        <View className="bg-gray-50 p-6 rounded-3xl border border-gray-100 mb-8">
           <Text className="text-gray-800 font-bold mb-4">Décrivez les symptômes :</Text>
           <TextInput
             multiline
             numberOfLines={4}
             className="bg-white p-4 rounded-2xl text-gray-700 border border-gray-100 mb-4 h-32"
             placeholder="Ex: Mon chien ne mange plus et semble fatigué..."
             value={query}
             onChangeText={setQuery}
           />
           <TouchableOpacity 
             onPress={handleMockAnalysis}
             disabled={isAnalyzing || !query}
             className={`p-4 rounded-2xl items-center justify-center flex-row ${isAnalyzing || !query ? 'bg-gray-200' : 'bg-primary'}`}
           >
             {isAnalyzing ? (
                <Text className="text-gray-400 font-bold">Analyse en cours...</Text>
             ) : (
                <>
                  <Send color="white" size={18} className="mr-2" />
                  <Text className="text-white font-bold ml-2">Analyser maintenant (Démo)</Text>
                </>
             )}
           </TouchableOpacity>
        </View>

        <AnimatePresence>
          {result && (
            <MotiView
               from={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="bg-secondary/5 p-6 rounded-3xl border border-secondary/20 mb-8"
            >
               <View className="flex-row items-center mb-3">
                  <Stethoscope color="#10B981" size={20} className="mr-2" />
                  <Text className="text-secondary font-bold ml-2">CONSEIL VET-AI</Text>
               </View>
               <Text className="text-gray-700 leading-relaxed">{result}</Text>
            </MotiView>
          )}
        </AnimatePresence>

        {/* Premium Upsell Hook */}
        <TouchableOpacity 
          onPress={() => router.push('/paywall')}
          className="bg-gray-900 p-8 rounded-[40px] items-center overflow-hidden relative"
        >
          <View className="absolute -top-10 -right-10 bg-primary/20 w-32 h-32 rounded-full" />
          <Lock color="white" size={24} className="mb-4" />
          <Text className="text-white font-black text-xl text-center mb-2">Débloquez l'IA Complète</Text>
          <Text className="text-gray-400 text-center text-sm mb-6">Précision chirurgicale et historique illimité.</Text>
          <View className="bg-primary px-6 py-2 rounded-full">
             <Text className="text-white font-bold">Passer à Premium</Text>
          </View>
        </TouchableOpacity>

      </MotiView>
    </ScrollView>
  );
}
