import React, { useContext, useEffect, useState } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";
import Swiper from "react-native-swiper";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";

export default Dispatch = ({ navigation, onIndexChanged, onDispatch }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [items, setItems] = useState([])
    const getMyOrder = async () => {
        const response = await fetch(endpoints.baseUrl + endpoints.myOrders, {
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
        console.log(json)
        //check if array
        if (Array.isArray(json.data)) {
            setItems(json.data)
        }

    }
    useEffect(() => {
        getMyOrder()
    }, [])
    const dispatch = true
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
                        }}>{user?.name}</Text>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>{user.email}</Text>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>08096867881</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 20,
                    padding: 6,
                }}
                    onPress={() => {
                        //call
                        Linking.openURL(`tel:${user?.phone}`)
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
            <Swiper
                onIndexChanged={(index) => {
                    onIndexChanged(items[index])
                }}
                style={{
                    height: 220,
                }}>
                {
                    items.map((item, index) =>
                        <View key={index} style={{
                            marginTop: 20,
                            elevation: 20,
                            backgroundColor: colors[colorScheme].background,
                            borderRadius: 10,
                            shadowColor: '#000000',
                            padding: 14,
                            marginHorizontal: 10,
                            marginBottom: 20,

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
                                    }}>Dell Latitude Laptop</Text>
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
                                    }}>Picked</Text>
                                </View>

                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Medium',
                                }}>₦4,589.55</Text>
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
                                }}>25, Ogeretedo Street, Dopemu, Agege</Text></Text>
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
                                }}>25, Ogeretedo Street, Dopemu, Agege</Text></Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 20,
                                    justifyContent: 'space-between',
                                }}>
                                <Button title={dispatch ? 'Dispatch' : 'Verify Pickup'}
                                    onPress={() => {
                                        if (dispatch) {
                                            onDispatch()
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
                                    loading={false}
                                    enabled={true}
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


                        </View>
                    )
                }
            </Swiper>
        </>
    )
}