import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import JournalScreen from '../screens/JournalScreen';
import RulesScreen from '../screens/RulesScreen';
import ReminderScreen from '../screens/ReminderScreen';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#6366f1' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' }
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Daily Discipline' }} 
      />
      <Stack.Screen 
        name="Journal" 
        component={JournalScreen} 
        options={{ title: 'Journal' }} 
      />
      <Stack.Screen 
        name="Rules" 
        component={RulesScreen} 
        options={{ title: 'Rules' }} 
      />
      <Stack.Screen 
        name="Reminder" 
        component={ReminderScreen} 
        options={{ title: 'Reminder' }} 
      />
    </Stack.Navigator>
  );
}