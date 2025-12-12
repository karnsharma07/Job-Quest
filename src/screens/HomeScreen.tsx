import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Modal,
  StatusBar,
  ListRenderItem,
  Platform
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../redux/favoritesSlice';
import { RootState } from '../redux/store';

import { COLORS, SIZES, SHADOWS } from '../constants/theme';

interface JobItem {
  id: string;
  title: string;
  company: string;
  salary: string;
  type: string;
}

// Local Data
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
  const dispatch = useDispatch();
  const savedJobs = useSelector((state: RootState) => state.favorites.ids);

  const [search, setSearch] = useState<string>('');
  const [filteredData, setFilteredData] = useState<JobItem[]>(DATA);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [selectedJobType, setSelectedJobType] = useState<string>('Remote');
  const [selectedSalary, setSelectedSalary] = useState<string>('$80k-120k');

  const toggleSave = (id: string) => {
    if (savedJobs.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
      Alert.alert("Job Saved! ❤️", "This job has been added to your Saved tab.");
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

    // 3. Filter by Salary
    if (salaryRange === '$50k-80k') {
        result = result.filter(item => 
          item.salary.includes('$50k') || item.salary.includes('$55k') || 
          item.salary.includes('$60k') || item.salary.includes('$65k') || 
          item.salary.includes('$70k') || item.salary.includes('$80k')
        );
    } else if (salaryRange === '$80k-120k') {
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
          <TouchableOpacity 
            onPress={() => toggleSave(item.id)}
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
          >
            <Text style={{fontSize: 24}}>
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
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />
        
        <View style={styles.topNavBar}>
          <View>
            <Text style={styles.navGreeting}>Hello, Karn 👋</Text>
            <Text style={styles.navTitle}>Job Quest</Text>
          </View>
          <View style={styles.profilePic} /> 
        </View>

        <View style={styles.searchSection}>
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

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // NAV BAR STYLES 
  topNavBar: {
    backgroundColor: COLORS.primary,
    paddingTop: Platform.OS === 'android' ? 40 : 60, 
    paddingHorizontal: SIZES.padding,
    paddingBottom: 30, 
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...SHADOWS.medium,
    zIndex: 1,
  },
  navGreeting: {
    fontSize: 14,
    color: COLORS.secondary, 
    marginBottom: 4,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  profilePic: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: COLORS.secondary,
  },
  
  // SEARCH
  searchSection: {
    marginTop: -25, 
    flexDirection: 'row',
    paddingHorizontal: SIZES.padding,
    gap: 10,
    zIndex: 2,
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
    ...SHADOWS.medium,
  },
  input: {
    fontSize: 14,
    color: COLORS.textMain,
  },
  filterBtn: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.darkGreen,
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

  // CARDS
  feedContainer: {
    flex: 1,
    paddingHorizontal: SIZES.padding,
    marginTop: 20,
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
  // MODAL
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