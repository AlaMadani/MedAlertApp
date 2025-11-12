// MedAlertNative/app/(tabs)/index.tsx

import { useRouter } from 'expo-router';
import { Activity, AlertCircle, Bell, CheckCircle, Clock, Plus, Zap } from 'lucide-react-native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text, // <-- FIX: Import ViewStyle
  TextStyle // <-- FIX: Import TextStyle
  ,


  TouchableOpacity,
  View, // <-- FIX: Import StyleProp
  ViewStyle
} from 'react-native';

// Mock data (no changes)
const todayMedicines = [
  {
    id: '1',
    name: 'Vitamin D',
    dosage: '1000 IU',
    time: '08:00 AM',
    status: 'taken',
    type: 'tablet',
    bgColor: '#FFFBEB'
  },
  {
    id: '2',
    name: 'Blood Pressure',
    dosage: '10mg',
    time: '12:00 PM',
    status: 'pending',
    type: 'tablet',
    bgColor: '#FEF2F2'
  },
  {
    id: '3',
    name: 'Calcium',
    dosage: '500mg',
    time: '06:00 PM',
    status: 'upcoming',
    type: 'tablet',
    bgColor: '#F0FDF4'
  }
];

//
// --- FIX FOR ERRORS 1 & 2 ---
// We make this component more robust to handle styles and colors.
//
const StatusBadge = ({ status }: { status: string }) => {
  // Define types for our style variables
  let containerStyle: StyleProp<ViewStyle> = styles.badge;
  let textStyle: StyleProp<TextStyle> = styles.badgeText;
  let iconColor: string = '#666'; // Default color
  let text: string = '';
  let Icon = Clock;

  switch (status) {
    case 'taken':
      containerStyle = [styles.badge, styles.badgeTaken];
      textStyle = [styles.badgeText, styles.badgeTextTaken];
      iconColor = styles.badgeTextTaken.color; // Get color from style
      text = 'Taken';
      Icon = CheckCircle;
      break;
    case 'pending':
      containerStyle = [styles.badge, styles.badgePending];
      textStyle = [styles.badgeText, styles.badgeTextPending];
      iconColor = styles.badgeTextPending.color; // Get color from style
      text = 'Pending';
      Icon = AlertCircle;
      break;
    case 'upcoming':
    default:
      containerStyle = [styles.badge, styles.badgeUpcoming];
      textStyle = [styles.badgeText, styles.badgeTextUpcoming];
      iconColor = styles.badgeTextUpcoming.color; // Get color from style
      text = 'Upcoming';
      Icon = Clock;
      break;
  }

  return (
    <View style={containerStyle}>
      <Icon size={12} color={iconColor} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

// Helper component (no changes)
const CustomProgress = ({ value }: { value: number }) => {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.progressBar, { width: `${value}%` }]} />
    </View>
  );
};


export default function HomePage() {
  const router = useRouter();

  const handleViewMedicine = (medicineId: string) => {
    //
    // --- THIS IS ERROR 3 ---
    // This error is EXPECTED. It will be fixed when we create the
    // file 'app/medicine-detail.tsx' in a later step.
    //
    router.push({
      pathname: "../medicine-detail",
      params: { id: medicineId }
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerGreeting}>Hello, User!</Text>
            <Text style={styles.headerSubtitle}>Here's your plan for today.</Text>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <Bell size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Today's Medicines Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Today's Medicines</Text>
            <TouchableOpacity onPress={() => {
              //
              // --- FIX FOR ERROR 4 ---
              // The path should be '/list', not '/(tabs)/list'.
              //
              router.push('./list');
            }}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.medicineList}>
            {todayMedicines.map((medicine) => (
              <TouchableOpacity 
                key={medicine.id} 
                style={[styles.medicineItem, { backgroundColor: medicine.bgColor }]}
                onPress={() => handleViewMedicine(medicine.id)}
              >
                <View style={styles.medicineInfo}>
                  <Text style={styles.medicineName}>{medicine.name}</Text>
                  <Text style={styles.medicineDosage}>{medicine.dosage}</Text>
                  <Text style={styles.medicineTime}>{medicine.time}</Text>
                </View>
                <StatusBadge status={medicine.status} />
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {/* Quick Actions Card (no changes) */}
        <View style={styles.card}>
           <View style={styles.cardHeader}>
            <Zap size={20} color="#333" />
            <Text style={styles.cardTitle}>Quick Actions</Text>
          </View>
          <TouchableOpacity 
            style={[styles.button, styles.addMedicineButton]}
            onPress={() => router.push('./add')} // <-- Also works for 'app/(tabs)/add.tsx'
          >
            <Plus size={16} color="#FFF" />
            <Text style={styles.buttonText}>Add New Medicine</Text>
          </TouchableOpacity>
        </View>

        {/* Adherence Card (no changes) */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Activity size={20} color="#5856D6" />
            <Text style={styles.cardTitle}>This Week</Text>
            <Text style={styles.adherenceText}>92% adherence</Text>
          </View>
          
          <CustomProgress value={92} />
          
          <View style={styles.weekRow}>
            <Text style={styles.weekDay}>Mon</Text>
            <Text style={styles.weekDay}>Tue</Text>
            <Text style={styles.weekDay}>Wed</Text>
            <Text style={styles.weekDay}>Thu</Text>
            <Text style={styles.weekDay}>Fri</Text>
            <Text style={styles.weekDay}>Sat</Text>
            <Text style={styles.weekDay}>Sun</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

//
// --- STYLESHEET UPDATES ---
//
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerGreeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#FFF',
    borderRadius: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
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
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  viewAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  medicineList: {
    gap: 12,
  },
  medicineItem: {
    borderRadius: 10,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineInfo: {
    gap: 4,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: '600',
  },
  medicineDosage: {
    fontSize: 14,
    color: '#555',
  },
  medicineTime: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },
  // Custom Badge Styles
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    gap: 4,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  badgeTaken: {
    backgroundColor: '#D1FAE5', // green-100
  },
  badgeTextTaken: { // <-- FIX: Added this style
    color: '#065F46', // green-800
  },
  badgePending: {
    backgroundColor: '#FFE4E6', // red-100
  },
  badgeTextPending: { // <-- FIX: Added this style
    color: '#991B1B', // red-800
  },
  badgeUpcoming: {
    backgroundColor: '#E0E7FF', // blue-100
  },
  badgeTextUpcoming: { // <-- FIX: Added this style
    color: '#3730A3', // blue-800
  },
  // Button Styles
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addMedicineButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  // Custom Progress Bar Styles
  progressContainer: {
    height: 12,
    backgroundColor: '#E5E5E5',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#007AFF',
  },
  adherenceText: {
    fontSize: 14,
    color: '#666',
  },
  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  weekDay: {
    fontSize: 12,
    color: '#666',
  },
});