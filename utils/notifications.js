import * as Notifications from 'expo-notifications';
import { Alert } from 'react-native';
import { saveNotificationId, loadNotificationId } from './storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
};

export const scheduleDailyReminder = async () => {
  const hasPermission = await requestPermissions();
  if (!hasPermission) {
    Alert.alert('Permission Required', 'Please enable notifications in settings');
    return false;
  }
  
  try {
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Discipline Check',
        body: 'Write your one-line journal today.',
        sound: true,
      },
      trigger: {
        hour: 20,
        minute: 0,
        repeats: true,
      },
    });
    
    await saveNotificationId(id);
    return true;
  } catch (error) {
    console.error('Error scheduling notification:', error);
    Alert.alert('Error', 'Failed to schedule notification');
    return false;
  }
};

export const cancelReminder = async () => {
  const id = await loadNotificationId();
  if (id) {
    await Notifications.cancelScheduledNotificationAsync(id);
    await AsyncStorage.removeItem('notification_id');
  }
};

export const checkNotificationStatus = async () => {
  const id = await loadNotificationId();
  return !!id;
};