// MedAlertNative/constants/theme.ts

export const Colors = {
  background: '#f8fafc',
  foreground: '#1e293b',
  card: '#ffffff',
  cardForeground: '#1e293b',

  primary: '#3b82f6',
  primaryForeground: '#ffffff',
  
  secondary: '#f1f5f9',
  secondaryForeground: '#475569',
  
  muted: '#f1f5f9',
  mutedForeground: '#64748b',
  
  accent: '#e0f2fe',
  accentForeground: '#0369a1',
  
  destructive: '#ef4444',
  destructiveForeground: '#ffffff',
  
  border: 'rgba(148, 163, 184, 0.3)',
  inputBackground: '#f8fafc',
  switchBackground: '#cbd5e1',
  ring: '#3b82f6',

  // Medical Theme Colors
  medical: {
    blue: '#3b82f6',
    green: '#10b981',
    orange: '#f59e0b',
    purple: '#8b5cf6',
    red: '#ef4444',
    pink: '#ec4899',
    teal: '#14b8a6',
  },

  // Greys
  grey: {
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

export const FontWeights = {
  medium: '500' as const,
  normal: '400' as const,
  bold: '700' as const,
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
};

export const theme = {
  colors: Colors,
  fontWeights: FontWeights,
  spacing: Spacing,
};