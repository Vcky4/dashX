import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import colors from "../../../../assets/colors/colors";
import DatePicker from "react-native-date-picker";
import businessRoutes from "../../../navigation/routs/businessRouts";
import endpoints from "../../../../assets/endpoints/endpoints";

export default DeliveryHistory = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [deliveryHistory, setDeliveryHistory] = useState([]);


    const getDeliveryHistory = async () => {
        const response = await fetch(endpoints.baseUrl + endpoints.deliveryHistory, {
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
        // console.log(json)
        //check if array
        if (Array.isArray(json.data)) {
            setDeliveryHistory(json.data)
            // if (dispatchItem === null) {
            //     setDispatchItem(json.data[0])
            // }
            // setDispatchItem(json.data[0])
        }
    }

    useEffect(() => {
        getDeliveryHistory()
    }, [])


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
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    marginHorizontal: 20,
                    marginBottom: 10
                }}>
                    <TouchableOpacity onPress={() => setOpen(true)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                        }}>{
                                startDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }</Text>
                        <Image
                            source={require('../../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].textGray,
                                transform: [{ rotate: '-90deg' }],
                            }}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: colors[colorScheme].textDark,
                    }}>to</Text>

                    <TouchableOpacity onPress={() => setOpen2(true)}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                        }}>{
                                startDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                            }</Text>
                        <Image
                            source={require('../../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].textGray,
                                transform: [{ rotate: '-90deg' }],
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={deliveryHistory}
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
                                    }}>{new Date(item.createdAt).toLocaleTimeString()}- {new Date(item.createdAt).toLocaleDateString()}</Text>
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
                                }}>+₦{item.delivery_fee.toLocaleString()}</Text>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                }}>{item.order_status}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>

            <DatePicker
                modal
                open={open}
                date={startDate}
                onConfirm={date => {
                    setOpen(false);
                    setStartDate(date);
                }}
                mode="date"
                onCancel={() => {
                    setOpen(false);
                }}
            />

            <DatePicker
                modal
                open={open2}
                date={endDate}
                onConfirm={date => {
                    setOpen2(false);
                    setEndDate(date);
                }}
                mode="date"
                onCancel={() => {
                    setOpen2(false);
                }}
            />
        </>
    )
};