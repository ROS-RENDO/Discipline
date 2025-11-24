import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { saveJournal, loadJournal } from '../utils/storage';

export default function JournalScreen() {
  const [entry, setEntry] = useState('');

  useEffect(() => {
    loadEntry();
  }, []);

  const loadEntry = async () => {
    const savedEntry = await loadJournal();
    setEntry(savedEntry);
  };

  const handleSave = async () => {
    await saveJournal(entry);
    Alert.alert('Success', 'Journal entry saved!');
  };

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>One-Line Journal</Text>
        <Text style={styles.subtitle}>What did you learn today?</Text>
      </View>

      <View style={styles.inputCard}>
        <TextInput
          style={styles.input}
          value={entry}
          onChangeText={setEntry}
          placeholder="Write one thing you learned today..."
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Entry</Text>
      </TouchableOpacity>

      <Text style={styles.hint}>
        Tip: Keep it simple. One meaningful lesson per day.
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
  inputCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: '#1e293b',
    minHeight: 100,
    textAlignVertical: 'top',
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
  hint: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});