import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Animated } from 'react-native';
import { Send, Sparkles, User, Brain, ChevronLeft, Bot, MessageSquare, Info } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { useState, useRef, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Theme } from '@/constants/Theme';
import { BackgroundRefined } from '@/components/BackgroundRefined';

export default function AIAssist() {
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: '1', text: 'Bonjour Sarah ! Je suis votre assistant VetCare AI. Comment puis-je aider Buddy aujourd\'hui ?', sender: 'ai' },
  ]);
  const [input, setInput] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 800, useNativeDriver: true }).start();
  }, [fadeAnim]);

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages([...messages, userMsg]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      const aiMsg = { 
        id: (Date.now() + 1).toString(), 
        text: "J'analyse votre demande via nos protocoles médicaux. Un instant s'il vous plaît...", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BackgroundRefined />
      
      <Animated.View style={[styles.flex, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ChevronLeft color="#FFF" size={24} />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
             <Sparkles color={Theme.colors.primary} size={18} fill={Theme.colors.primary} />
             <Text style={styles.headerTitle}>VetCare AI</Text>
          </View>
          <TouchableOpacity style={styles.infoBtn}>
             <Info color="rgba(255,255,255,0.4)" size={20} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.chatArea} contentContainerStyle={{ padding: 20 }}>
          {messages.map(m => (
            <View key={m.id} style={[styles.msgWrapper, m.sender === 'user' ? styles.msgUser : styles.msgAI]}>
              {m.sender === 'ai' && (
                <View style={styles.aiAvatar}>
                  <Bot color={Theme.colors.primary} size={16} />
                </View>
              )}
              <View style={[styles.msgBubble, m.sender === 'user' ? styles.bubbleUser : styles.bubbleAI]}>
                <Text style={styles.msgText}>{m.text}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} keyboardVerticalOffset={100}>
          <View style={styles.inputArea}>
             <View style={styles.inputGlass}>
                <TextInput 
                  style={styles.input} 
                  value={input} 
                  onChangeText={setInput} 
                  placeholder="Posez une question sur la santé..." 
                  placeholderTextColor="rgba(255,255,255,0.3)" 
                />
                <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
                   <LinearGradient colors={Theme.colors.gradients.primary as any} style={styles.sendGrad}>
                      <Send color="#FFF" size={18} />
                   </LinearGradient>
                </TouchableOpacity>
             </View>
          </View>
        </KeyboardAvoidingView>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Theme.colors.background },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: 'rgba(255,255,255,0.05)' },
  backBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.05)', alignItems: 'center', justifyContent: 'center' },
  headerTitleContainer: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: '900', marginLeft: 10, letterSpacing: -0.5 },
  infoBtn: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },

  chatArea: { flex: 1 },
  msgWrapper: { flexDirection: 'row', marginBottom: 24, maxWidth: '85%' },
  msgUser: { alignSelf: 'flex-end', flexDirection: 'row-reverse' },
  msgAI: { alignSelf: 'flex-start' },
  aiAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: Theme.colors.primary + '20', alignItems: 'center', justifyContent: 'center', marginRight: 12, borderWidth: 1, borderColor: Theme.colors.primary + '40' },
  msgBubble: { padding: 18, borderRadius: 24 },
  bubbleUser: { backgroundColor: Theme.colors.primary, borderBottomRightRadius: 4 },
  bubbleAI: { backgroundColor: 'rgba(255,255,255,0.06)', borderBottomLeftRadius: 4, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  msgText: { color: '#FFF', fontSize: 15, lineHeight: 22, fontWeight: '600' },

  inputArea: { padding: 20, paddingBottom: Platform.OS === 'ios' ? 20 : 30 },
  inputGlass: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 30, paddingLeft: 24, paddingRight: 8, paddingVertical: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  input: { flex: 1, color: '#FFF', fontSize: 15, fontWeight: '600', height: 44 },
  sendBtn: { borderRadius: 22, overflow: 'hidden' },
  sendGrad: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
});
