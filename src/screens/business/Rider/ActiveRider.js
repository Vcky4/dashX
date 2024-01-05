import React, { useContext, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import colors from "../../../../assets/colors/colors";
import businessRoutes from "../../../navigation/routs/businessRouts";

export default ActiveRider = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)


    return (
        <>
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
                    }}>Delivery History</Text>
                </View>

                <View style={{
                    marginStart: 20,
                    marginTop: 20,
                    marginBottom: 10,
                }}>
                    <Text style={{
                        color: colors[colorScheme].textGray,
                        fontSize: 14,
                        fontFamily: 'Inter-Regular',
                    }}>Total Active Riders</Text>
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                    }}>50</Text>
                </View>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate(businessRoutes.deliveryDetails, { item: item })}
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
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require('../../../../assets/images/user.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                    }}
                                />
                                <View style={{
                                    marginStart: 10,
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Medium',
                                    }}>Peter Andrew</Text>
                                    <Text style={{
                                        color: colors[colorScheme].textGray,
                                        fontSize: 12,
                                        fontFamily: 'Inter-Regular',
                                    }}>Truck - UYY7665</Text>
                                </View>
                            </View>
                            <View style={{
                                marginStart: 10,
                                alignItems: 'flex-end',
                                width: 10,
                                height: 10,
                                borderRadius: 5,
                                backgroundColor: 'green',
                            }} />
                        </TouchableOpacity>
                    }
                />
            </View>
        </>
    )
};