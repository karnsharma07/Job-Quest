import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const applications = [
  { id: "1", title: "React Developer", company: "TechNova", status: "Applied", date: "Nov 20" },
  { id: "2", title: "UI Designer", company: "CreativeFlow", status: "Interview", date: "Nov 18" },
  { id: "3", title: "Product Manager", company: "BizScale", status: "Rejected", date: "Nov 10" },
];

export default function ApplicationTrackerScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Application Tracker</Text>

      <FlatList
        data={applications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.company}>{item.company}</Text>
            <View style={styles.row}>
              <Text style={styles.status}>Status: {item.status}</Text>
              <Text style={styles.date}>{item.date}</Text>
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
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.textMain,
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.secondary,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.textMain,
  },
  company: {
    fontSize: 14,
    color: COLORS.textSub,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  status: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  date: {
    fontSize: 12,
    color: COLORS.textSub,
  },
});
