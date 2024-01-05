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
            Peter Andrew
          </Text>
        </View>

        <View
          style={{
            marginHorizontal: 20,
            marginTop: 24,
            height: 392,
            backgroundColor: colors[colorScheme].background,
            elevation: 1,
            paddingHorizontal: 32,
            paddingVertical: 32,
          }}>
          <Text
            style={{
              color: '#AEAEAE',
              fontSize: 11,
              fontFamily: 'Inter-Regular',
            }}>
            Vehicle Type
          </Text>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 16,
              fontFamily: 'Inter-Regular',
            }}>
            Car - UYY9765
          </Text>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#AEAEAE',
              marginTop: 8,
            }}
          />
          <Text
            style={{
              color: '#AEAEAE',
              fontSize: 11,
              fontFamily: 'Inter-Regular',
              paddingTop: 10,
            }}>
            Phone Number{' '}
          </Text>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 16,
              fontFamily: 'Inter-Regular',
            }}>
            07078983749
          </Text>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#AEAEAE',
              marginTop: 8,
            }}
          />

          <Text
            style={{
              color: '#AEAEAE',
              fontSize: 11,
              fontFamily: 'Inter-Regular',
              paddingTop: 10,
            }}>
            Date Added
          </Text>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 16,
              fontFamily: 'Inter-Regular',
            }}>
            August 15th, 2024
          </Text>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#AEAEAE',
              marginTop: 8,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#AEAEAE',
                  fontSize: 11,
                  fontFamily: 'Inter-Regular',
                  paddingTop: 10,
                }}>
                Orders Completed
              </Text>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                }}>
                900{' '}
              </Text>
            </View>
            <TouchableOpacity 
            onPress={()=>{
                
            }}
            >

            <Text
              style={{
                color: colors[colorScheme].primary,
                fontSize: 16,
                fontFamily: 'Inter-Regular',
              }}>
              See orders{' '}
            </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#AEAEAE',
              marginTop: 8,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View style={{}}>
              <Text
                style={{
                  color: '#AEAEAE',
                  fontSize: 11,
                  fontFamily: 'Inter-Regular',
                  paddingTop: 10,
                }}>
                Total Amount
              </Text>
              <Text
                style={{
                  color: colors[colorScheme].textDark,
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                }}>
                N500,000{' '}
              </Text>
            </View>
            <Text
              style={{
                color: colors[colorScheme].primary,
                fontSize: 16,
                fontFamily: 'Inter-Regular',
              }}>
              See amount{' '}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: '#AEAEAE',
              marginTop: 8,
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
