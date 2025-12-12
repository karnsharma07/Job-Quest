import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View } from 'react-native';
// Import your Emerald theme
import { COLORS, SIZES } from '../src/constants/theme';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Job Quest Modal</Text>
      
      <View style={styles.separator} />
      
      <Text style={styles.text}>
        This is a modal screen defined in app/modal.tsx.
        You can use this space for settings, detailed info, or other pop-up content.
      </Text>

      {/* Use the status bar style that works best for your OS */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background, // Use your theme background
    padding: SIZES.padding,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain, // Use your theme text color
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: COLORS.secondary, // Use your theme accent
  },
  text: {
    fontSize: 16,
    color: COLORS.textSub,
    textAlign: 'center',
  },
});