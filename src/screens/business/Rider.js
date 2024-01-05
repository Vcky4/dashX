import React, {useContext, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import DatePicker from 'react-native-date-picker';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';

export default DeliveryHistory = ({navigation}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    ridername: '',
    riderPhone: '',
    password: '',
    upLoadImage: '',
    VechicleType: '',
  });

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [isSelected, setIsSelected] = useState('');

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
            Delivery History
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 42, height: '100%'}}>
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
            value={requestData.ridername}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                ridername: text,
              }))
            }
            placeholder="Rider’s name"
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
            placeholder="Rider’s phone number"
            containerStyle={styles.input}
          />

          <PasswordInput
            theme={appearance}
            value={requestData.password}
            onChangeText={text =>
              setRequestData(preState => ({
                ...preState,
                riderPhone: text,
              }))
            }
            placeholder="Password"
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
            }}
            onPress={() => {}}>
            <Text
              style={{
                fontFamily: 'Inter-Regular',
                fontSize: 16,
                paddingStart: 10,
                color: colors[appearance].subText,
              }}>
              {requestData.upLoadImage.length > 0
                ? requestData.upLoadImage
                : 'Upload rider image'}
            </Text>
          </TouchableOpacity>

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
                color: colors[appearance].subText,
              }}>
              {requestData.VechicleType.length > 0
                ? requestData.VechicleType
                : 'Select vehicle type'}
            </Text>
            <Image
              style={{height: 24, width: 24}}
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
                  VechicleType: 'Bike',
                }));
                setDropDown(false);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 24, width: 24}}
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
                  VechicleType: 'Car',
                }));
                setDropDown(false);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 24, width: 24}}
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
                  VechicleType: 'Van',
                }));
                setDropDown(false);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 24, width: 24}}
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
                  VechicleType: 'Truck',
                }));
                setDropDown(false);
              }}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={{height: 24, width: 24}}
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
            enabled={!processing}
            textColor={colors[appearance].textDark}
            buttonColor={colors[appearance].primary}
            onPress={() => {
              loginUser();
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
