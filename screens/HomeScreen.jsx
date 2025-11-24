import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { loadJournal, loadRuleCompletion } from '../utils/storage';

export default function HomeScreen({ navigation }) {
  const [journalEntry, setJournalEntry] = useState('');
  const [completedRules, setCompletedRules] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    return unsubscribe;
  }, [navigation]);

  const loadData = async () => {
    const entry = await loadJournal();
    setJournalEntry(entry);
    
    let completed = 0;
    for (let i = 1; i <= 10; i++) {
      const isCompleted = await loadRuleCompletion(i);
      if (isCompleted) completed++;
    }
    setCompletedRules(completed);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Daily Discipline Coach</Text>
        <Text style={styles.subtitle}>Build better habits, one day at a time</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Progress</Text>
        <Text style={styles.progressText}>Rules Completed: {completedRules}/10</Text>
        <Text style={styles.progressText}>
          Journal: {journalEntry ? '✓ Written' : '⚬ Not yet'}
        </Text>
      </View>

      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Journal')}
        >
          <Text style={styles.buttonText}>📝 Daily Journal</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Rules')}
        >
          <Text style={styles.buttonText}>📋 Discipline Rules</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Reminder')}
        >
          <Text style={styles.buttonText}>🔔 Daily Reminders</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  progressText: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 8,
  },
  buttonGroup: {
    gap: 12,
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});