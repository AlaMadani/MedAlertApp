// MedAlertNative/app/(tabs)/schedule.tsx

import {
    Bell,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Clock,
    Moon,
    Sun,
    Sunrise,
    Sunset,
    XCircle
} from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View
} from 'react-native';

// Mock schedule data (copied directly from your file)
const scheduleData: Record<string, any[]> = {
  'Monday': [
    { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'taken', period: 'morning' },
    { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'taken', period: 'afternoon' },
    { id: '3', name: 'Calcium', time: '18:00', dosage: '500mg', status: 'taken', period: 'evening' },
  ],
  'Tuesday': [
    { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'taken', period: 'morning' },
    { id: '2', name: 'Blood Pressure Med', time: '12:00', dosage: '10mg', status: 'pending', period: 'afternoon' },
  ],
  'Wednesday': [
    { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'missed', period: 'morning' },
  ],
  'Thursday': [
    { id: '1', name: 'Vitamin D', time: '08:00', dosage: '1000 IU', status: 'upcoming', period: 'morning' },
  ],
  'Friday': [],
  'Saturday': [],
  'Sunday': [],
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// --- Helper Functions Translated ---

// Returns a lucide icon component
const getPeriodIcon = (period: string) => {
  switch (period) {
    case 'morning':
      return <Sunrise size={18} color="#D97706" />; // text-amber-600
    case 'afternoon':
      return <Sun size={18} color="#059669" />; // text-emerald-600
    case 'evening':
      return <Sunset size={18} color="#6D28D9" />; // text-violet-700
    case 'night':
      return <Moon size={18} color="#4B5563" />; // text-gray-600
    default:
      return <Clock size={18} color="#6B7280" />;
  }
};

// Returns a style object
const getPeriodStyle = (period: string) => {
  switch (period) {
    case 'morning':
      return styles.morningBg;
    case 'afternoon':
      return styles.afternoonBg;
    case 'evening':
      return styles.eveningBg;
    case 'night':
      return styles.nightBg;
    default:
      return styles.defaultBg;
  }
};

// Returns a custom Badge component (View + Text)
const getStatusBadge = (status: string) => {
  let text = '';
  let style = {};
  let textStyle = {};

  switch (status) {
    case 'taken':
      text = 'Taken';
      style = styles.badgeTaken;
      textStyle = styles.badgeTextTaken;
      return (
        <View style={[styles.badge, style]}>
          <CheckCircle size={12} color="#065F46" />
          <Text style={[styles.badgeText, textStyle]}>{text}</Text>
        </View>
      );
    case 'missed':
      text = 'Missed';
      style = styles.badgeMissed;
      textStyle = styles.badgeTextMissed;
      return (
        <View style={[styles.badge, style]}>
          <XCircle size={12} color="#991B1B" />
          <Text style={[styles.badgeText, textStyle]}>{text}</Text>
        </View>
      );
    default:
      return null; // Don't show a badge for 'pending' or 'upcoming'
  }
};

// Returns a style object
const getStatusBorder = (status: string) => {
  switch (status) {
    case 'taken':
      return styles.borderTaken;
    case 'missed':
      return styles.borderMissed;
    case 'pending':
      return styles.borderPending;
    default:
      return styles.borderUpcoming;
  }
};

// --- Main Page Component ---

export default function SchedulePage() {
  const [currentWeek, setCurrentWeek] = useState(0); // Logic for this can be added later
  const [reminderSettings, setReminderSettings] = useState({
    morningReminder: true,
    afternoonReminder: true,
    eveningReminder: true,
    smartNotifications: true
  });

  const toggleSetting = (key: keyof typeof reminderSettings) => {
    setReminderSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Schedule</Text>
      </View>
      
      <ScrollView style={styles.container}>
        {/* Week Navigator */}
        <View style={styles.weekNavigator}>
          <TouchableOpacity style={styles.chevronButton}>
            <ChevronLeft size={24} color="#007AFF" />
          </TouchableOpacity>
          <View>
            <Text style={styles.weekText}>This Week</Text>
            <Text style={styles.weekDateRange}>Nov 10 - Nov 16</Text>
          </View>
          <TouchableOpacity style={styles.chevronButton}>
            <ChevronRight size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Reminder Settings Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Bell size={20} color="#333" />
            <Text style={styles.cardTitle}>Reminders</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Morning Reminder</Text>
            <Switch
              value={reminderSettings.morningReminder}
              onValueChange={() => toggleSetting('morningReminder')}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Afternoon Reminder</Text>
            <Switch
              value={reminderSettings.afternoonReminder}
              onValueChange={() => toggleSetting('afternoonReminder')}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingText}>Evening Reminder</Text>
            <Switch
              value={reminderSettings.eveningReminder}
              onValueChange={() => toggleSetting('eveningReminder')}
            />
          </View>
          <View style={styles.separator} />
          <View style={styles.settingItem}>
            <View>
              <Text style={styles.settingText}>Smart Notifications</Text>
              <Text style={styles.settingDescription}>Only remind if not taken</Text>
            </View>
            <Switch
              value={reminderSettings.smartNotifications}
              onValueChange={() => toggleSetting('smartNotifications')}
            />
          </View>
        </View>

        {/* Schedule List */}
        {days.map((day) => (
          <View key={day} style={styles.dayCard}>
            <Text style={styles.dayTitle}>{day}</Text>
            <View style={styles.doseList}>
              {scheduleData[day] && scheduleData[day].length > 0 ? (
                scheduleData[day].map((dose) => (
                  <View 
                    key={dose.id} 
                    style={[
                      styles.doseItem, 
                      getPeriodStyle(dose.period), // Background
                      getStatusBorder(dose.status) // Left border
                    ]}
                  >
                    <View style={styles.doseLeft}>
                      {getPeriodIcon(dose.period)}
                      <Text style={styles.doseTime}>{dose.time}</Text>
                    </View>
                    <View style={styles.doseMiddle}>
                      <Text style={styles.doseName}>{dose.name}</Text>
                      <Text style={styles.doseDosage}>{dose.dosage}</Text>
                    </View>
                    {getStatusBadge(dose.status)}
                  </View>
                ))
              ) : (
                <View style={styles.noDoseItem}>
                  <Text style={styles.noDoseText}>No medicines scheduled</Text>
                </View>
              )}
            </View>
          </View>
        ))}
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
    padding: 16,
  },
  weekNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  chevronButton: {
    padding: 8,
  },
  weekText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  weekDateRange: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  dayCard: {
    marginBottom: 16,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  doseList: {
    gap: 8,
  },
  doseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 4,
  },
  doseLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: 90,
  },
  doseTime: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  doseMiddle: {
    flex: 1,
    gap: 2,
  },
  doseName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111',
  },
  doseDosage: {
    fontSize: 13,
    color: '#666',
  },
  noDoseItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDoseText: {
    fontSize: 14,
    color: '#888',
  },
  // Background Colors
  morningBg: { backgroundColor: '#FEF9C3' }, // yellow-100
  afternoonBg: { backgroundColor: '#D1FAE5' }, // emerald-100
  eveningBg: { backgroundColor: '#EDE9FE' }, // violet-100
  nightBg: { backgroundColor: '#F3F4F6' }, // gray-100
  defaultBg: { backgroundColor: '#FFFFFF' },
  // Border Colors
  borderTaken: { borderColor: '#10B981' }, // green-500
  borderMissed: { borderColor: '#EF4444' }, // red-500
  borderPending: { borderColor: '#F59E0B' }, // amber-500
  borderUpcoming: { borderColor: '#3B82F6' }, // blue-500
  // Badge Styles
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 8,
    gap: 4,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '500',
  },
  badgeTaken: {
    backgroundColor: '#A7F3D0', // green-200
  },
  badgeTextTaken: {
    color: '#065F46', // green-800
  },
  badgeMissed: {
    backgroundColor: '#FECACA', // red-200
  },
  badgeTextMissed: {
    color: '#991B1B', // red-800
  },
  bottomSpacer: {
    height: 40,
  }
});