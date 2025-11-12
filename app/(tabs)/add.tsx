// MedAlertNative/app/(tabs)/add.tsx

import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Clock, Droplets, Pill, Sparkles, Syringe, Trash2 } from 'lucide-react-native';
import React, { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// We must create our own components to replace 'shadcn/ui'
// This is a simple reusable button
const CustomButton = ({ title, onPress, style, textStyle }: any) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

// We need a component for Select/Picker. 
// For now, we will use simple TextInputs as placeholders.
// We can install a library like '@react-native-picker/picker' later.

export default function AddMedicinePage() {
  const router = useRouter(); // Used for navigation
  const [medicineName, setMedicineName] = useState('');
  const [dosage, setDosage] = useState('');
  const [medicineType, setMedicineType] = useState('');
  const [frequency, setFrequency] = useState('');
  const [duration, setDuration] = useState('');
  const [notes, setNotes] = useState('');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [reminderTimes, setReminderTimes] = useState(['08:00']);

  // This data is perfect, we just use lucide-react-native
  const medicineTypes = [
    { value: 'tablet', label: 'Tablet', icon: Pill },
    { value: 'capsule', label: 'Capsule', icon: Pill },
    { value: 'liquid', label: 'Liquid', icon: Droplets },
    { value: 'injection', label: 'Injection', icon: Syringe },
    { value: 'drops', label: 'Drops', icon: Droplets },
  ];

  // All your functions are copied directly!
  const addReminderTime = () => {
    setReminderTimes([...reminderTimes, '12:00']);
  };

  const removeReminderTime = (index: number) => {
    const newTimes = reminderTimes.filter((_, i) => i !== index);
    setReminderTimes(newTimes);
  };

  const updateReminderTime = (index: number, time: string) => {
    const newTimes = [...reminderTimes];
    newTimes[index] = time;
    setReminderTimes(newTimes);
  };

  return (
    // SafeAreaView avoids the top notch and bottom bar
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        {/* The 'onBack' prop is replaced with router.back() */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Medicine 💊</Text>
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      {/* ScrollView is the new <div> for scrolling content */}
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {/* Medicine Photo Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Camera size={18} color="#555" />
            <Text style={styles.cardHeaderText}>Medicine Photo (Optional)</Text>
          </View>
          <TouchableOpacity style={styles.photoBox}>
            <View style={styles.photoIconCircle}>
              <Camera size={24} color="#FFF" />
            </View>
            <Text style={styles.photoText}>Tap to add photo</Text>
            <Text style={styles.photoSubtext}>Help identify your medicine</Text>
          </TouchableOpacity>
        </View>

        {/* Basic Information Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Pill size={20} color="#007AFF" />
            <Text style={styles.cardHeaderText}>Basic Information</Text>
          </View>
          
          <Text style={styles.label}>Medicine Name *</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter medicine name"
            value={medicineName}
            onChangeText={setMedicineName} // <-- This is the native way
          />

          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 500mg"
                value={dosage}
                onChangeText={setDosage}
              />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Type</Text>
              {/* This was a <Select>. We use a simple input for now. */}
              <TextInput
                style={styles.input}
                placeholder="e.g., Tablet"
                value={medicineType}
                onChangeText={setMedicineType}
              />
            </View>
          </View>
        </View>

        {/* Reminders Card */}
        <View style={styles.card}>
          <View style={styles.rowJustify}>
            <View style={styles.cardHeader}>
              <Clock size={20} color="#FFA500" />
              <Text style={styles.cardHeaderText}>Reminders</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Enable</Text>
              <Switch
                value={reminderEnabled}
                onValueChange={setReminderEnabled}
              />
            </View>
          </View>

          {reminderEnabled && (
            <View>
              {reminderTimes.map((time, index) => (
                <View key={index} style={styles.rowJustify}>
                  <TextInput
                    style={[styles.input, { flex: 1, marginRight: 10 }]}
                    value={time}
                    onChangeText={(text) => updateReminderTime(index, text)}
                    // We can use a proper TimePicker component later
                  />
                  {reminderTimes.length > 1 && (
                    <TouchableOpacity onPress={() => removeReminderTime(index)}>
                      <Trash2 size={20} color="#FF3B30" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              <CustomButton title="Add Another Time" onPress={addReminderTime} />
            </View>
          )}
        </View>

        {/* Notes Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Sparkles size={20} color="#8A2BE2" />
            <Text style={styles.cardHeaderText}>Additional Notes</Text>
          </View>
          <TextInput
            style={[styles.input, styles.textarea]}
            placeholder="Any special instructions..."
            value={notes}
            onChangeText={setNotes}
            multiline={true}
            numberOfLines={4}
          />
        </View>
        
        {/* Save Button */}
        <CustomButton
          title="✨ Save Medicine"
          onPress={() => {}}
          style={styles.mainSaveButton}
          textStyle={styles.mainSaveButtonText}
        />

      </ScrollView>
    </SafeAreaView>
  );
}

//
// This is the React Native version of your CSS!
//
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  saveButton: {
    padding: 8,
  },
  saveButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
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
  cardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  photoBox: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  photoIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  photoText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
  },
  photoSubtext: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
    marginTop: 8,
  },
  input: {
    backgroundColor: '#F4F6F8',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textarea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowJustify: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  column: {
    flex: 1,
  },
  button: {
    backgroundColor: '#E0E0E0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  mainSaveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 16,
  },
  mainSaveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  }
});