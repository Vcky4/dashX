import React, { useContext, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';

export default DeliveryHistory = ({ navigation }) => {
  const { colorScheme, user, token } = useContext(AuthContext);
  console.log(user.id);
  const [requestData, setRequestData] = useState({
    dispatchid: user.id,
    email: "",
    name: "",
    phone: "",
    password: "",
    vehicle_type: ""
  });

  const canProceed = requestData.name.length > 0 && requestData.email.length > 0 && requestData.phone.length > 0 && requestData.password.length > 0 && requestData.vehicle_type.length > 0;

  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const addRider = async () => {
    setProcessing(true);
    try {
      const response = await fetch(endpoints.baseUrl + endpoints.addRider, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        },
        body: JSON.stringify(requestData)
      })
      const json = await response.json()
      console.log(json)
      setProcessing(false);
      if (json.status) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: json.message,
        });
        navigation.goBack();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: json.message,
        });
      }
    } catch (error) {
      console.log(error)
      setProcessing(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    }
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: colors[colorScheme].background,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingHorizontal: 18,
            paddingVertical: 10,
            backgroundColor: colors[colorScheme].primary,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/back.png')}
              style={{
                width: 30,
                height: 30,
                resizeMode: 'contain',
                tintColor: colors[colorScheme].white,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: colors[colorScheme].white,
              fontSize: 18,
              fontFamily: 'Inter-Bold',
              marginStart: 20,
            }}>
            Add Rider
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 42, height: '100%' }}>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 16,
              fontFamily: 'Inter-Bold',
            }}>
            New Rider
          </Text>

          <InputField
            theme={appearance}
            value={requestData.name}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                name: text,
              }))
            }
            placeholder="Rider’s name"
            containerStyle={styles.input}
          />

          <InputField
            theme={appearance}
            value={requestData.email}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                email: text,
              }))
            }
            placeholder="Rider’s email"
            containerStyle={styles.input}
          />
          <InputField
            theme={appearance}
            value={requestData.phone}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                phone: text,
              }))
            }
            placeholder="Rider’s phone number"
            containerStyle={styles.input}
          />

          <PasswordInput
            theme={appearance}
            value={requestData.password}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                password: text,
              }))
            }
            placeholder="Password"
            placeholderTextColor={'#AEAEAE'}
            containerStyle={styles.input}
          />

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 30,
              borderWidth: 1,
              paddingVertical: 10,
              paddingHorizontal: 10,
              marginTop: 20,
              borderColor: colors[appearance].primary,
              justifyContent: 'space-between',
            }}
            onPress={() => {
              setDropDown(!dropDown);
            }}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                paddingStart: 10,
                color: requestData.vehicle_type.length > 0 ? colors[colorScheme].textDark : '#AEAEAE',
              }}>
              {requestData.vehicle_type.length > 0
                ? requestData.vehicle_type
                : 'Select vehicle type'}
            </Text>
            <Image
              style={{ height: 24, width: 24 }}
              source={require('../../../assets/images/dropDown.png')}
            />
          </TouchableOpacity>

          <View
            style={{
              backgroundColor: colors[appearance].background,
              elevation: 5,
              width: 168,
              alignSelf: 'flex-end',
              marginTop: 20,
              paddingHorizontal: 14,
              paddingVertical: 10,
              display: dropDown ? 'flex' : 'none',
            }}>
            <TouchableOpacity
              onPress={() => {
                setRequestData(prestate => ({
                  ...prestate,
                  vehicle_type: 'Bike',
                }));
                setDropDown(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../assets/images/Scotter.png')}
              />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                Bike
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestData(prestate => ({
                  ...prestate,
                  vehicle_type: 'Car',
                }));
                setDropDown(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../assets/images/sedan.png')}
              />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                Car
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestData(prestate => ({
                  ...prestate,
                  vehicle_type: 'Van',
                }));
                setDropDown(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../assets/images/van.png')}
              />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                Van
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setRequestData(prestate => ({
                  ...prestate,
                  vehicle_type: 'Truck',
                }));
                setDropDown(false);
              }}
              style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                style={{ height: 24, width: 24 }}
                source={require('../../../assets/images/Trucks.png')}
              />
              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  paddingStart: 10,
                  color: colors[appearance].textDark,
                }}>
                Truck
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title="Add Account"
            buttonStyle={{
              marginTop: 30,
              marginHorizontal: 20,
              borderRadius: 30,
              alignSelf: 'flexEnd',
            }}
            loading={processing}
            enabled={canProceed && !processing}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
              addRider()
              // navigation.navigate(authRouts.otpVerification)
            }}
          />
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
});
