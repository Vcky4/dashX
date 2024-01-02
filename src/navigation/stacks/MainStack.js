import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';
import profileRouts from '../routs/profileRouts';
import EditProfile from '../../screens/profile/EditProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';



const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
    return (
        <Drawer.Navigator drawerContent={DrawerContent}>
            <Drawer.Screen name="Main" component={AuthPassed} options={{ headerShown: false }} />
        </Drawer.Navigator>
    );
};

const AuthPassed = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={mainRouts.home}
                component={Home}
                options={{ headerShown: false }}
            />
            <Stack.Screen name={profileRouts.editProfile} component={EditProfile} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};