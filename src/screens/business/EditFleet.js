import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import DatePicker from 'react-native-date-picker';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import businessRoutes from '../../navigation/routs/businessRouts';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';

export default DeliveryHistory = ({navigation, route}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const {item} = route.params;
  const [open, setOpen] = useState(false);

  // console.log(item);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);

  const [fleet, setFleets] = useState({});
  console.log('text', item);

  const [requestData, setRequestData] = useState({
    ridername: item?.name || '',
    riderPhone: item?.phone || '',
    VechicleType: item?.vehicle?.vehicle_type || '',
    vehiclenumber: item?.vehicle?.vehicle_number || '',
  });

  const updateFleet = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.updateFleet, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        dispatchid: user.id,
        fleetid: item?._id,
        name: requestData.ridername,
        phone: requestData.riderPhone,
        vehicle_type: requestData.VechicleType,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        setProcessing(false);
        if (response.ok) {
          navigation.goBack()
          Toast.show({
            type: 'success',
            text1: 'update successful',
            text2: data.message,
          });

        } else {
          Toast.show({
            type: 'error',
            text1: 'update failed',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log('update error:', data);
        }
      })
      .catch(error => {
        setProcessing(false);
        Toast.show({
          type: 'error',
          text1: 'update failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('update error:', error);
      });
  };

  // console.log(item?.vehicle?.vehicle_type);
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
              source={
                item?.photo
                  ? {uri: item?.photo}
                  : require('../../../assets/images/back.png')
              }
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
            {item?.name}
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,

            backgroundColor: colors[colorScheme].background,
            elevation: 1,
            paddingHorizontal: 32,
            paddingVertical: 32,
          }}>
          <TouchableOpacity onPress={() => {}}>
            <Image
              source={require('../../../assets/images/user.png')}
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </TouchableOpacity>
          <InputField
            theme={appearance}
            value={requestData.ridername}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                ridername: text,
              }))
            }
            placeholder="Name"
            containerStyle={styles.input}
          />

          <InputField
            theme={appearance}
            value={requestData.riderPhone}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                riderPhone: text,
              }))
            }
            placeholder="Phone Number"
            containerStyle={styles.input}
            Yes
          />

          <InputField
            theme={appearance}
            value={requestData.VechicleType}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                VechicleType: text,
              }))
            }
            placeholder="Vehicle Type"
            containerStyle={styles.input}
          />

          <Button
            title={'Update'}
            buttonStyle={{
              marginBottom: 50,
              marginHorizontal: 20,
              borderRadius: 30,
              marginTop: 20,
            }}
            loading={processing}
            enabled={true}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
              updateFleet()
              // uploadImage(packageImage, url => verify(url));
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
