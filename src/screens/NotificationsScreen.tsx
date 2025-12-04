import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { COLORS, SIZES } from "../constants/theme";

const notifications = [
  { id: "1", title: "New job match", time: "2h ago" },
  { id: "2", title: "Saved job updated", time: "Yesterday" },
  { id: "3", title: "Application viewed", time: "3 days ago" },
];

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Notifications</Text>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
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
    color: COLORS.textMain,
  },
  time: {
    fontSize: 12,
    color: COLORS.textSub,
  },
});
