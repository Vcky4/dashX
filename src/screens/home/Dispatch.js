import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Linking, Text, TouchableOpacity, View, Dimensions, Platform } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";
import Swiper from "react-native-swiper";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import profileRouts from "../../navigation/routs/profileRouts";

const { width, height } = Dimensions.get('window');

export default Dispatch = ({ navigation, onIndexChanged, onDispatch, onContinue, distance, duration, items = [], processing = false }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [index, setIndex] = useState(0)
    const name = items[index]?.order_status !== 'pickup' ? items[index]?.sendername : items[index]?.receivername
    const phone = items[index]?.order_status !== 'pickup' ? items[index]?.senderphone : items[index]?.receiverphone

    useEffect(() => {
        onIndexChanged(index, items[index] === undefined ? items[items.length - 1] : items[index])
    }, [index, items.length])

    //open direction on maps
    const openDirection = (lat, lng) => {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const latLng = `${lat},${lng}`;
        const label = 'Pickup At';
        const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`;
        Linking.openURL(url);
    }
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
                // paddingStart: 10,
                // paddingEnd: 10,
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
                        const pageNum = Math.floor(contentOffset.x / (viewSize.width - 45));
                        setIndex(pageNum)
                        // console.log('scrolled to page ', pageNum);
                    }}
                    renderItem={({ item, index: indx }) =>
                        <TouchableOpacity onPress={() => navigation.navigate(profileRouts.orderDetails, { order: item })}
                            style={{
                                marginTop: 20,
                                // elevation: 10,
                                backgroundColor: colors[colorScheme].background,
                                borderRadius: 10,
                                shadowColor: '#000000',
                                padding: 14,
                                marginEnd: 10,
                                marginBottom: 20,
                                marginStart: indx === 0 ? 10 : 0,
                                width: width - (index === indx ? 40 : 0),
                                // shadowOffset: {
                                //     width: 30,
                                //     height: 30
                                // },
                                // shadowRadius: 10,
                                // shadowOpacity: 1.0,
                                borderColor: colors[colorScheme].inactive,
                                borderWidth: 5,
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
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Medium',
                                    }}>₦{item?.delivery_fee.toLocaleString()}</Text>
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
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Medium',
                                        marginEnd: 20,
                                    }}>{parseInt(distance)}<Text style={{
                                        color: colors[colorScheme].primary,
                                    }}>km</Text></Text>

                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Medium',
                                    }}>{parseInt(duration)}<Text style={{
                                        color: colors[colorScheme].primary,
                                    }}>mins</Text></Text>
                                </View>
                            </View>

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
                                </View>
                            </View>

                            <View style={{
                                width: '100%',
                                marginTop: 15,
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    alignItems: 'center',
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
                                    <View style={{
                                        width: 2,
                                        height: 30,
                                        backgroundColor: colors[colorScheme].primary,
                                    }} />
                                    <Image
                                        source={require('../../../assets/images/point2.png')}
                                        style={{
                                            width: 14,
                                            height: 14,
                                            resizeMode: "contain",
                                        }}
                                    />
                                </View>
                                <View style={{
                                    justifyContent: 'space-between',
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 14,
                                        fontFamily: 'Inter-Bold',
                                        marginLeft: 5,
                                        marginBottom: 2,
                                    }}>Pickup: <Text style={{
                                        fontFamily: 'Inter-Medium',
                                    }}>{item?.senderaddress}</Text></Text>

                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 14,
                                        fontFamily: 'Inter-Bold',
                                        marginLeft: 5,
                                    }}>Delivery: <Text style={{
                                        fontFamily: 'Inter-Medium',
                                    }}>{item?.receiveraddress}</Text></Text>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,
                                    justifyContent: 'space-between',
                                }}>
                                <Button title={item?.order_status === 'pickup' ? 'Dispatch'
                                    : item?.order_status === 'shipping' ? 'End Dispatch' : 'Verify Pickup'}
                                    onPress={() => {
                                        if (item?.order_status === 'pickup') {
                                            onDispatch(item)
                                        } else if (item?.order_status === 'shipping') {
                                            onContinue(item)
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

                                <Button title={'Directions'}
                                    onPress={() => {
                                        openDirection(
                                            parseFloat(item?.sendercordinate?.senderlat),
                                            parseFloat(item?.sendercordinate?.senderlong),
                                        )
                                    }}
                                    buttonStyle={{
                                        borderRadius: 20,
                                        height: 30,
                                        width: 117,
                                    }}
                                    fontSize={16}
                                    loading={false}
                                    enabled={true}
                                />
                            </View>


                        </TouchableOpacity>
                    }
                />
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                }}>
                    {items.map((item, indx) =>
                        <View key={indx} style={{
                            width: 10,
                            height: 10,
                            borderRadius: 50,
                            backgroundColor: indx === index ? colors[colorScheme].primary : colors[colorScheme].inactive,
                            marginHorizontal: 5,
                        }} />
                    )}
                </View>
            </View>
        </>
    )
}

