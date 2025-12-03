import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../constants/theme";

// Dummy saves
const savedJobs = [
  { id: "1", title: "React Developer", company: "TechNova" },
  { id: "2", title: "UI Designer", company: "CreativeFlow" },
];

export default function SavedJobsScreen() {
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{item.company.charAt(0)}</Text>
        </View>

        <View>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Jobs</Text>

      <FlatList
        data={savedJobs}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SIZES.padding,
    backgroundColor: COLORS.background,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.textMain,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: 15,
    ...SHADOWS.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  iconText: {
    color: COLORS.darkGreen,
    fontSize: 18,
    fontWeight: "bold",
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
});
