import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux"; 
import { removeFavorite } from "../redux/favoritesSlice";
import { RootState } from "../redux/store";
import { JOB_DATA } from "../constants/jobs"; 
import { COLORS, SIZES, SHADOWS } from "../constants/theme";

export default function SavedJobsScreen() {
  const dispatch = useDispatch();
  
  // Get saved IDs from Redux
  const savedIds = useSelector((state: RootState) => state.favorites.ids);
  
  const savedJobs = JOB_DATA.filter((job) => savedIds.includes(job.id));

  const renderItem = ({ item }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.row}>
        <View style={styles.iconBox}>
          <Text style={styles.iconText}>{item.company.charAt(0)}</Text>
        </View>

        <View style={{flex: 1}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.company}>{item.company}</Text>
        </View>

        <TouchableOpacity 
          onPress={() => dispatch(removeFavorite(item.id))}
          style={styles.removeBtn}
        >
          <Text style={styles.removeBtnText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Saved Jobs ({savedJobs.length})</Text>
      
      {savedJobs.length === 0 ? (
         <Text style={{color: COLORS.textSub, marginTop: 20}}>No saved jobs yet.</Text>
      ) : (
        <FlatList
            data={savedJobs}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
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
  card: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: SIZES.borderRadius,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    marginBottom: 15,
    ...SHADOWS.medium,
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
  removeBtn: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },
  removeBtnText: {
    color: COLORS.error,
    fontSize: 12,
    fontWeight: "bold",
  }
});