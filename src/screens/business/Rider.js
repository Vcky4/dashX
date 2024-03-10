import React, { useContext, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';
import colors from '../../../assets/colors/colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const DeliveryHistory = ({ navigation }) => {
  const { colorScheme, user, token } = useContext(AuthContext);
  const appearance = colorScheme;
  const [dropDown, setDropDown] = useState(false);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Rider’s name is required'),
    email: Yup.string().email('Invalid email').required('Rider’s email is required'),
    phone: Yup.string().required('Rider’s phone number is required'),
    password: Yup.string().required('Password is required'),
    vehicle_type: Yup.string().required('Vehicle type is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    try {
      const response = await fetch(endpoints.baseUrl + endpoints.addRider, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ ...values, dispatchid: user.id }),
      });
      const json = await response.json();
      console.log(json);
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
      console.log(error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        password: '',
        vehicle_type: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit,isValid, values, errors, touched, isSubmitting }) => (
        <View style={{ flex: 1, backgroundColor: colors[colorScheme].background }}>
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
            <ScrollView>
              <KeyboardAwareScrollView>
                <InputField
                  theme={colorScheme}
                  value={values.name}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  placeholder="Rider’s name"
                  containerStyle={styles.input}
                />
                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                <View style={{
                  position: 'relative',
                  zIndex: 1
                }}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 30,
                      borderWidth: 1,
                      paddingVertical: 10,
                      paddingHorizontal: 10,
                      marginTop: 20,
                      borderColor: colors[colorScheme].primary,
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
                        color: values.vehicle_type.length > 0 ? colors[colorScheme].textDark : '#AEAEAE',
                      }}>
                      {values.vehicle_type.length > 0 ? values.vehicle_type : 'Select vehicle type'}
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
                      position: 'absolute',
                      top: 60,
                      paddingHorizontal: 14,
                      paddingVertical: 10,
                      display: dropDown ? 'flex' : 'none',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleChange('vehicle_type')('bike');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Bike',
                        // }));
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
                        handleChange('vehicle_type')('car');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Car',
                        // }));
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
                        handleChange('vehicle_type')('van');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Van',
                        // }));
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
                        handleChange('vehicle_type')('Small truck');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Small truck',
                        // }));
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
                        Small Truck
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleChange('vehicle_type')('Medium truck');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Medium truck',
                        // }));
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
                        Medium truck
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleChange('vehicle_type')('Big truck');
                        // setRequestData(prestate => ({
                        //   ...prestate,
                        //   vehicle_type: 'Big truck',
                        // }));
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
                          color: colors[colorScheme].textDark,
                        }}>
                        Big truck
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {touched.vehicle_type && errors.vehicle_type && <Text style={styles.error}>{errors.vehicle_type}</Text>}
                <InputField
                  theme={colorScheme}
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Rider’s email"
                  containerStyle={styles.input}
                />
                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

                <InputField
                  theme={colorScheme}
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  placeholder="Rider’s phone number"
                  containerStyle={styles.input}
                />
                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

                <PasswordInput
                  theme={colorScheme}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Password"
                  placeholderTextColor={'#AEAEAE'}
                  containerStyle={styles.input}
                />
                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                <Button
                  title="Add Account"
                  buttonStyle={{
                    marginTop: 30,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    alignSelf: 'flexEnd',
                  }}
                  loading={isSubmitting}
                  enabled={isValid && !isSubmitting}
                  textColor={colors[colorScheme].textDark}
                  buttonColor={colors[colorScheme].primary}
                  onPress={handleSubmit}
                />
              </KeyboardAwareScrollView>
            </ScrollView>

          </View>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 10,
  },
});

export default DeliveryHistory;
