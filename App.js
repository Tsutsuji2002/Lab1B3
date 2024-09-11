import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar, Dimensions, Platform, useColorScheme } from 'react-native';
import BookList from './screens/BookList';
import BookDetails from './screens/BookDetails';
import Cart from './screens/Cart';

const Stack = createStackNavigator();

const colors = {
  light: {
    background: '#ffffff',
    text: '#000000',
    statusBar: 'dark-content',
  },
  dark: {
    background: '#000000',
    text: '#ffffff',
    statusBar: 'light-content',
  },
};

const App = () => {
  const [orientation, setOrientation] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height ? 'landscape' : 'portrait'
  );
  const colorScheme = useColorScheme();

  useEffect(() => {
    const updateOrientation = ({ window }) => {
      setOrientation(window.width > window.height ? 'landscape' : 'portrait');
    };

    const subscription = Dimensions.addEventListener('change', updateOrientation);

    return () => subscription.remove();
  }, []);

  const theme = colors[colorScheme] || colors.light;
  const isLandscape = orientation === 'landscape';

  return (
    <NavigationContainer>
      <StatusBar
        barStyle={isLandscape ? colors.dark.statusBar : theme.statusBar}
        backgroundColor={Platform.OS === 'android' ? (isLandscape ? colors.dark.background : theme.background) : 'transparent'}
      />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isLandscape ? colors.dark.background : theme.background,
          },
          headerTintColor: isLandscape ? colors.dark.text : theme.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="BookList" 
          component={BookList} 
          options={{ title: 'Cửa hàng Sách' }}
          initialParams={{ orientation, theme: isLandscape ? colors.dark : theme }}
        />
        <Stack.Screen 
          name="BookDetails" 
          component={BookDetails} 
          options={{ title: 'Chi tiết Sách' }}
          initialParams={{ orientation, theme: isLandscape ? colors.dark : theme }}
        />
        <Stack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ title: 'Giỏ hàng' }}
          initialParams={{ orientation, theme: isLandscape ? colors.dark : theme }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;