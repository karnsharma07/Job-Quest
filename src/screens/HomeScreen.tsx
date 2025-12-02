import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ListRenderItem
} from 'react-native';

// Import theme created
import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface JobItem {
  id: string;
  title: string;
  company: string;
  salary: string;
  type: string;
}

// Dummy Data
const DATA: JobItem[] = [
  { id: '1', title: 'Senior React Developer', company: 'TechNova', salary: '$120k/yr', type: 'Remote' },
  { id: '2', title: 'UI/UX Designer', company: 'CreativeFlow', salary: '$95k/yr', type: 'Remote' },
  { id: '3', title: 'Product Manager', company: 'BizScale', salary: '$110k/yr', type: 'Remote' },
  { id: '4', title: 'Data Scientist', company: 'DataMinds', salary: '$130k/yr', type: 'Remote' },
  { id: '5', title: 'Mobile App Dev', company: 'Appify', salary: '$105k/yr', type: 'Remote' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState<string>('');

  // The Card Component for each Job
  const renderItem: ListRenderItem<JobItem> = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconPlaceholder}>
           <Text style={styles.iconText}>{item.company.charAt(0)}</Text>
        </View>
        <View>
          <Text style={styles.jobTitle}>{item.title}</Text>
          <Text style={styles.companyName}>{item.company}</Text>
        </View>
      </View>
      
      <View style={styles.cardFooter}>
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{item.type}</Text>
        </View>
        <Text style={styles.salary}>{item.salary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome to Job Quest 👋</Text>
          <Text style={styles.subtitle}>Find your perfect remote job</Text>
        </View>
        {/* Placeholder for Profile Picture */}
        <View style={styles.profilePic} /> 
      </View>

      {/* Search Bar Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder="Search for jobs, skills..."
            placeholderTextColor={COLORS.textSub}
            value={search}
            onChangeText={setSearch}
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterBtnText}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Job Feed Section */}
      <View style={styles.feedContainer}>
        <Text style={styles.sectionTitle}>Recent Jobs</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

// STYLES - Using Flexbox Layout System
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  greeting: {
    fontSize: 20,
    color: COLORS.textSub,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: SIZES.header,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORS.secondary,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    marginBottom: 20,
    gap: 10,
  },
  searchBar: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    paddingHorizontal: 15,
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  input: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    ...SHADOWS.medium,
  },
  filterBtnText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  feedContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 10,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: SIZES.borderRadius,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: COLORS.secondary,
    ...SHADOWS.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.secondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  iconText: {
    color: COLORS.darkGreen,
    fontWeight: 'bold',
    fontSize: 18,
  },
  jobTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain,
  },
  companyName: {
    fontSize: 14,
    color: COLORS.textSub,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  tagContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.textSub,
  },
  salary: {
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});