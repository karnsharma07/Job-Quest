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
  ListRenderItem,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Alert
} from 'react-native';

import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface JobItem {
  id: string;
  title: string;
  company: string;
  salary: string;
  type: string;
}

// dummy data for jobs
const DATA: JobItem[] = [
  { id: '1', title: 'Senior React Developer', company: 'TechNova', salary: '$120k/yr', type: 'Remote' },
  { id: '2', title: 'UI/UX Designer', company: 'CreativeFlow', salary: '$95k/yr', type: 'Remote' },
  { id: '3', title: 'Product Manager', company: 'BizScale', salary: '$110k/yr', type: 'Hybrid' },
  { id: '4', title: 'Data Scientist', company: 'DataMinds', salary: '$130k/yr', type: 'Remote' },
  { id: '5', title: 'Mobile App Dev', company: 'Appify', salary: '$105k/yr', type: 'On-Site' },
  { id: '6', title: 'Junior Web Developer', company: 'StartUp Inc', salary: '$60k/yr', type: 'Remote' },
  { id: '7', title: 'Content Writer', company: 'WriteAway', salary: '$55k/yr', type: 'Remote' },
  { id: '8', title: 'QA Tester', company: 'BugFree', salary: '$70k/yr', type: 'Hybrid' },
  { id: '9', title: 'Customer Support', company: 'HelpDesk', salary: '$50k/yr', type: 'Remote' },
  { id: '10', title: 'Marketing Coordinator', company: 'MarketMakers', salary: '$65k/yr', type: 'On-Site' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<JobItem[]>(DATA);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  // Filter States
  const [selectedJobType, setSelectedJobType] = useState<string>('Remote');
  const [selectedSalary, setSelectedSalary] = useState<string>('$80k-120k');

  // State to track saved jobs (Array of IDs)
  const [savedJobs, setSavedJobs] = useState<string[]>([]);

  const toggleSave = (id: string) => {
    if (savedJobs.includes(id)) {
      setSavedJobs(savedJobs.filter(jobId => jobId !== id)); // Remove
    } else {
      setSavedJobs([...savedJobs, id]); // Add
      Alert.alert("Job Saved", "This job has been added to your saved list.");
    }
  };

  const performFilter = (searchText: string, jobType: string, salaryRange: string) => {
    let result = DATA;

    // 1. Filter by Text
    if (searchText) {
      result = result.filter((item) => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const companyData = item.company ? item.company.toUpperCase() : ''.toUpperCase();
        const textData = searchText.toUpperCase();
        return itemData.indexOf(textData) > -1 || companyData.indexOf(textData) > -1;
      });
    }

    // 2. Filter by Job Type
    if (jobType !== 'All') {
        result = result.filter(item => item.type === jobType);
    }

    // 3. Filter by Salary (Expanded logic for new data)
    if (salaryRange === '$50k-80k') {
        // Checks for 50k, 60k, 70k, 55k, 65k
        result = result.filter(item => 
          item.salary.includes('$50k') || item.salary.includes('$55k') || 
          item.salary.includes('$60k') || item.salary.includes('$65k') || 
          item.salary.includes('$70k') || item.salary.includes('$80k')
        );
    } else if (salaryRange === '$80k-120k') {
         // Checks for higher salaries
         result = result.filter(item => 
           item.salary.includes('$95k') || item.salary.includes('$105k') || 
           item.salary.includes('$110k') || item.salary.includes('$120k') || 
           item.salary.includes('$130k')
         );
    }

    setFilteredData(result);
  };

  const handleSearch = (text: string) => {
    setSearch(text);
    performFilter(text, selectedJobType, selectedSalary);
  };

  const applyFilters = () => {
    performFilter(search, selectedJobType, selectedSalary);
    setModalVisible(false);
  };

  // Reusable Filter Button Component
  const FilterOption = ({ label, selectedState, setSelectedState }: any) => {
    const isSelected = selectedState === label;
    return (
        <TouchableOpacity 
            style={isSelected ? styles.activeFilterOption : styles.inactiveFilterOption}
            onPress={() => setSelectedState(label)}
        >
            <Text style={{
                color: isSelected ? COLORS.white : COLORS.textSub, 
                fontWeight: isSelected ? 'bold' : 'normal'
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
  };

  const renderItem: ListRenderItem<JobItem> = ({ item }) => {
    const isSaved = savedJobs.includes(item.id);

    return (
      <TouchableOpacity style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.iconPlaceholder}>
             <Text style={styles.iconText}>{item.company.charAt(0)}</Text>
          </View>
          
          <View style={{flex: 1}}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.companyName}>{item.company}</Text>
          </View>

          {/* Save Button (Heart) */}
          <TouchableOpacity onPress={() => toggleSave(item.id)}>
            <Text style={{fontSize: 22}}>
              {isSaved ? '❤️' : '🤍'} 
            </Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.cardFooter}>
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{item.type}</Text>
          </View>
          <Text style={styles.salary}>{item.salary}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />
        
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, Karn 👋</Text>
            <Text style={styles.subtitle}>Find your perfect remote job</Text>
          </View>
          <View style={styles.profilePic} /> 
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search for jobs, skills..."
              placeholderTextColor={COLORS.textSub}
              value={search}
              onChangeText={handleSearch}
            />
          </View>
          <TouchableOpacity 
            style={styles.filterBtn} 
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.filterBtnText}>Filter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.feedContainer}>
          <Text style={styles.sectionTitle}>Recent Jobs</Text>
          <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
                <Text style={{textAlign: 'center', marginTop: 20, color: COLORS.textSub}}>
                    No jobs found matching your criteria.
                </Text>
            }
          />
        </View>

        {/* Filter Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filter Jobs</Text>
              
              <Text style={styles.filterLabel}>Job Type</Text>
              <View style={styles.filterOptions}>
                <FilterOption label="Remote" selectedState={selectedJobType} setSelectedState={setSelectedJobType} />
                <FilterOption label="Hybrid" selectedState={selectedJobType} setSelectedState={setSelectedJobType} />
                <FilterOption label="On-Site" selectedState={selectedJobType} setSelectedState={setSelectedJobType} />
                <FilterOption label="All" selectedState={selectedJobType} setSelectedState={setSelectedJobType} />
              </View>

              <Text style={styles.filterLabel}>Salary Range</Text>
              <View style={styles.filterOptions}>
                 <FilterOption label="$50k-80k" selectedState={selectedSalary} setSelectedState={setSelectedSalary} />
                 <FilterOption label="$80k-120k" selectedState={selectedSalary} setSelectedState={setSelectedSalary} />
              </View>

              <TouchableOpacity 
                style={styles.applyBtn}
                onPress={applyFilters}
              >
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.applyBtn, {backgroundColor: 'transparent', marginTop: 0}]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={{color: COLORS.textSub}}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

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
    fontSize: 16,
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
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    ...SHADOWS.medium,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 20,
    textAlign: 'center',
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.textMain,
    marginBottom: 10,
    marginTop: 10,
  },
  filterOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  activeFilterOption: {
    backgroundColor: COLORS.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  inactiveFilterOption: {
    backgroundColor: COLORS.background,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  applyBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 25,
    alignItems: 'center',
  },
  applyBtnText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
});