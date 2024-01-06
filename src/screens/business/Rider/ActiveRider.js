import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import colors from "../../../../assets/colors/colors";
import businessRoutes from "../../../navigation/routs/businessRouts";
import endpoints from "../../../../assets/endpoints/endpoints";
import { RefreshControl } from "react-native-gesture-handler";

export default ActiveRider = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [activeFleets, setActiveFleets] = useState([]);
    const [processing, setProcessing] = useState(false)


    const getActiveRiders = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.activeFleet, {
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
        setProcessing(false)
        // console.log(json)
        //check if array
        if (Array.isArray(json.data)) {
            setActiveFleets(json.data)
            // if (dispatchItem === null) {
            //     setDispatchItem(json.data[0])
            // }
            // setDispatchItem(json.data[0])
        }
    }

    useEffect(() => {
        getActiveRiders()
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
                    }}>Active Riders</Text>
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
                    }}>{activeFleets.length}</Text>
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={processing}
                            onRefresh={getActiveRiders}
                        />
                    }
                    data={activeFleets}
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