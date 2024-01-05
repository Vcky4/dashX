import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Linking, Text, TouchableOpacity, View, Dimensions } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";
import Swiper from "react-native-swiper";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import profileRouts from "../../navigation/routs/profileRouts";

const { width, height } = Dimensions.get('window');

export default Dispatch = ({ navigation, onIndexChanged, onDispatch, items = [], processing = false }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [index, setIndex] = useState(0)
    const name = items[index]?.order_status !== 'pickup' ? items[index]?.sendername : items[index]?.receivername
    const phone = items[index]?.order_status !== 'pickup' ? items[index]?.senderphone : items[index]?.receiverphone

    // console.log('items', items)
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 20,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../../../assets/images/profile.jpg')}
                        style={{
                            width: 46,
                            height: 46,
                            resizeMode: "cover",
                            borderRadius: 50,
                            marginRight: 14,
                        }}
                    />
                    <View>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-Bold',
                        }}>{name}</Text>
                        {/* <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>{user.email}</Text> */}
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>{phone}</Text>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{
                        marginEnd: 10
                    }}
                        onPress={() => {
                            //navigate to whatsapp
                            //regex to replace first 0 with +234
                            const number = phone.replace(/^0/, '+234')
                            Linking.openURL(`https://wa.me/${number}`)
                        }}>
                        <Image
                            source={require('../../../assets/images/whatsapp.png')}
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: colors[colorScheme].primary,
                        borderRadius: 20,
                        padding: 6,
                    }}
                        onPress={() => {
                            //call
                            Linking.openURL(`tel:${phone}`)
                        }}>
                        <Image
                            source={require('../../../assets/images/phone.png')}
                            style={{
                                width: 22,
                                height: 22,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

           <View style={{
            paddingHorizontal: 10,
            width: width
           }}>
           <FlatList
                data={items}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onMomentumScrollEnd={(e) => {
                    const contentOffset = e.nativeEvent.contentOffset;
                    const viewSize = e.nativeEvent.layoutMeasurement;
                    const pageNum = Math.floor(contentOffset.x / viewSize.width);
                    setIndex(pageNum)
                    onIndexChanged(items[pageNum])
                }}
                renderItem={({ item }) =>
                    <TouchableOpacity onPress={() => navigation.navigate(profileRouts.orderDetails, { order: item })}
                        style={{
                            marginTop: 20,
                            elevation: 20,
                            backgroundColor: colors[colorScheme].background,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            padding: 14,
                            // marginHorizontal: 10,
                            marginBottom: 20,
                            width: width -20,
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Text style={{
                                    color: colors[colorScheme].primary,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Medium',
                                }}>{item?.productname}</Text>
                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                    marginLeft: 10,
                                    borderRadius: 10,
                                    paddingHorizontal: 8,
                                    paddingVertical: 1,
                                    borderColor: colors[colorScheme].primary,
                                    borderWidth: 1,
                                    display: item?.order_status === 'pickup' ? 'flex' : 'none'
                                }}>Picked</Text>
                            </View>

                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 16,
                                fontFamily: 'Inter-Medium',
                            }}>₦{item?.delivery_fee.toLocaleString()}</Text>
                        </View>

                        <View style={{
                            width: '100%',
                            marginTop: 15,
                            flexDirection: 'row',
                        }}>
                            <Image
                                source={require('../../../assets/images/point.png')}
                                style={{
                                    width: 14,
                                    height: 14,
                                    resizeMode: "contain",
                                    marginTop: 2,
                                }}
                            />
                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 14,
                                fontFamily: 'Inter-Bold',
                                marginLeft: 5,
                            }}>Pickup: <Text style={{
                                fontFamily: 'Inter-Medium',
                            }}>{item?.senderaddress}</Text></Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            marginTop: 5
                        }}>
                            <Image
                                source={require('../../../assets/images/point2.png')}
                                style={{
                                    width: 14,
                                    height: 14,
                                    resizeMode: "contain",
                                    marginTop: 2,
                                }}
                            />
                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 14,
                                fontFamily: 'Inter-Bold',
                                marginLeft: 5,
                            }}>Delivery: <Text style={{
                                fontFamily: 'Inter-Medium',
                            }}>{item?.receiveraddress}</Text></Text>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 20,
                                justifyContent: 'space-between',
                            }}>
                            <Button title={item?.order_status === 'pickup' ? 'Dispatch' : 'Verify Pickup'}
                                onPress={() => {
                                    if (item?.order_status === 'pickup') {
                                        onDispatch(item)
                                    } else {
                                        navigation.navigate(mainRouts.verifyPickup, {
                                            item: item
                                        })
                                    }
                                }}
                                buttonStyle={{
                                    borderRadius: 20,
                                    height: 30,
                                    width: 137,
                                }}
                                fontSize={16}
                                loading={processing}
                                enabled={!processing}
                            />

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            }}>
                                <TouchableOpacity onPress={() => {

                                }}>
                                    <Image
                                        source={require('../../../assets/images/arrow.png')}
                                        style={{
                                            width: 28,
                                            height: 22,
                                            resizeMode: "contain",
                                            tintColor: colors[colorScheme].primary,
                                        }}
                                    />
                                </TouchableOpacity>

                                <Text style={{
                                    color: colors[colorScheme].primary,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                    marginHorizontal: 10,
                                }}>Swipe</Text>

                                <TouchableOpacity>
                                    <Image
                                        source={require('../../../assets/images/arrow.png')}
                                        style={{
                                            width: 28,
                                            height: 22,
                                            resizeMode: "contain",
                                            tintColor: colors[colorScheme].primary,
                                            transform: [{ rotate: '180deg' }]
                                        }}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>


                    </TouchableOpacity>
                }
            />
           </View>
        </>
    )
}

