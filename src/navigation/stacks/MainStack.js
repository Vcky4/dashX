import React, { useContext, useEffect, useRef, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';
import profileRouts from '../routs/profileRouts';
import EditProfile from '../../screens/profile/EditProfile';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import { View, Text, Image, FlatList, Dimensions } from 'react-native';
import BottomSheet from 'react-native-simple-bottom-sheet';
import colors from '../../../assets/colors/colors';
import { AuthContext } from '../../../context/AuthContext';
import PendingOrder from '../../screens/home/PendingOrder';
import VerifyPickUp from '../../screens/home/VerifyPickUp';
import Profile from '../../screens/profile/Profile';


const { width, height } = Dimensions.get('window');


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
    const panelRef = useRef(null);
    const { colorScheme } = useContext(AuthContext)
    const [isOpen, setIsOpen] = useState(false)

    const openPanel = () => {
        panelRef.current?.togglePanel()
    }
    return (
        <>
            <Drawer.Navigator drawerContent={(props) => DrawerContent(props, () => { openPanel() })}>
                <Drawer.Screen name="Main" component={AuthPassed} options={{ headerShown: false }} />
            </Drawer.Navigator>
            <BottomSheet isOpen={false}
                wrapperStyle={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    elevation: 10,
                    backgroundColor: colors[colorScheme].background,
                    flex: 1,
                }}
                sliderMaxHeight={height * 0.8}
                outerContentStyle={{
                    width: width,
                    left: -20.5,
                }}
                lineContainerStyle={{
                    // display: 'none'
                }}
                sliderMinHeight={0}
                onOpen={() => {
                    setIsOpen(true)
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                ref={ref => panelRef.current = ref}>
                <View style={{
                    backgroundColor: '#E6CEF2',
                    top: -95,
                    alignSelf: 'center',
                    borderRadius: 30,
                    position: 'absolute',
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    display: isOpen ? 'flex' : 'none'
                }}>
                    <Text style={{
                        color: colors[colorScheme].black,
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                    }}>Pending  Orders</Text>
                </View>
                <PendingOrder />
            </BottomSheet>
        </>
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
            <Stack.Screen name={mainRouts.verifyPickup} component={VerifyPickUp} options={{ headerShown: false }} />
            <Stack.Screen name={profileRouts.profile} component={Profile} options={{ headerShown: false }} />
        </Stack.Navigator>

    );
};