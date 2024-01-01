import React, { useContext, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import mainRouts from '../routs/mainRouts';
import Home from '../../screens/home/Home';



// const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

// export default DrawerStack = () => {
//     return (
//         <Drawer.Navigator 
//         // drawerContent={DrawerContent}
//         >
//             <Drawer.Screen
//                 name="Main"
//                 component={AuthPassed}
//                 options={{ headerShown: false }}
//             />
//             {/* <Drawer.Screen
//                 name={mainRouts.home}
//                 component={Home}
//                 options={{ headerShown: false }}
//             />
//             <Drawer.Screen name={profileRouts.welcome} component={Welcome} options={{ headerShown: false }} />
//             <Drawer.Screen name={mainRouts.updateVehicle} component={updateVehicleInfo} options={{ headerShown: false }} /> */}

//         </Drawer.Navigator>
//     );
// };

// const BottomNavStack = () => {
//     return (
//         <Tab.Navigator
//             screenOptions={({ route }) => ({
//                 tabBarIcon: ({ focused, color, size }) => {
//                     let iconName;
//                     switch (route.name) {
//                         case mainRouts.home:
//                             iconName = <CompassIcon fill={color} />;
//                             break;
//                         case mainRouts.history:
//                             iconName = <RecentIcon fill={color} />;
//                             break;
//                         case mainRouts.settings:
//                             iconName = <SettingsIcon fill={color} />;
//                             break;
//                     }
//                     return iconName;
//                 },
//                 tabBarActiveTintColor: colors.primary,
//                 tabBarInactiveTintColor: colors.inactiveTab,
//                 tabBarStyle: {
//                     backgroundColor: colors.white,
//                     height: 60,
//                 },
//                 tabBarLabelStyle: {
//                     fontSize: 12,
//                     fontFamily: 'Poppins-Regular',
//                     marginBottom: 5,
//                     display: 'none',
//                 },

//             })}>


//         </Tab.Navigator>
//     );
// };


export default AuthPassed = () => {
    // const { user } = useContext(AuthContext);
    // const [isLoading, setIsLoading] = useState(true);
    // useEffect(() => {
    //     setTimeout(() => {
    //         if (user?.vehicle?.carModel) {
    //             if (user?.kyc?.type) {
    //                 if (user?.account?.accountNumber) {
    //                     navigation.navigate(mainRouts.home)
    //                     setIsLoading(false)
    //                 } else {
    //                     navigation.navigate(profileRouts.setBank)
    //                     setIsLoading(false)
    //                 }
    //             } else {
    //                 navigation.navigate(profileRouts.welcome)
    //                 setIsLoading(false)
    //             }
    //         } else {
    //             navigation.navigate(mainRouts.updateVehicle)
    //             setIsLoading(false)
    //         }
    //     }, 300);
    // }, [user]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name={mainRouts.home}
                component={Home}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen name={profileRouts.editProfile} component={EditProfile} options={{ headerShown: false }} /> */}
        </Stack.Navigator>

    );
};