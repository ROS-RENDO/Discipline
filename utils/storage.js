import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveJournal = async (entry) => {
  try {
    const date = new Date().toDateString();
    await AsyncStorage.setItem(`journal_${date}`, entry);
  } catch (error) {
    console.error('Error saving journal:', error);
  }
};

export const loadJournal = async () => {
  try {
    const date = new Date().toDateString();
    const entry = await AsyncStorage.getItem(`journal_${date}`);
    return entry || '';
  } catch (error) {
    console.error('Error loading journal:', error);
    return '';
  }
};

export const saveRuleCompletion = async (ruleId, completed) => {
  try {
    const date = new Date().toDateString();
    await AsyncStorage.setItem(
      `rule_${ruleId}_${date}`, 
      JSON.stringify(completed)
    );
  } catch (error) {
    console.error('Error saving rule:', error);
  }
};

export const loadRuleCompletion = async (ruleId) => {
  try {
    const date = new Date().toDateString();
    const completed = await AsyncStorage.getItem(`rule_${ruleId}_${date}`);
    return completed ? JSON.parse(completed) : false;
  } catch (error) {
    console.error('Error loading rule:', error);
    return false;
  }
};

export const saveNotificationId = async (id) => {
  try {
    await AsyncStorage.setItem('notification_id', id);
  } catch (error) {
    console.error('Error saving notification ID:', error);
  }
};

export const loadNotificationId = async () => {
  try {
    return await AsyncStorage.getItem('notification_id');
  } catch (error) {
    console.error('Error loading notification ID:', error);
    return null;
  }
};