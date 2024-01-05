import React, { useContext, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import businessRoutes from "../../navigation/routs/businessRouts";

export default Dashboard = ({ navigation }) => {
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
            }}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require('../../../assets/images/menu.png')}
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
                }}>{user.name}</Text>
            </View>

            <View style={{
                flexWrap: 'wrap',
                width: '100%',
                flexDirection: 'row',
                paddingHorizontal: 18,
                paddingVertical: 10,
                justifyContent: 'space-between',
            }}>
                {[1, 2, 3, 4].map((item, index) =>
                    <TouchableOpacity
                        onPress={() => {
                            if (index == 0) {
                                navigation.navigate(businessRoutes.totalOrder)
                            } else if (index == 1) {
                                navigation.navigate(businessRoutes.totalFleet)
                            } else if (index == 2) {
                                navigation.navigate(businessRoutes.activeOrders)
                            } else if (index == 3) {
                                navigation.navigate(businessRoutes.activeRider)
                            }
                        }}
                        key={index}
                        style={{
                            backgroundColor: index > 1 ? '#FFD9D9' : '#D9FFDA',
                            padding: 10,
                            borderRadius: 10,
                            width: '48%',
                            marginTop: 12,
                        }}>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 16,
                            fontFamily: 'Inter-Medium',
                        }}>{
                                index == 0 ? 'Total Orders' :
                                    index == 1 ? 'Total Fleet' :
                                        index == 2 ? 'Active Orders' :
                                            'Active Riders'
                            }</Text>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 24,
                            fontFamily: 'Inter-Bold',
                        }}>0</Text>
                    </TouchableOpacity>
                )}
            </View>

            <TouchableOpacity style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                // paddingBottom: 20,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
                marginTop: 8,
                marginHorizontal: 20,
            }}>
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                }}>+ Add Rider</Text>
            </TouchableOpacity>

            <View style={{
                backgroundColor: colors[colorScheme].textGray,
                padding: 20,
                paddingBottom: 20,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                marginTop: 8,
                marginHorizontal: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
            }}>
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 14,
                    fontFamily: 'Inter-SemiBold',
                }}>Delivery History</Text>
                <TouchableOpacity onPress={() => navigation.navigate(businessRoutes.deliveryHistory)}>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                    }}>{'See All >'}</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                renderItem={({ item, index }) =>
                    <TouchableOpacity onPress={() => navigation.navigate(businessRoutes.deliveryDetails, { item: item })}
                        style={{
                            backgroundColor: colors[colorScheme].background,
                            paddingVertical: 10,
                            // paddingHorizontal: 10,
                            alignSelf: 'center',
                            borderBottomWidth: 0.5,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '85%',
                            borderBottomColor: colors[colorScheme].textGray,
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require('../../../assets/images/user.png')}
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
                                }}>09:19am  - Jan. 1st, 2024</Text>
                            </View>
                        </View>
                        <View style={{
                            marginStart: 10,
                            alignItems: 'flex-end',
                        }}>
                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 16,
                                fontFamily: 'Inter-Medium',
                            }}>+N20,000</Text>
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 12,
                                fontFamily: 'Inter-Regular',
                            }}>Delivered</Text>
                        </View>
                    </TouchableOpacity>
                }
            />
        </View>
    )
};