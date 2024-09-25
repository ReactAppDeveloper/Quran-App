import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favorite from '../screens/Favorite';
import Bookmark from '../screens/Bookmark';
import DashBoard from '../screens/DashBoard';
import Setting from '../screens/Setting';
import TranslatePage from '../screens/TranslatePage';
import SurahFullView from '../screens/SurahFullView';
import SurahDetailPage from '../screens/SurahDetailPage';
import AddTafseer from '../screens/AddTafseer';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="DashBoard"
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="DashBoard" component={DashBoard} />
        <Stack.Screen name="Favorite" component={Favorite} />
        <Stack.Screen name="Bookmark" component={Bookmark} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="TranslatePage" component={TranslatePage} />
        <Stack.Screen name="SurahDetailPage" component={SurahDetailPage} />
        <Stack.Screen name="SurahFullView" component={SurahFullView} />
        <Stack.Screen name="AddTafseer" component={AddTafseer} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
