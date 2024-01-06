import React, { useContext, useEffect, useState } from 'react';
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
import businessRoutes from '../../navigation/routs/businessRouts';
import endpoints from '../../../assets/endpoints/endpoints';

export default DeliveryHistory = ({ navigation, route }) => {
  const { id } = route.params;
  const { colorScheme, user, token } = useContext(AuthContext);
  const [details, setDetails] = useState(false);
  const [processing, setProcessing] = useState(false);

  console.log(details)

  const getTotalFleests = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.singleFleet, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "dispatchid": user.id,
        "fleetid": id
      })
    })
    const json = await response.json()
    // console.log(json)
    setDetails(json.data)
    setProcessing(false)
  }

  useEffect(() => {
    getTotalFleests()
  }, [])

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
            {details?.fleet?.name}
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
            {details.fleet?.vehicle?.vehicle_type} - {details.fleet?.vehicle?.vehicle_number}
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
            {details.fleet?.phone}
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
            {new Date(details.fleet?.createdAt).toDateString()}
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
                {details.totalorder}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(businessRoutes.totalOrder);
              }}>
              <Text
                style={{
                  color: colors[colorScheme].primary,
                  fontSize: 16,
                  fontFamily: 'Inter-Regular',
                }}>
                See orders
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
                ₦{details.totalamount}
              </Text>
            </View>
            {/* <Text
              style={{
                color: colors[colorScheme].primary,
                fontSize: 16,
                fontFamily: 'Inter-Regular',
              }}>
              See amount{' '}
            </Text> */}
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
