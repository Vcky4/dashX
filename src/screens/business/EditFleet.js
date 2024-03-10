import React, { useContext } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import { Formik } from 'formik';
import * as Yup from 'yup';
import colors from '../../../assets/colors/colors';
import InputField from '../../component/InputField';
import PasswordInput from '../../component/PasswordInput';
import Button from '../../component/Button';
import endpoints from '../../../assets/endpoints/endpoints';
import Toast from 'react-native-toast-message';

const DeliveryHistory = ({ navigation, route }) => {
  const { colorScheme, user, token } = useContext(AuthContext);
  const { item } = route.params;
  const [dropDown, setDropDown] = React.useState(false);

  const appearance = colorScheme;

  const validationSchema = Yup.object().shape({
    ridername: Yup.string().required('Name is required'),
    riderPhone: Yup.string().required('Phone Number is required'),
    VechicleType: Yup.string().required('Vehicle Type is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await fetch(endpoints.baseUrl + endpoints.updateFleet, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({
          dispatchid: user.id,
          fleetid: item?._id,
          name: values.ridername,
          phone: values.riderPhone,
          vehicle_type: values.VechicleType,
        }),
      });
      const data = await response.json();
      setSubmitting(false);
      if (response.ok) {
        navigation.goBack();
        Toast.show({
          type: 'success',
          text1: 'Update successful',
          text2: data.message,
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Update failed',
          text2: data.message || 'Something went wrong',
        });
      }
    } catch (error) {
      console.error('Update error:', error);
      setSubmitting(false);
      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: error.message || 'Something went wrong',
      });
    }
  };

  return (
    <Formik
      initialValues={{
        ridername: item?.name || '',
        riderPhone: item?.phone || '',
        VechicleType: item?.vehicle?.vehicle_type || '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}>
      {({ handleChange, handleBlur, handleSubmit, isValid, values, errors, touched, isSubmitting }) => (
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
                source={
                  item?.photo
                    ? { uri: item?.photo }
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
            <TouchableOpacity onPress={() => { }}>
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
              value={values.ridername}
              onChangeText={handleChange('ridername')}
              onBlur={handleBlur('ridername')}
              placeholder="Name"
              containerStyle={styles.input}
            />
            {touched.ridername && errors.ridername && (
              <Text style={styles.error}>{errors.ridername}</Text>
            )}

            <InputField
              theme={appearance}
              value={values.riderPhone}
              onChangeText={handleChange('riderPhone')}
              onBlur={handleBlur('riderPhone')}
              placeholder="Phone Number"
              containerStyle={styles.input}
            />
            {touched.riderPhone && errors.riderPhone && (
              <Text style={styles.error}>{errors.riderPhone}</Text>
            )}

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
                        color: values.VechicleType.length > 0 ? colors[colorScheme].textDark : '#AEAEAE',
                      }}>
                      {values.VechicleType.length > 0 ? values.VechicleType : 'Select vehicle type'}
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
                        handleChange('VechicleType')('bike');
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
                        handleChange('VechicleType')('car');
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
                        handleChange('VechicleType')('van');
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
                        handleChange('VechicleType')('Small truck');
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
                        handleChange('VechicleType')('Medium truck');
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
                        handleChange('VechicleType')('Big truck');
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
            {touched.VechicleType && errors.VechicleType && (
              <Text style={styles.error}>{errors.VechicleType}</Text>
            )}

            <Button
              title="Update"
              buttonStyle={{
                marginBottom: 50,
                marginHorizontal: 20,
                borderRadius: 30,
                marginTop: 20,
              }}
              loading={isSubmitting}
              enabled={isValid && !isSubmitting}
              textColor={colors[appearance].textDark}
              buttonColor={colors[appearance].primary}
              onPress={handleSubmit}
            />
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
