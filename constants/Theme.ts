import { Platform } from 'react-native';

export const Theme = {
  colors: {
    // Base Palette: Luminous Navy & Arctic Frost (Much clearer and more pro)
    background: '#1E2235', 
    surface: '#292D4E',    
    surfaceCard: 'rgba(255, 255, 255, 0.12)', 
    surfaceBright: 'rgba(255, 255, 255, 0.18)', 
    
    primary: '#00D4FF',      // Electric Cyan (Cleaner than purple)
    primaryContainer: '#0082FF',
    secondary: '#D1D5FF',   
    tertiary: '#FF9E64',    
    
    onSurface: '#FFFFFF',
    onSurfaceVariant: 'rgba(255, 255, 255, 0.8)',
    
    border: 'rgba(255, 255, 255, 0.2)', 
    
    gradients: {
      primary: ['#00D4FF', '#0072FF'],
      glass: ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.06)'],
    }
  },
  typography: {
    headline: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
      fontSize: 28,
      fontWeight: '900' as '900',
      letterSpacing: -1,
    },
    data: {
      fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
      fontSize: 16,
      fontWeight: '800' as '800',
      letterSpacing: 0.5,
    },
    label: {
      fontSize: 10,
      fontWeight: '900' as '900',
      letterSpacing: 2.5,
      textTransform: 'uppercase' as 'uppercase',
    }
  },
  radius: {
    lg: 20,
    xl: 28, 
  },
  shadows: {
    glow: {
      shadowColor: '#00D4FF',
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.4,
      shadowRadius: 20,
      elevation: 15,
    }
  }
};
