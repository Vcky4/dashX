import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";


export default PendingOrderItem = ({ item, onPress, onAccept, processing }) => {
    const [loading, setLoading] = useState(false)
    const { colorScheme } = useContext(AuthContext)

    useEffect(() => {
        if (!processing) setLoading(false)
    }, [processing])
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: colors[colorScheme].background,
                width: '100%',
                elevation: 10,
                paddingVertical: 10,
                borderRadius: 10,
                marginBottom: 10,
                paddingHorizontal: 10,
            }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 18,
                    fontFamily: 'Inter-Bold',
                }}>₦{item?.delivery_fee.toLocaleString()}</Text>
                <Button title={'Accept'}
                    onPress={() => {
                        setLoading(true)
                        onAccept()
                    }}
                    buttonStyle={{
                        borderRadius: 20,
                        height: 30,
                        width: 86,
                    }}
                    fontSize={16}
                    loading={loading}
                    enabled={!loading}
                />
            </View>
            <Text style={{
                color: colors[colorScheme].primary,
                fontSize: 16,
                fontFamily: 'Medium',
            }}>{item?.productname}</Text>
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
        </TouchableOpacity>
    )
}