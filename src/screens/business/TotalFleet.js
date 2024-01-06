import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { AuthContext } from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import businessRoutes from '../../navigation/routs/businessRouts';
import endpoints from '../../../assets/endpoints/endpoints';

export default DeliveryHistory = ({ navigation }) => {
  const { colorScheme, user, token } = useContext(AuthContext);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const [fleets, setFleets] = useState([]);

  const getTotalFleests = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.retriveFleets, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify({
        "dispatchid": user.id,
      })
    })
    const json = await response.json()
    // console.log(json)
    setProcessing(false)
    //check if array
    if (Array.isArray(json.data)) {
      setFleets(json.data)

    }
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
            Fleet
          </Text>
        </View>
        <View style={{ marginHorizontal: 20, marginTop: 10, height: '100%' }}>
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
            {fleets.length}
          </Text>

          <FlatList
            data={fleets}
            refreshControl={
              <RefreshControl refreshing={processing} onRefresh={getTotalFleests} />
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(businessRoutes.fleetDetails, {id: item._id})
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
                      width: 40,
                      height: 40,
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
                      {item.name}
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
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate(businessRoutes.editFleet);
                    }}>
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
                  <TouchableOpacity style={{ marginStart: 20 }}>
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
