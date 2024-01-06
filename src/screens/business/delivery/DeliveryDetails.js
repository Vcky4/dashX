import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import colors from "../../../../assets/colors/colors";

export default DeliveryDetails = ({ navigation, route }) => {
    const { item } = route.params
    const { colorScheme, user, token } = useContext(AuthContext)


    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 18,
                paddingVertical: 10,
                backgroundColor: colors[colorScheme].primary,
                marginBottom: 30,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}>
                    <Image
                        source={require('../../../../assets/images/back.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                            tintColor: colors[colorScheme].white,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 18,
                    fontFamily: 'Inter-Bold',
                    marginStart: 20,
                }}>Delivery</Text>
            </View>

            <View style={{
                marginHorizontal: 30,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBlockColor: colors[colorScheme].textGray,
                borderBottomWidth: 1,
            }}>
                <Text style={{
                    color: colors[colorScheme].textGray,
                    fontSize: 14,
                    fontFamily: 'Inter-Medium',
                }}>Driver</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                }}>Peter Andrew</Text>
            </View>

            <View style={{
                marginHorizontal: 30,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBlockColor: colors[colorScheme].textGray,
                borderBottomWidth: 1,
            }}>
                <Text style={{
                    color: colors[colorScheme].textGray,
                    fontSize: 14,
                    fontFamily: 'Inter-Medium',
                }}>Delivery Fee</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                }}>₦{item.delivery_fee.toLocaleString()}</Text>
            </View>

            <View style={{
                marginHorizontal: 30,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBlockColor: colors[colorScheme].textGray,
                borderBottomWidth: 1,
            }}>
                <Text style={{
                    color: colors[colorScheme].textGray,
                    fontSize: 14,
                    fontFamily: 'Inter-Medium',
                }}>Date</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
            </View>

            <View style={{
                marginHorizontal: 30,
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBlockColor: colors[colorScheme].textGray,
                borderBottomWidth: 1,
            }}>
                <Text style={{
                    color: colors[colorScheme].textGray,
                    fontSize: 14,
                    fontFamily: 'Inter-Medium',
                }}>Time</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                }}>{new Date(item.createdAt).toLocaleTimeString()}</Text>
            </View>


            <View style={{
                marginHorizontal: 30,
                paddingHorizontal: 10,
                paddingVertical: 10,
            }}>
                <Text style={{
                    color: colors[colorScheme].textGray,
                    fontSize: 14,
                    fontFamily: 'Inter-Medium',
                }}>Status</Text>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <View style={{
                        backgroundColor: colors[colorScheme].primary,
                        width: 10,
                        height: 10,
                        borderRadius: 5,
                        marginRight: 5,
                    }} />
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 16,
                        fontFamily: 'Inter-Medium',
                    }}>{item.order_status}</Text>
                </View>
            </View>
        </View>
    )
};