// MedAlertNative/app/medicine-detail.tsx

import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import {
    Activity,
    ArrowLeft,
    Calendar,
    Clock,
    FileText,
    MoreVertical,
    PauseCircle,
    Pill,
    PlayCircle,
    Target
} from 'lucide-react-native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// --- Helper Components (re-created from web) ---

// Custom Progress Bar
const CustomProgress = ({ value }: { value: number }) => (
  <View style={styles.progressContainer}>
    <View style={[styles.progressBar, { width: `${value}%` }]} />
  </View>
);

// Custom Badge
const StatusBadge = ({ text, status }: { text: string, status: string }) => {
  const badgeStyle = [
    styles.badge, 
    status === 'active' ? styles.badgeActive : styles.badgePaused
  ];
  const textStyle = [
    styles.badgeText, 
    status === 'active' ? styles.badgeTextActive : styles.badgeTextPaused
  ];
  const Icon = status === 'active' ? PlayCircle : PauseCircle;

  return (
    <View style={badgeStyle}>
      <Icon size={12} color={status === 'active' ? '#166534' : '#713F12'} />
      <Text style={textStyle}>{text}</Text>
    </View>
  );
};

// --- Main Component ---

export default function MedicineDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Gets the 'id' we passed

  // Mock medicine data (copied from your file)
  // In a real app, you'd fetch this using the 'id'
  const medicine = {
    id: id,
    name: 'Blood Pressure Medication',
    genericName: 'Lisinopril',
    dosage: '10mg',
    type: 'tablet',
    frequency: 'Twice Daily',
    duration: '90 days',
    startDate: '2024-12-01',
    endDate: '2025-03-01',
    status: 'active',
    prescribedBy: 'Dr. Sarah Johnson',
    pharmacy: 'MediCare Pharmacy',
    instructions: 'Take with food. Avoid alcohol.',
    notes: 'Monitor blood pressure weekly',
    sideEffects: 'May cause dizziness, dry cough',
    progress: 65,
    totalDoses: 90 * 2,
    takenDoses: 117,
    adherence: 92,
    history: [
      { date: 'Nov 10', time: '08:00 AM', status: 'taken', note: 'Taken with breakfast' },
      { date: 'Nov 9', time: '08:01 AM', status: 'taken' },
      { date: 'Nov 8', time: '08:30 AM', status: 'late' },
      { date: 'Nov 7', time: '08:00 AM', status: 'missed', note: 'Forgot' },
    ],
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* This Stack.Screen configures the header bar */}
      <Stack.Screen
        options={{
          headerTitle: 'Medicine Details',
          headerLeft: () => (
            <TouchableOpacity onPress={handleBack} style={styles.headerButton}>
              <ArrowLeft size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity style={styles.headerButton}>
              <MoreVertical size={24} color="#007AFF" />
            </TouchableOpacity>
          ),
          headerTitleAlign: 'center',
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerShadowVisible: false, // Removes the shadow
        }}
      />
      
      <ScrollView style={styles.container}>
        {/* Header Info Card */}
        <View style={[styles.card, styles.headerCard]}>
          <View style={styles.headerRow}>
            <View style={styles.pillIcon}>
              <Pill size={24} color="#FFF" />
            </View>
            <View>
              <Text style={styles.medicineName}>{medicine.name}</Text>
              <Text style={styles.medicineGeneric}>{medicine.genericName}</Text>
            </View>
          </View>
          <View style={styles.headerDetails}>
            <Text style={styles.dosage}>{medicine.dosage}</Text>
            <StatusBadge text={medicine.status} status={medicine.status} />
          </View>
        </View>

        {/* Adherence Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Target size={18} color="#333" />
            <Text style={styles.cardTitle}>Adherence: {medicine.adherence}%</Text>
          </View>
          <CustomProgress value={medicine.adherence} />
          <Text style={styles.progressText}>{medicine.takenDoses} of {medicine.totalDoses} doses taken</Text>
        </View>

        {/* Schedule Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Calendar size={18} color="#333" />
            <Text style={styles.cardTitle}>Schedule</Text>
          </View>
          <View style={styles.infoRow}>
            <Clock size={16} color="#666" />
            <Text style={styles.infoTitle}>Frequency</Text>
            <Text style={styles.infoValue}>{medicine.frequency}</Text>
          </View>
          <View style={styles.infoRow}>
            <Activity size={16} color="#666" />
            <Text style={styles.infoTitle}>Duration</Text>
            <Text style={styles.infoValue}>{medicine.duration} (Started {medicine.startDate})</Text>
          </View>
        </View>

        {/* Medical Info Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FileText size={18} color="#333" />
            <Text style={styles.cardTitle}>Medical Information</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Instructions</Text>
            <Text style={styles.infoValue}>{medicine.instructions}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Side Effects</Text>
            <Text style={styles.infoValue}>{medicine.sideEffects}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitle}>Prescribed by</Text>
            <Text style={styles.infoValue}>{medicine.prescribedBy}</Text>
          </View>
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
  headerButton: {
    padding: 8,
  },
  container: {
    flex: 1,
    padding: 16,
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
  headerCard: {
    backgroundColor: '#E0EFFF', // Light blue background
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pillIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  medicineName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
  },
  medicineGeneric: {
    fontSize: 16,
    color: '#555',
  },
  headerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  dosage: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  // Custom Progress Bar
  progressContainer: {
    height: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 4,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#007AFF',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  // Custom Badge
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    gap: 6,
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
  // Info Rows
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  infoTitle: {
    fontSize: 14,
    color: '#666',
    width: 80, // Aligns the values
  },
  infoValue: {
    fontSize: 15,
    color: '#111',
    fontWeight: '500',
    flex: 1,
  },
  // Info Items (for vertical layout)
  infoItem: {
    paddingVertical: 8,
  },
  bottomSpacer: {
    height: 40,
  }
});