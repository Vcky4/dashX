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
import businessRoutes from '../../navigation/routs/businessRouts';

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
            Fleet
          </Text>
        </View>
        <View style={{marginHorizontal: 20, marginTop: 10, height: '100%'}}>
          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 11,
              fontFamily: 'Inter-Regular',
            }}>
            Total Fleet
          </Text>

          <Text
            style={{
              color: colors[colorScheme].textDark,
              fontSize: 16,
              fontFamily: 'Inter-Bold',
            }}>
            100
          </Text>

          <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(businessRoutes.fleetDetails)
                }
                style={{
                  backgroundColor: colors[colorScheme].background,
                  paddingVertical: 10,
                  paddingHorizontal: 14,
                  alignSelf: 'center',
                  borderBottomWidth: 0.5,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  borderBottomColor: colors[colorScheme].textGray,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../assets/images/user.png')}
                    style={{
                      width: 50,
                      height: 50,
                      resizeMode: 'contain',
                    }}
                  />
                  <View
                    style={{
                      marginStart: 10,
                    }}>
                    <Text
                      style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 16,
                        fontFamily: 'Inter-Medium',
                      }}>
                      Peter Andrew
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginStart: 10,
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity>
                    <Image
                      tintColor={colors[appearance].textDark}
                      source={require('../../../assets/images/edits.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity style={{marginStart:20}}>
                    <Image
                      tintColor={colors[appearance].textDark}
                      source={require('../../../assets/images/trash.png')}
                      style={{
                        width: 24,
                        height: 24,
                        resizeMode: 'contain',
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
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
