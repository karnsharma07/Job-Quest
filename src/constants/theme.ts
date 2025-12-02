import { Platform } from 'react-native';

export const COLORS = {
  // Emerald Green Palette
  primary: '#10B981',    // Main Emerald Green (Buttons, Active States)
  secondary: '#D1FAE5',  // Light Green (Background accents)
  darkGreen: '#064E3B',  // Dark Text for headers

  // Neutrals
  white: '#FFFFFF',
  background: '#F9FAFB', // Very light gray
  textMain: '#1F2937',   // Dark Gray (Primary text)
  textSub: '#6B7280',    // Light Gray (Secondary text)
  border: '#E5E7EB',     // Light border color
  
  // Feedback
  error: '#EF4444',
  success: '#10B981',
};

export const SIZES = {
  padding: 16,
  borderRadius: 12,
  header: 24,
  body: 14,
};

export const SHADOWS = {
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
};

const tintColorLight = COLORS.primary; // Sets system tabs to Emerald Green
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: COLORS.textMain,
    background: COLORS.background,
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#ECEDEE',
    background: '#151718',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};