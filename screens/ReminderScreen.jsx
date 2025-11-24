import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { scheduleDailyReminder, cancelReminder, checkNotificationStatus } from '../utils/notifications';

export default function ReminderScreen() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    const enabled = await checkNotificationStatus();
    setIsEnabled(enabled);
  };

  const enableReminder = async () => {
    const success = await scheduleDailyReminder();
    if (success) {
      setIsEnabled(true);
      Alert.alert('Success', 'Daily reminder set for 8:00 PM');
    }
  };

  const disableReminder = async () => {
    await cancelReminder();
    setIsEnabled(false);
    Alert.alert('Disabled', 'Daily reminder has been turned off');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Daily Reminder</Text>
        <Text style={styles.subtitle}>
          Get reminded to write your journal every day
        </Text>
      </View>

      <View style={styles.reminderCard}>
        <Text style={styles.reminderTime}>🔔 8:00 PM</Text>
        <Text style={styles.reminderMessage}>
          "Write your one-line journal today."
        </Text>
        <Text style={styles.reminderStatus}>
          Status: {isEnabled ? '✓ Enabled' : '⚬ Disabled'}
        </Text>
      </View>

      {!isEnabled ? (
        <TouchableOpacity style={styles.saveButton} onPress={enableReminder}>
          <Text style={styles.saveButtonText}>Enable Daily Reminder</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={[styles.saveButton, styles.disableButton]}
          onPress={disableReminder}
        >
          <Text style={styles.saveButtonText}>Disable Reminder</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.hint}>
        You'll receive a notification every day at 8 PM to complete your journal entry.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  reminderCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reminderTime: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 12,
  },
  reminderMessage: {
    fontSize: 16,
    color: '#475569',
    textAlign: 'center',
    marginBottom: 16,
  },
  reminderStatus: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  disableButton: {
    backgroundColor: '#ef4444',
  },
  hint: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});