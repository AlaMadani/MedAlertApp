// MedAlertNative/app/(tabs)/settings.tsx

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Switch 
} from 'react-native';
import { 
  Bell, 
  User, 
  Shield, 
  Smartphone, 
  Moon, 
  Globe, 
  HelpCircle, 
  FileText, 
  MessageSquare,
  ChevronRight,
  Download,
  Trash2,
  Volume2,
  Speaker,
  BellRing // <-- FIX: 'Snooze' changed to 'BellRing'
} from 'lucide-react-native';

// Helper Component: Replaces the web <Separator>
const Separator = () => <View style={styles.separator} />;

//
// --- FIX FOR ERRORS 2 & 3 ---
// Added switchValue and onSwitchChange to the props and types
//
const SettingItem = ({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  onClick,
  switchValue,
  onSwitchChange 
}: {
  icon: React.ElementType;
  title: string;
  description?: string;
  action?: 'switch' | 'chevron' | 'component';
  switchValue?: boolean; // <-- FIX: Added to type
  onSwitchChange?: () => void; // <-- FIX: Added to type
  onClick?: () => void;
}) => (
  <TouchableOpacity 
    style={styles.settingItem} 
    onPress={onClick} 
    disabled={!onClick}
  >
    <View style={styles.settingLeft}>
      <Icon size={22} color="#666" />
      <View style={styles.settingTextContainer}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && <Text style={styles.settingDescription}>{description}</Text>}
      </View>
    </View>
    <View style={styles.settingRight}>
      {action === 'switch' && (
        <Switch
          value={switchValue} // <-- FIX: Now correctly passed as a prop
          onValueChange={onSwitchChange} // <-- FIX: Now correctly passed as a prop
          onStartShouldSetResponder={() => true} 
        />
      )}
      {action === 'chevron' && <ChevronRight size={20} color="#8E8E93" />}
    </View>
  </TouchableOpacity>
);


export default function SettingsPage() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [reminderSnooze, setReminderSnooze] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      
      <ScrollView style={styles.container}>
        
        {/* Profile Card */}
        <TouchableOpacity style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <User size={32} color="#007AFF" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Guest User</Text>
            <Text style={styles.profileEmail}>Edit your profile and info</Text>
          </View>
          <ChevronRight size={20} color="#8E8E93" />
        </TouchableOpacity>

        {/* Notifications Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <SettingItem
            icon={Bell}
            title="All Notifications"
            action="switch"
            switchValue={notificationsEnabled}
            onSwitchChange={() => setNotificationsEnabled(v => !v)}
          />
          <Separator />
          <SettingItem
            icon={Volume2}
            title="Sound"
            action="switch"
            switchValue={soundEnabled}
            onSwitchChange={() => setSoundEnabled(v => !v)}
          />
          <Separator />
          <SettingItem
            icon={Speaker}
            title="Vibration"
            action="switch"
            switchValue={vibrationEnabled}
            onSwitchChange={() => setVibrationEnabled(v => !v)}
          />
          <Separator />
          <SettingItem
            icon={BellRing} // <-- FIX: Using BellRing
            title="Reminder Snooze"
            action="switch"
            switchValue={reminderSnooze}
            onSwitchChange={() => setReminderSnooze(v => !v)}
          />
        </View>

        {/* Appearance Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Appearance</Text>
          <SettingItem
            icon={Moon}
            title="Dark Mode"
            action="switch"
            switchValue={darkMode}
            onSwitchChange={() => setDarkMode(v => !v)}
          />
          <Separator />
          <SettingItem
            icon={Globe}
            title="Language"
            description="English"
            action="chevron"
            onClick={() => {}}
          />
        </View>

        {/* Data Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data & Privacy</Text>
          <SettingItem
            icon={Download}
            title="Export My Data"
            description="Export data as PDF or CSV"
            action="chevron"
            onClick={() => {}}
          />
          <Separator />
          <SettingItem
            icon={Trash2}
            title="Delete All Data"
            description="Permanently delete all data"
            action="chevron"
            onClick={() => {}}
          />
        </View>

        {/* Support Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Support</Text>
          <SettingItem
            icon={HelpCircle}
            title="Help Center"
            action="chevron"
            onClick={() => {}}
          />
          <Separator />
          <SettingItem
            icon={MessageSquare}
            title="Contact Support"
            action="chevron"
            onClick={() => {}}
          />
          <Separator />
          <SettingItem
            icon={FileText}
            title="Terms of Service"
            action="chevron"
            onClick={() => {}}
          />
          <Separator />
          <SettingItem
            icon={Shield}
            title="Privacy Policy"
            action="chevron"
            onClick={() => {}}
          />
        </View>

        {/* App Info */}
        <View style={styles.appInfoContainer}>
          <Text style={styles.appInfoName}>MedAlert</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoBuilt}>
            Built with care to help you manage your medications
          </Text>
        </View>
        
        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

//
// Stylesheet (No changes)
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E0EFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    paddingVertical: 8,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingTextContainer: {
    marginLeft: 16,
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: '#111',
  },
  settingDescription: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  settingRight: {
    //
  },
  separator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginLeft: 54, 
  },
  appInfoContainer: {
    alignItems: 'center',
    padding: 16,
    marginTop: 8,
  },
  appInfoName: {
    fontSize: 16,
    fontWeight: '600',
  },
  appInfoVersion: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  appInfoBuilt: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSpacer: {
    height: 40,
  }
});