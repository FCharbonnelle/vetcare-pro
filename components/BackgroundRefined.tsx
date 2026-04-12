import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Defs, RadialGradient, Stop, Rect, Path } from 'react-native-svg';

const { width: SCREEN_W } = Dimensions.get('window');

export const BackgroundRefined = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      {/* Lighter Luminous Navy Gradient */}
      <LinearGradient colors={['#2E345D', '#1E2235', '#161A2B']} style={StyleSheet.absoluteFill} />
      
      {/* Arctic Cyan mesh for enlightenment */}
      <Svg height="100%" width="100%" style={StyleSheet.absoluteFill}>
        <Defs>
          <RadialGradient id="meshG1" cx="20%" cy="10%" r="70%">
            <Stop offset="0%" stopColor="rgba(0,212,255,0.15)" />
            <Stop offset="100%" stopColor="rgba(0,212,255,0)" />
          </RadialGradient>
          <RadialGradient id="meshG2" cx="90%" cy="90%" r="60%">
            <Stop offset="0%" stopColor="rgba(0,114,255,0.1)" />
            <Stop offset="100%" stopColor="rgba(0,114,255,0)" />
          </RadialGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#meshG1)" />
        <Rect x="0" y="0" width="100%" height="100%" fill="url(#meshG2)" />
        
        {/* Subtle geometric pattern for pro texture */}
        <Path
          d={`M 0 80 L ${SCREEN_W} 80 M 0 240 L ${SCREEN_W} 240`}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth={0.5}
        />
      </Svg>
    </View>
  );
};
