import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Dimensions } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import PendingOrderItem from "./PendingOrderItem";
import endpoints from "../../../assets/endpoints/endpoints";

const { width, height } = Dimensions.get('window');


export default PendingOrder = ({ item }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const appearance = colorScheme
    const [orders, setOrders] = useState([])
    const [processing, setProcessing] = useState(false)
    const [selectCity, setSelectCity] = useState(false)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState('')

    const getCities = async () => {
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.city, {
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
            // console.log('cities', json)
            //check if array
            if (Array.isArray(json.data)) {
                setCities(json.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getCities()
    }, [])

    const getOrders = async () => {
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.listOdrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    'city': city,
                    "dispatchid": user.id,
                })
            })
            const json = await response.json()
            // console.log(json)
            //check if array
            if (Array.isArray(json.data)) {
                setOrders(json.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const acceptOrders = async (id) => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.acceptOrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "dispatchid": user.id,
                    "orderid": id
                })
            })
            const json = await response.json()
            setProcessing(false)
            console.log(json)
            setOrders(orders.filter((item) => item._id !== id))
            //check if array
            if (Array.isArray(json.data)) {
                // setOrders(json.data)
            }
        } catch (error) {
            setProcessing(false)
            console.error(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [city])
    return (
        <>
            <FlatList style={{
                backgroundColor: colors[colorScheme].background,
                width: '100%',
                paddingHorizontal: 5,
                height: height - 200,
            }}
                data={orders}
                renderItem={({ item }) =>
                    <PendingOrderItem
                        processing={processing}
                        onPress={() => {
                            acceptOrders(item._id)
                        }}
                        item={item} />
                }

                ListHeaderComponent={
                    <TouchableOpacity onPress={() => setSelectCity(true)}
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderColor: colors[colorScheme].primary,
                            borderWidth: 1,
                            borderRadius: 30,
                            width: '60%',
                        }}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                            <Image
                                source={require('../../../assets/images/point.png')}
                                style={{
                                    width: 22,
                                    height: 22,
                                    resizeMode: "contain",
                                    marginEnd: 5,
                                    // tintColor: colors[colorScheme].textDark,
                                }}
                            />
                            <Text
                                style={{
                                    color: colors[colorScheme].primary,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Medium',
                                }}>{city}</Text>
                        </View>

                        <Image
                            source={require('../../../assets/images/back.png')}
                            style={{
                                width: 22,
                                height: 22,
                                resizeMode: "contain",
                                transform: [{ rotate: '180deg' }],
                                tintColor: colors[colorScheme].primary,
                                // tintColor: colors[colorScheme].textDark,
                            }}
                        />
                    </TouchableOpacity>
                }
                ListEmptyComponent={
                    <View style={{
                        flex: 1,
                    }}>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-Bold',
                            alignSelf: 'center',
                            marginTop: 30,
                        }}>No pending orders here</Text>
                    </View>
                }
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={selectCity}
                onRequestClose={() => {
                    setSelectCity(!selectCity);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                    <View style={{
                        backgroundColor: colors[appearance].background,
                        width: '60%',
                        borderRadius: 20,
                        padding: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                            color: colors[appearance].textDark,
                            alignSelf: 'center',
                        }}>Select City</Text>
                        <ScrollView style={{
                            marginTop: 20,
                        }}>
                            {
                                cities.map((item, index) =>
                                    <TouchableOpacity
                                    style={{
                                        borderTopWidth: 1,
                                        borderTopColor: colors[appearance].primary,
                                    }}
                                     key={index} onPress={() => {
                                        setCity(item)
                                        setSelectCity(false)
                                    }}>
                                        <Text style={{
                                            fontFamily: 'Inter-Medium',
                                            fontSize: 16,
                                            color: colors[appearance].textDark,
                                            alignSelf: 'center',
                                            marginVertical: 10,
                                        }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}