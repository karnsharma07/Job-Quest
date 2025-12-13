import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";
// NEW: Import Progress Bar
import ProgressBar from '../components/ProgressBar';

const applications = [
  { id: "1", title: "React Developer", company: "TechNova", status: "Applied", date: "Nov 20" },
  { id: "2", title: "UI Designer", company: "CreativeFlow", status: "Interview", date: "Nov 18" },
  { id: "3", title: "Product Manager", company: "BizScale", status: "Rejected", date: "Nov 10" },
  { id: "4", title: "Mobile Dev", company: "Appify", status: "Hired", date: "Dec 01" },
];

export default function ApplicationTrackerScreen() {

  const getProgressFromStatus = (status: string) => {
    switch (status) {
      case 'Applied': return 0.25;
      case 'Interview': return 0.50;
      case 'Offer': return 0.75;
      case 'Hired': return 1.0;
      case 'Rejected': return 1.0; 
      default: return 0.1;
    }
  };

  const getColorFromStatus = (status: string) => {
    if (status === 'Rejected') return COLORS.error;
    if (status === 'Hired') return COLORS.success;
    return COLORS.primary;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Application Tracker</Text>

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.row}>
                <View>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.company}>{item.company}</Text>
                </View>
                <Text style={styles.date}>{item.date}</Text>
            </View>
            
            {/* Progress Bar */}
            <View style={{marginTop: 10}}>
                <Text style={{fontSize: 12, color: COLORS.textSub, marginBottom: 2}}>
                    Status: <Text style={{fontWeight: 'bold', color: COLORS.textMain}}>{item.status}</Text>
                </Text>
                <ProgressBar 
                    progress={getProgressFromStatus(item.status)} 
                    color={getColorFromStatus(item.status)}
                />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
    paddingTop: 50,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.textMain,
  },
  item: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: SIZES.borderRadius,
    marginBottom: 15,
    ...SHADOWS.medium,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textMain,
  },
  company: {
    fontSize: 14,
    color: COLORS.textSub,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'flex-start'
  },
  date: {
    fontSize: 12,
    color: COLORS.textSub,
  },
});