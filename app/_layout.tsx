import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useNavigation } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './(tabs)';
import NotFoundScreen from './+not-found';
import Profile from './Profile';
import Vegetables from './Vegetables';
import VegetableListings from './Listings';
import  ProductDetails  from './ProductDetails';
import ProductListings from './Listings';
import VoiceAssistance from './VoiceAssistance';
import VoiceChatter from './VoiceChatter';
import VoiceChatBubble from './VoiceChatBubble';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


 function RootLayout() {
  const colorScheme = useColorScheme();
  const Stack = createStackNavigator();
  const navigate = useNavigation();

  
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator>
        <Stack.Screen  name="(tabs)" component={Home} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Listings" component={ProductListings} />
        <Stack.Screen name='ProductDetails' component={ProductDetails} 
          options={({ navigation }) => ({
            title: 'Product details'
          })} />        

<Stack.Screen name="VoiceAssistance" component={VoiceAssistance}    options={({ navigation }) => ({
            title: 'Order Voice Assistance'
          })} />      
<Stack.Screen name="VoiceChatter" component={VoiceChatter} />
<Stack.Screen name="VoiceChatBubble" component={VoiceChatBubble} />



  
        <Stack.Screen name="+not-found" component={NotFoundScreen} />

      </Stack.Navigator>

      
    </ThemeProvider>
  );


}



export default RootLayout;
