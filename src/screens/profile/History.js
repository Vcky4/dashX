import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";

export default Profile = ({ navigation }) => {
    const { colorScheme, user } = useContext(AuthContext)
    console.log(user)
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
                    }}>History</Text>
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


            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                style={{
                    marginTop: 20,
                }}
                renderItem={({ item }) =>
                    <View style={{
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        elevation: 5,
                        marginBottom: 10,
                        marginHorizontal: 10,
                        borderRadius: 10,
                        backgroundColor: colors[colorScheme].background
                    }}>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 14,
                            fontFamily: 'Inter-SemiBold',
                        }}>#a1287845</Text>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 6,
                        }}>
                            <View style={{
                                alignItems: 'center',
                                paddingVertical: 4
                            }}>
                                <View style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: colors[colorScheme].primary,
                                }} />
                                <View style={{
                                    width: 1,
                                    height: 40,
                                    backgroundColor: colors[colorScheme].textGray,
                                }} />
                                <View style={{
                                    width: 0,
                                    height: 0,
                                    borderStyle: 'solid',
                                    overflow: 'hidden',
                                    borderTopWidth: 6,
                                    borderRightWidth: 4,
                                    borderBottomWidth: 0,
                                    borderLeftWidth: 4,
                                    borderTopColor: colors[colorScheme].primary,
                                    borderRightColor: 'transparent',
                                    borderBottomColor: 'transparent',
                                    borderLeftColor: 'transparent',
                                }} />
                            </View>

                            <View style={{
                                height: 70,
                                marginLeft: 10,
                                justifyContent: 'space-between',
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-SemiBold',
                                    }}>iPhone 14 Pro Max</Text>

                                    <View style={{
                                        backgroundColor: colors[colorScheme].primary,
                                        paddingHorizontal: 20,
                                        paddingVertical: 4,
                                        borderRadius: 10
                                    }}>
                                        <Text style={{
                                            color: colors[colorScheme].white,
                                            fontSize: 12,
                                            fontFamily: 'Inter-Regular',
                                        }}>Paid</Text>
                                    </View>
                                </View>
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: '100%',
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 14,
                                        fontFamily: 'Inter-Regular',
                                        width: '70%'
                                    }}>KM 55, Lekki-Epe Expressway,
                                        Sangotedo, Ibeju-Lekki</Text>

                                    <View style={{
                                        backgroundColor: colors[colorScheme].textGray,
                                        paddingVertical: 4,
                                        borderRadius: 10,
                                        paddingHorizontal: 5
                                    }}>
                                        <Text style={{
                                            color: colors[colorScheme].white,
                                            fontSize: 12,
                                            fontFamily: 'Inter-Regular',
                                        }}>completed</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                }
            />
        </View>
    )
}