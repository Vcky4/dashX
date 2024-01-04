import React, { useContext, useState } from "react";
import { Image, Linking, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";

export default Dispatch = ({ onEnd, item }) => {
    const { colorScheme, user } = useContext(AuthContext)
    const [code, setCode] = useState('')
    const [processing, setProcessing] = useState(false)
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 10,
                marginBottom: 10,
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
                        }}>{item?.receivername}</Text>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>{item?.receiverphone}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 20,
                    padding: 6,
                }}
                    onPress={() => {
                        //call
                        Linking.openURL(`tel:${item?.recieverphone}`)
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
            <View style={{
                width: '100%',
                paddingHorizontal: 20,
            }}>

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 15,
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../../../assets/images/bike.png')}
                        style={{
                            width: 14,
                            height: 14,
                            resizeMode: "contain",
                            marginEnd: 4,
                        }}
                    />
                    <View>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 14,
                            fontFamily: 'Inter-Bold',
                            marginLeft: 5,
                        }}>Enroute Pickup</Text>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 14,
                            fontFamily: 'Inter-Bold',
                            marginLeft: 5,
                        }}>Parcel ID: <Text style={{
                            fontFamily: 'Inter-Medium',
                        }}> {item?._id}</Text></Text>
                    </View>
                </View>
                <View style={{
                    width: '100%',
                    marginTop: 5,
                    flexDirection: 'row',
                }}>
                    <Image
                        source={require('../../../assets/images/point.png')}
                        style={{
                            width: 14,
                            height: 14,
                            resizeMode: "contain",
                            marginTop: 2,
                            marginEnd: 4,
                        }}
                    />
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                        marginLeft: 5,
                    }}>{item?.senderaddress}</Text>
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
                            marginEnd: 4,
                        }}
                    />
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 14,
                        fontFamily: 'Inter-Meduim',
                        marginLeft: 5,
                    }}>{item?.receiveraddress}</Text>
                </View>
            </View>

            <View style={{
                marginTop: 20,
                elevation: 10,
                backgroundColor: colors[colorScheme].background,
                borderRadius: 10,
                shadowColor: '#000000',
                padding: 14,
                marginHorizontal: 10,
            }}>
                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    borderColor: colors[colorScheme].primary,
                    borderWidth: 1,
                    borderRadius: 30,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                    <TextInput
                        placeholder="235jVG"
                        value={code}
                        onChangeText={(text) => {
                            setCode(text)
                        }}
                        maxLength={6}
                        cursorColor={colors[colorScheme].primary}
                        placeholderTextColor={colors[colorScheme].textGray}
                        style={{
                            fontFamily: 'Inter-Medium',
                            fontSize: 24,
                            paddingHorizontal: 30,
                            color: colors[colorScheme].textDark
                        }} />
                </View>

                <Button title={'Input code to end dispatch'}
                    onPress={() => {
                        onEnd()
                    }}
                    buttonStyle={{
                        borderRadius: 30,
                        height: 60,
                        width: '90%',
                        marginTop: 10,
                        alignSelf: 'center',
                    }}
                    fontSize={16}
                    loading={processing}
                    enabled={code.length > 4 && !processing}
                />
            </View>
        </>
    )
}