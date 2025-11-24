// App.js
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import { requestPermissions } from './utils/notifications';

export default function App() {
  useEffect(() => {
    requestPermissions();
  }, []);

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}