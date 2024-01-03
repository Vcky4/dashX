import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
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
                                tintColor: colors[colorScheme].textDark,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                    }}>Profile</Text>
                </View>

                <TouchableOpacity style={{
                    alignSelf: 'center',
                    marginTop: 30,
                }}>
                    <Image
                        source={
                            user?.photo.length > 0 ?
                                { uri: user.photo } :
                                require('../../../assets/images/profile.jpg')
                        }
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "cover",
                            borderRadius: 50,
                            marginRight: 14,
                            borderRadius: 100,
                            borderWidth: 3,
                            borderColor: colors[colorScheme].white,
                        }}
                    />
                    {/* <Image
                        source={require('../../../assets/images/edit.png')}
                        style={{
                            width: 24,
                            height: 24,
                            resizeMode: "contain",
                            borderRadius: 14,
                            position: 'absolute',
                            bottom: 0,
                            right: 18,
                        }}
                    /> */}
                </TouchableOpacity>

                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                    alignSelf: 'center',
                    marginTop: 10,
                }}>{user?.name}</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                    alignSelf: 'center',
                }}>{user.online_status ? 'Online' : 'Offline'}</Text>
            </View>

            <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Vehicle Type</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.vehicle.vehicle_type}</Text>
            </View>

            <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Vehicle Number</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.vehicle.vehicle_number}</Text>
            </View>


            <Text style={{
                color: colors[colorScheme].textGray,
                fontSize: 12,
                fontFamily: 'Inter-Bold',
                marginTop: 20,
                marginLeft: 32,
                marginBottom: 8,
            }}>Email</Text>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '85%',
                paddingHorizontal: 10,
                borderColor: colors[colorScheme].primary,
                borderWidth: 1,
                paddingVertical: 10,
                marginHorizontal: 20,
                alignSelf: 'center',
                borderRadius: 30,
            }}>
                <Image
                    source={require('../../../assets/images/car.png')}
                    style={{
                        width: 24,
                        height: 24,
                        resizeMode: "contain",
                        alignSelf: 'center',
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    alignSelf: 'center',
                    marginLeft: 10,
                }}>{user.email}</Text>
            </View>
        </View>
    )
}