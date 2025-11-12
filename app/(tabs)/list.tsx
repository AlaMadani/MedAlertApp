// MedAlertNative/app/(tabs)/list.tsx

import { useRouter } from 'expo-router';
import { Calendar, Clock, MoreVertical, Pill, Search, Target } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// Mock data (copied directly from your file)
const medicines = [
  {
    id: '1',
    name: 'Vitamin D',
    dosage: '1000 IU',
    type: 'tablet',
    frequency: 'Once Daily',
    nextDose: '08:00 AM',
    status: 'active',
    bgColor: '#FFFBEB', // bg-yellow-50
    adherence: 95,
    streak: 12,
  },
  {
    id: '2',
    name: 'Blood Pressure',
    dosage: '10mg',
    type: 'tablet',
    frequency: 'Twice Daily',
    nextDose: '12:00 PM',
    status: 'active',
    bgColor: '#FEF2F2', // bg-red-50
    adherence: 82,
    streak: 4,
  },
  {
    id: '3',
    name: 'Calcium',
    dosage: '500mg',
    type: 'capsule',
    frequency: 'Once Daily',
    nextDose: '06:00 PM',
    status: 'paused',
    bgColor: '#F0FDF4', // bg-green-50
    adherence: 90,
    streak: 22,
  }
];

// Helper component to render the custom <Badge>
const StatusBadge = ({ text, status }: { text: string, status: string }) => {
  const badgeStyle = [
    styles.badge, 
    status === 'active' ? styles.badgeActive : styles.badgePaused
  ];
  const textStyle = [
    styles.badgeText, 
    status === 'active' ? styles.badgeTextActive : styles.badgeTextPaused
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

// Helper component to render the custom <Progress>
const CustomProgress = ({ value }: { value: number }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${value}%` }]} />
    </View>
  );
};

export default function MedicineListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const handleViewMedicine = (medicineId: string) => {
    // This will show an error until we create the file, which is normal.
    router.push({
      pathname: "../medicine-detail",
      params: { id: medicineId }
    });
  };
  
  const filterButtons = [
    { key: 'all', label: 'All' },
    { key: 'active', label: 'Active' },
    { key: 'paused', label: 'Paused' },
    { key: 'completed', label: 'Completed' },
  ];

  // We can add filtering logic here later
  const filteredMedicines = medicines.filter(med => 
    med.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Medicines</Text>
      </View>
      
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for medicines..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {filterButtons.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterButton,
                  selectedFilter === filter.key && styles.filterButtonActive
                ]}
                onPress={() => setSelectedFilter(filter.key)}
              >
                <Text style={[
                  styles.filterButtonText,
                  selectedFilter === filter.key && styles.filterButtonTextActive
                ]}>
                  {filter.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Medicine List */}
        <View style={styles.listContainer}>
          {filteredMedicines.map((medicine) => (
            <TouchableOpacity 
              key={medicine.id} 
              style={[styles.card, { backgroundColor: medicine.bgColor }]}
              onPress={() => handleViewMedicine(medicine.id)}
            >
              {/* Card Header */}
              <View style={styles.cardHeader}>
                <View style={styles.cardHeaderInfo}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
                </View>
                <TouchableOpacity style={styles.moreButton}>
                  <MoreVertical size={20} color="#555" />
                </TouchableOpacity>
              </View>

              {/* Medicine Details */}
              <View style={styles.detailsRow}>
                <View style={styles.detailItem}>
                  <Pill size={14} color="#666" />
                  <Text style={styles.detailText}>{medicine.type}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#666" />
                  <Text style={styles.detailText}>{medicine.frequency}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#666" />
                  <Text style={styles.detailText}>Next: {medicine.nextDose}</Text>
                </View>
              </View>
              
              <StatusBadge text={medicine.status} status={medicine.status} />

              {/* Adherence Visualization */}
              <View style={[styles.adherenceBox, { backgroundColor: `${medicine.bgColor}99` }]}>
                <View style={styles.adherenceHeader}>
                  <View style={styles.detailItem}>
                    <Target size={14} color="#333" />
                    <Text style={styles.adherenceText}>Adherence</Text>
                  </View>
                  <Text style={styles.adherenceValue}>{medicine.adherence}%</Text>
                </View>
                <CustomProgress value={medicine.adherence} />
              </View>

            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

//
// This is the new 'StyleSheet' that replaces your Tailwind CSS
//
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#111',
  },
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#333',
  },
  filterButtonTextActive: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  cardHeaderInfo: {
    flex: 1,
  },
  medicineName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  medicineDosage: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
  moreButton: {
    padding: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: '#555',
  },
  // Custom Badge Styles
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    marginBottom: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  badgeActive: {
    backgroundColor: '#D1FAE5', // green-100
  },
  badgeTextActive: {
    color: '#065F46', // green-800
  },
  badgePaused: {
    backgroundColor: '#FEF3C7', // yellow-100
  },
  badgeTextPaused: {
    color: '#92400E', // yellow-800
  },
  // Adherence Box
  adherenceBox: {
    borderRadius: 8,
    padding: 10,
  },
  adherenceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  adherenceText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  adherenceValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111',
  },
  // Custom Progress Bar
  progressContainer: {
    height: 6,
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#007AFF',
  },
  bottomSpacer: {
    height: 40, // Spacer at the end of the list
  }
});