import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";

export default OrderDetails = ({ navigation, route }) => {
    const { order } = route.params
    const { colorScheme, user } = useContext(AuthContext)
    console.log(order)
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                paddingBottom: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        left: 0,
                    }}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].white,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                    }}>Dispatch Details</Text>
                </View>
                <Text style={{
                    color: colors[colorScheme].primary,
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                    alignSelf: 'center',
                    backgroundColor: colors[colorScheme].white,
                    padding: 4,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    marginTop: 6,
                }}>{user.online_status ? 'Online' : 'Offline'}</Text>
            </View>

            <Text style={{
                color: colors[colorScheme].textDark,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 10,
            }}>Customer Details</Text>

            {
                [1, 2].map((item, index) =>
                    <View key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginTop: 10,
                            justifyContent: 'space-between',
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={
                                    index == 0 ? require('../../../assets/images/user.png') : require('../../../assets/images/pin.png')
                                }
                                style={{
                                    width: 29,
                                    height: 29,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                marginLeft: 10,
                            }}>{
                                    index == 0 ? 'Name:' : 'Address'
                                }</Text>
                        </View>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 14,
                            fontFamily: 'Inter-Regular',
                            marginLeft: 10,
                            width: '50%',
                        }}>{
                                index == 0 ? order?.sendername : order?.senderaddress
                            }</Text>
                    </View>)
            }
            <View style={{
                width: '84%',
                height: 0.4,
                backgroundColor: colors[colorScheme].border,
                alignSelf: 'center',
                marginTop: 25,
            }} />

            <Text style={{
                color: colors[colorScheme].textDark,
                fontSize: 16,
                fontFamily: 'Inter-SemiBold',
                marginHorizontal: 20,
                marginTop: 20,
                marginBottom: 10,
            }}>Order Details</Text>

            {
                [1, 2, 3, 4].map((item, index) =>
                    <View key={index}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginHorizontal: 20,
                            marginTop: 10,
                            justifyContent: 'space-between',
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <Image
                                source={
                                    index == 0 ? require('../../../assets/images/pen.png')
                                        : index == 1 ? require('../../../assets/images/recent.png')
                                            : index == 2 ? require('../../../assets/images/money.png')
                                                : require('../../../assets/images/cart.png')
                                }
                                style={{
                                    width: 29,
                                    height: 29,
                                    resizeMode: "contain",
                                }}
                            />
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                marginLeft: 10,
                            }}>{
                                    index == 0 ? 'Order ID:'
                                        : index == 1 ? 'Pick Up Time:'
                                            : index == 2 ? 'Payment Method: '
                                                : 'Item(s) Ordered:'
                                }</Text>
                        </View>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 14,
                            fontFamily: 'Inter-Regular',
                            marginLeft: 10,
                            width: '50%',
                        }}>{
                                index == 0 ? order?._id
                                    : index == 1 ? '12:00PM'
                                        : index == 2 ? 'Cash'
                                            : order.productname
                            }</Text>
                    </View>)
            }
        </View>
    )
}