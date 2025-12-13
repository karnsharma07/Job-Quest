import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../constants/theme';

interface ProgressBarProps {
  progress: number;
  label?: string;   
  color?: string;   
}

const ProgressBar = ({ progress, label, color = COLORS.primary }: ProgressBarProps) => {
  // Ensure progress stays between 0 and 1
  const clampedProgress = Math.min(Math.max(progress, 0), 1);
  const percentage = Math.round(clampedProgress * 100);

  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
          <Text style={styles.percentage}>{percentage}%</Text>
        </View>
      )}
      <View style={styles.track}>
        <View 
          style={[
            styles.fill, 
            { width: `${percentage}%`, backgroundColor: color }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    width: '100%',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: COLORS.textSub,
    fontWeight: '600',
  },
  percentage: {
    fontSize: 12,
    color: COLORS.textSub,
  },
  track: {
    height: 8,
    backgroundColor: '#E5E7EB', 
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
});

export default ProgressBar;