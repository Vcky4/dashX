import React, {useContext, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  Modal,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../../context/AuthContext';
import colors from '../../../assets/colors/colors';
import businessRoutes from '../../navigation/routs/businessRouts';
import endpoints from '../../../assets/endpoints/endpoints';
import Button from '../../component/Button';
import Toast from 'react-native-toast-message';

export default DeliveryHistory = ({navigation}) => {
  const {colorScheme, user, token} = useContext(AuthContext);
  const appearance = colorScheme;
  const [processing, setProcessing] = useState(false);
  const [block, setBlock] = useState(false);
  const [unBlock, setUnBlock] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [Loading2, setLoading2] = useState(false);
  const [fleets, setFleets] = useState([]);
  const [fleetid, setFleetId] = useState({});

  const getTotalFleests = async () => {
    setProcessing(true);
    const response = await fetch(endpoints.baseUrl + endpoints.retriveFleets, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        dispatchid: user.id,
      }),
    });
    const json = await response.json();
    // console.log(json)
    setProcessing(false);
    //check if array
    if (Array.isArray(json.data)) {
      setFleets(json.data);
    }
  };

  const BlockFleet = async () => {
    setLoading(true);
    const response = await fetch(endpoints.baseUrl + endpoints.blockFleet, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        dispatchid: user.id,
        fleetid: fleetid?._id,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        setLoading(false);
        if (response.ok) {
          setBlock(!block);
          Toast.show({
            type: 'success',
            text1: 'Block successful',
            text2: data.message,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'Block failed',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log('Block error:', data);
        }
      })
      .catch(error => {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Block failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('Block error:', error);
      });
  };

  const UnBlockFleet = async () => {
    setLoading2(true);
    const response = await fetch(endpoints.baseUrl + endpoints.unblockFleet, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify({
        dispatchid: user.id,
        fleetid: fleetid?._id,
      }), // body data type must match "Content-Type" header
    });
    response
      .json()
      .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
        setLoading2(false);
        if (response.ok) {
          setUnBlock(!unBlock);
          Toast.show({
            type: 'success',
            text1: 'Unblock successful',
            text2: data.message,
          });
        } else {
          Toast.show({
            type: 'error',
            text1: 'unBlock failed',
            text2: data.message,
          });
          console.log('response: ', response);
          console.log('unBlock error:', data);
        }
      })
      .catch(error => {
        setLoading2(false);
        Toast.show({
          type: 'error',
          text1: 'unBlock failed',
          text2: error.message,
        });
        console.log('response: ', response);
        console.log('unBlock error:', error);
      });
  };

  useEffect(() => {
    getTotalFleests();
  }, []);

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
            {fleets.length}
          </Text>

          <FlatList
            data={fleets}
            refreshControl={
              <RefreshControl
                refreshing={processing}
                onRefresh={getTotalFleests}
              />
            }
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(businessRoutes.fleetDetails, {
                    id: item._id,
                  })
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
                    source={
                      item?.phote
                        ? {uri: item?.photo}
                        : require('../../../assets/images/user.png')
                    }
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
                      navigation.navigate(businessRoutes.editFleet, {
                        item: item,
                      });
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

                  <TouchableOpacity
                    onPress={() => {
                      if (item?.dispatch_blocked) {
                        setUnBlock(true);
                        setFleetId(item);
                        
                      } else {
                        setBlock(true);

                        setFleetId(item);
                      }
                    }}
                    style={{marginStart: 20}}>
                    {item?.dispatch_blocked ? (
                      <Image
                        tintColor={colors[appearance].textDark}
                        source={require('../../../assets/images/unBlock.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    ) : (
                      <Image
                        tintColor={colors[appearance].textDark}
                        source={require('../../../assets/images/block.png')}
                        style={{
                          width: 24,
                          height: 24,
                          resizeMode: 'contain',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={block}
        onRequestClose={() => {
          setBlock(!block);
        }}>
        <TouchableOpacity
          onPress={() => {
            setBlock(!block);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors[appearance].background,
              width: '90%',
              borderRadius: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                color: colors[appearance].textDark,
                alignSelf: 'center',
              }}>
              Block Driver
            </Text>
            <ScrollView
              style={{
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 12,
                  color: colors[appearance].textDark,
                  alignSelf: 'center',
                }}>
                Are you sure you want to block this driver?
              </Text>

              <Button
                title={'Block Driver'}
                buttonStyle={{
                  marginBottom: 50,
                  marginHorizontal: 20,
                  borderRadius: 30,
                  marginTop: 20,
                }}
                loading={Loading}
                enabled={true}
                textColor={colors[appearance].textDark}
                buttonColor={colors[appearance].primary}
                onPress={() => {
                  BlockFleet();
                  // uploadImage(packageImage, url => verify(url));
                  // navigation.navigate(authRouts.otpVerification)
                }}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={unBlock}
        onRequestClose={() => {
          setUnBlock(!unBlock);
        }}>
        <TouchableOpacity
          onPress={() => {
            setBlock(!block);
          }}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              backgroundColor: colors[appearance].background,
              width: '90%',
              borderRadius: 20,
              paddingVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Inter-SemiBold',
                fontSize: 20,
                color: colors[appearance].textDark,
                alignSelf: 'center',
              }}>
              Unblock Driver
            </Text>
            <ScrollView
              style={{
                marginTop: 20,
              }}>
              <Text
                style={{
                  fontFamily: 'Inter-SemiBold',
                  fontSize: 12,
                  color: colors[appearance].textDark,
                  alignSelf: 'center',
                }}>
                Are you sure you want to unblock this driver?
              </Text>

              <Button
                title={'Unblock Driver'}
                buttonStyle={{
                  marginBottom: 50,
                  marginHorizontal: 20,
                  borderRadius: 30,
                  marginTop: 20,
                }}
                loading={Loading2}
                enabled={true}
                textColor={colors[appearance].textDark}
                buttonColor={colors[appearance].primary}
                onPress={() => {
                  UnBlockFleet();
                  // uploadImage(packageImage, url => verify(url));
                  // navigation.navigate(authRouts.otpVerification)
                }}
              />
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};
const styles = StyleSheet.create({
  input: {
    marginTop: 20,
  },
});
