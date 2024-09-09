import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Dimensions, Platform, useWindowDimensions } from 'react-native';
import BookList from './screens/BookList';
import BookDetails from './screens/BookDetails';
import Cart from './screens/Cart';

const Stack = createStackNavigator();

const App = () => {
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState(width > height ? 'landscape' : 'portrait');

  useEffect(() => {
    const updateOrientation = ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);

    return () => subscription?.remove();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={orientation === 'portrait' ? 'dark-content' : 'light-content'}
        backgroundColor={orientation === 'portrait' ? '#ffffff' : '#000000'}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'ios' ? '#f8f8f8' : '#6200ee',
          },
          headerTintColor: Platform.OS === 'ios' ? '#000000' : '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen name="BookList" component={BookList} options={{ title: 'Cửa hàng Sách' }} />
        <Stack.Screen name="BookDetails" component={BookDetails} options={{ title: 'Chi tiết Sách' }} />
        <Stack.Screen name="Cart" component={Cart} options={{ title: 'Giỏ hàng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;