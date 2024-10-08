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
import History from '../../screens/profile/History';
import OrderDetails from '../../screens/profile/OrderDetails';
import { useNavigation } from '@react-navigation/native';
import Wallet from '../../screens/wallet/Wallet';
import Withdraw from '../../screens/wallet/Withdraw';
import Deposit from '../../screens/wallet/Deposit';
import businessRoutes from '../routs/businessRouts';
import Dashboard from '../../screens/business/Dashboard';
import DeliveryHistory from '../../screens/business/delivery/DeliveryHistory';
import DeliveryDetails from '../../screens/business/delivery/DeliveryDetails';
import TotalOrder from '../../screens/business/order/TotalOrder';
import Order from '../../screens/business/order/Order';
import ActiveOrders from '../../screens/business/order/ActiveOrders';
import ActiveRider from '../../screens/business/Rider/ActiveRider';
import Monitor from '../../screens/business/monitor/Monitor';

import Rider from '../../screens/business/Rider';

import TotalFleet from '../../screens/business/TotalFleet';
import FleetDetails from '../../screens/business/FleetDetails';
import Chat from '../../screens/support/Chat';
import EditFleet from '../../screens/business/EditFleet';
import Browser from '../../screens/browser/Browser';
import Analytics from '../../screens/profile/Analytics';

const { width, height } = Dimensions.get('window');

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default DrawerStack = () => {
  const panelRef = useRef(null);
  const { colorScheme, user } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigation();
  const openPanel = () => {
    panelRef.current?.togglePanel();
  };
  return (
    <>
      <Drawer.Navigator
        drawerContent={props =>
          DrawerContent(props, () => {
            openPanel();
          })
        }>
        <Drawer.Screen
          name="Main"
          component={AuthPassed}
          options={{ headerShown: false }}
        />
      </Drawer.Navigator>
      <BottomSheet
        isOpen={false}
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
        lineContainerStyle={
          {
            // display: 'none'
          }
        }
        sliderMinHeight={0}
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          setIsOpen(false);
        }}
        ref={ref => (panelRef.current = ref)}>
        {/* <View
                    style={{
                        backgroundColor: '#E6CEF2',
                        top: -95,
                        alignSelf: 'center',
                        borderRadius: 30,
                        position: 'absolute',
                        paddingHorizontal: 20,
                        paddingVertical: 6,
                        display: isOpen ? 'flex' : 'none',
                    }}>
                    <Text
                        style={{
                            color: colors[colorScheme].black,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>
                        Pending Orders
                    </Text>
                </View> */}
        <PendingOrder
          onClose={() => {
            panelRef.current?.togglePanel();
          }}
          navigation={navigation}
        />
      </BottomSheet>
    </>
  );
};

const AuthPassed = () => {
  const { user } = useContext(AuthContext);
  //   console.log(user);
  const isBusiness = !(user?.personel_account ?? true);
  return (
    <Stack.Navigator>
      {isBusiness ? (
        <>
          <Stack.Screen
            name={businessRoutes.dashboard}
            component={Dashboard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.deliveryHistory}
            component={DeliveryHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.deliveryDetails}
            component={DeliveryDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.totalOrder}
            component={TotalOrder}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.orderDetails}
            component={Order}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.activeOrders}
            component={ActiveOrders}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.activeRider}
            component={ActiveRider}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.monitorRider}
            component={Monitor}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.addRider}
            component={Rider}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.totalFleet}
            component={TotalFleet}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.fleetDetails}
            component={FleetDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.orders}
            component={Order}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={businessRoutes.editFleet}
            component={EditFleet}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name={mainRouts.home}
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={profileRouts.editProfile}
            component={EditProfile}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={mainRouts.verifyPickup}
            component={VerifyPickUp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={profileRouts.orderHistory}
            component={History}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={profileRouts.orderDetails}
            component={OrderDetails}
            options={{ headerShown: false }}
          />
        </>
      )}

      <Stack.Screen
        name={mainRouts.chat}
        component={Chat}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={profileRouts.analytics}
        component={Analytics}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={profileRouts.profile}
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={mainRouts.wallet}
        component={Wallet}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={mainRouts.withdraw}
        component={Withdraw}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={mainRouts.deposit}
        component={Deposit}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={mainRouts.browser}
        component={Browser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
