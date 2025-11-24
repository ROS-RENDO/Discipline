import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { saveRuleCompletion, loadRuleCompletion } from '../utils/storage';

const RULES = [
  { id: 1, text: 'Wake up at the same time every day' },
  { id: 2, text: 'Make your bed within 5 minutes of waking' },
  { id: 3, text: 'Drink water before checking your phone' },
  { id: 4, text: 'Exercise for at least 20 minutes' },
  { id: 5, text: 'Read for 15 minutes' },
  { id: 6, text: 'Complete one important task before noon' },
  { id: 7, text: 'Limit social media to 30 minutes total' },
  { id: 8, text: 'Eat a healthy meal with no distractions' },
  { id: 9, text: 'Spend time outside in natural light' },
  { id: 10, text: 'Go to bed at the same time every night' }
];

export default function RulesScreen() {
  const [completions, setCompletions] = useState({});

  useEffect(() => {
    loadCompletions();
  }, []);

  const loadCompletions = async () => {
    const loaded = {};
    for (const rule of RULES) {
      loaded[rule.id] = await loadRuleCompletion(rule.id);
    }
    setCompletions(loaded);
  };

  const toggleRule = async (ruleId) => {
    const newValue = !completions[ruleId];
    setCompletions(prev => ({ ...prev, [ruleId]: newValue }));
    await saveRuleCompletion(ruleId, newValue);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>Discipline Rules</Text>
        <Text style={styles.subtitle}>Check off what you've completed today</Text>
      </View>

      {RULES.map(rule => (
        <TouchableOpacity
          key={rule.id}
          style={[
            styles.ruleCard,
            completions[rule.id] && styles.ruleCardCompleted
          ]}
          onPress={() => toggleRule(rule.id)}
        >
          <View style={styles.ruleContent}>
            <Text style={[
              styles.checkbox,
              completions[rule.id] && styles.checkboxCompleted
            ]}>
              {completions[rule.id] ? '✓' : '○'}
            </Text>
            <Text style={[
              styles.ruleText,
              completions[rule.id] && styles.ruleTextCompleted
            ]}>
              {rule.text}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
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
  ruleCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  ruleCardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
    borderWidth: 2,
  },
  ruleContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    fontSize: 24,
    marginRight: 12,
    color: '#cbd5e1',
  },
  checkboxCompleted: {
    color: '#10b981',
  },
  ruleText: {
    fontSize: 16,
    color: '#1e293b',
    flex: 1,
  },
  ruleTextCompleted: {
    color: '#059669',
  },
});