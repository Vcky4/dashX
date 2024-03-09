import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Modal, ScrollView, Text, TouchableOpacity, View, Dimensions, RefreshControl } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import PendingOrderItem from "./PendingOrderItem";
import endpoints from "../../../assets/endpoints/endpoints";
import profileRouts from "../../navigation/routs/profileRouts";
import getAddress from "../../utils/getAddress";
import Toast from "react-native-toast-message";
import getCity from "../../utils/getCity";


const { width, height } = Dimensions.get('window');


export default PendingOrder = ({ navigation, onClose, onNewOrderChange = () => { } }) => {
    const { colorScheme, user, token, socket } = useContext(AuthContext)
    const appearance = colorScheme
    const [orders, setOrders] = useState([])
    const [processing, setProcessing] = useState(false)
    const [selectCity, setSelectCity] = useState(false)
    const [cities, setCities] = useState([])
    const [city, setCity] = useState({
        cityName: 'ajah'
    })
    const isBusiness = !(user?.personel_account ?? true)

    const getAddres = (lat, lng) => {
        getAddress(lat, lng, (result) => {
            // console.log('getAddress', result)
            setCity({
                cityName: getCity(result[0]?.formatted_address),
            })
        })
    }

    useEffect(() => {
        if (user?.cordinate?.latitude && user?.cordinate?.longitude) {
            getAddres(user?.cordinate?.latitude, user?.cordinate?.longitude)
        }
    }, [user?.cordinate])

    //connect socket
    useEffect(() => {
        // if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
        if (!isBusiness) {
            socket.on('connect', e => {
                console.log('connected', socket.connected);
                // socket.emit('joinorderdispatch', {
                //     "dispatchid": user.id
                // })
                socket.emit('request_city', {
                    "dispatchid": user.id
                })
            });

            socket.on('receieve_city', e => {
                // console.log('receieve_city', e);
                //check if array
                if (Array.isArray(e) && e.length > 0) {
                    setCities(e)
                    // setCity(e[0])
                }
            })

            socket.on('receieve_pending_order', e => {
                // console.log('receieve_pending_order', e);
                //check if array
                if (Array.isArray(e)) {
                    setOrders(e)
                    onNewOrderChange(e.length)
                }
            })

        }
        socket.on('disconnect', e => {
            console.log('disconnected', socket.connected);
        });
        // }
        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receieve_city');
            socket.off('receieve_pending_order');
        };
    }, []);


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
            // console.log('cities', json.data)
            //check if array
            if (Array.isArray(json.data)) {
                if (cities.length === json.data.length) return
                setCities(json.data)
                // setCity(json.data[0])
            }
        } catch (error) {
            console.error(error.toString())
        }
    }
    useEffect(() => {
        getCities()
    }, [])

    const getOrders = async () => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.listOdrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    'city': city.cityName,
                    "dispatchid": user.id,
                })
            })
            const json = await response.json()
            // console.log(city.cityName, json)
            setProcessing(false)
            //check if array
            if (Array.isArray(json.data)) {
                if (orders.length !== json.data.length) {
                    setOrders(json.data)
                    onNewOrderChange(json.data.length)
                }
            }
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getOrders()
        if (city?.cityName) {
            socket.emit('request_pending_order', {
                "dispatchid": user.id,
                "city": city.cityName,
            })
        }
    }, [city])

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
            // console.log(json)
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Order accepted',
                    text2: json.message
                })
                onNewOrderChange(orders.length - 1)
                setOrders(orders.filter((item) => item._id !== id))
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Order accept failed',
                    text2: json.message
                })
            }
        } catch (error) {
            setProcessing(false)
            console.error(error)
        }
    }

    return (
        <>
            <FlatList style={{
                backgroundColor: colors[colorScheme].background,
                width: '100%',
                height: height - 200,
            }}
                contentContainerStyle={{
                    paddingHorizontal: 10
                }}
                refreshControl={
                    <RefreshControl
                        refreshing={processing}
                        onRefresh={getOrders}
                    />
                }
                data={orders}
                renderItem={({ item }) =>
                    <PendingOrderItem
                        processing={processing}
                        onAccept={() => {
                            acceptOrders(item._id)
                        }}
                        onPress={() => {
                            onClose()
                            navigation.navigate(profileRouts.orderDetails, { order: item })
                        }}
                        item={item} />
                }

                ListHeaderComponent={
                    <TouchableOpacity onPress={() => setSelectCity(true)}
                        style={{
                            flexDirection: 'row',
                            // justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
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
                                }}>{city?.cityName}</Text>
                        </View>

                        {/* <Image
                            source={require('../../../assets/images/back.png')}
                            style={{
                                width: 22,
                                height: 22,
                                resizeMode: "contain",
                                transform: [{ rotate: '180deg' }],
                                tintColor: colors[colorScheme].primary,
                                // tintColor: colors[colorScheme].textDark,
                            }}
                        /> */}
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
                        }}>Orders not in your current location</Text>
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
                <TouchableOpacity onPress={() => setSelectCity(!selectCity)}
                    style={{
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
                        }}>Cities</Text>
                        <ScrollView style={{
                            marginTop: 20,
                        }}>
                            {
                                cities.map((item, index) =>
                                    <TouchableOpacity
                                        style={{
                                            borderTopWidth: 1,
                                            borderTopColor: colors[appearance].primary,
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
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
                                        }}>{item?.cityName}</Text>

                                        <Text style={{
                                            fontFamily: 'Inter-Medium',
                                            fontSize: 16,
                                            color: colors[appearance].textDark,
                                            alignSelf: 'center',
                                            marginVertical: 10,
                                        }}>{item?.length}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        </ScrollView>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}