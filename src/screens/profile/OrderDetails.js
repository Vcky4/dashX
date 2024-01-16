import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, Modal, ScrollView } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";
import Button from "../../component/Button";
import Toast from "react-native-toast-message";

export default OrderDetails = ({ navigation, route }) => {
    const { order } = route.params
    const { colorScheme, user, token } = useContext(AuthContext)
    const [modalVisible, setModalVisible] = React.useState(false);
    const [processing, setProcessing] = React.useState(false);
    console.log(order)

    const cancel = async () => {
        console.log(order._id)
        try {
            setProcessing(true)
            const response = await fetch(endpoints.baseUrl + endpoints.cancelOrder, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "orderid": order._id,
                    "dispatchid": user.id,
                })
            })
            const json = await response.json()
            setProcessing(false)
            console.log(json)
            if (json.status === 'success') {
                navigation.goBack()
                Toast.show({
                    type: 'success',
                    text1: 'Order cancelled',
                    text2: 'Order has been cancelled successfully',
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Order cancellation failed',
                    text2: json.message,
                })
            }
        }
        catch (e) {
            setProcessing(false)
            console.log(e)
            Toast.show({
                type: 'error',
                text1: 'Order cancellation failed',
                text2: e.message,
            })
        }
    }
    return (
        <>
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
                        }}>Dispatch Details</Text>
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

           <ScrollView>
           <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                    marginHorizontal: 20,
                    marginTop: 20,
                    marginBottom: 10,
                }}>Customer Details</Text>

                {
                    ['Name', 'Address', 'Phone'].map((item, index) =>
                        <View key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 20,
                                marginTop: 10,
                                justifyContent: 'space-between',
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={
                                        index == 0 ? require('../../../assets/images/user.png')
                                            : index == 1 ? require('../../../assets/images/pin.png')
                                                : require('../../../assets/images/user.png')
                                    }
                                    style={{
                                        width: 29,
                                        height: 29,
                                        resizeMode: "contain",
                                    }}
                                />
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                    marginLeft: 10,
                                }}>{item}</Text>
                            </View>
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                marginLeft: 10,
                                width: '50%',
                            }}>{
                                    index == 0 ? order?.sendername
                                        : index == 1 ? order?.senderaddress
                                            : order?.senderphone
                                }</Text>
                        </View>)
                }


                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                    marginHorizontal: 20,
                    marginTop: 20,
                    marginBottom: 10,
                }}>Reciever Details</Text>

                {
                    ['Name', 'Address', 'Phone'].map((item, index) =>
                        <View key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 20,
                                marginTop: 10,
                                justifyContent: 'space-between',
                                display: item === 'Phone' ? order.order_status !== 'pending' ?  'flex' : 'none' : 'flex',
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={
                                        index != 1 ? require('../../../assets/images/user.png') : require('../../../assets/images/pin.png')
                                    }
                                    style={{
                                        width: 29,
                                        height: 29,
                                        resizeMode: "contain",
                                    }}
                                />
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                    marginLeft: 10,
                                }}>{item}</Text>
                            </View>
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                marginLeft: 10,
                                width: '50%',
                            }}>{
                                    index == 0 ? order?.receivername
                                        : index === 1 ? order?.receiveraddress
                                            : order?.receiverphone
                                }</Text>
                        </View>)
                }

                <View style={{
                    width: '84%',
                    height: 0.4,
                    backgroundColor: colors[colorScheme].border,
                    alignSelf: 'center',
                    marginTop: 10,
                }} />

                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                    marginHorizontal: 20,
                    marginTop: 20,
                    marginBottom: 10,
                }}>Order Details</Text>

                {
                    [1, 2, 3, 4].map((item, index) =>
                        <View key={index}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginHorizontal: 20,
                                marginTop: 10,
                                justifyContent: 'space-between',
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={
                                        index == 0 ? require('../../../assets/images/cart.png')
                                            : index == 1 ? require('../../../assets/images/recent.png')
                                                : index == 2 ? require('../../../assets/images/money.png')
                                                    : require('../../../assets/images/pen.png')
                                    }
                                    style={{
                                        width: 29,
                                        height: 29,
                                        resizeMode: "contain",
                                    }}
                                />
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                    marginLeft: 10,
                                }}>{
                                        index == 0 ? 'Order ID:'
                                            : index == 1 ? 'Pick Up Time:'
                                                : index == 2 ? 'Payment Method: '
                                                    : 'Description:'
                                    }</Text>
                            </View>
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                marginLeft: 10,
                                width: '50%',
                            }}>{
                                    index == 0 ? order?._id
                                        : index == 1 ? order.pickuptime.length > 0
                                            ? new Date(order.pickuptime).toLocaleTimeString()
                                            : 'N/A'
                                            : index == 2 ? 'Cash'
                                                : order.productname
                                }</Text>
                        </View>)
                }


                <Button
                    title="Cancel Dispatch"
                    enabled={!processing}
                    loading={processing}
                    textColor={colors[colorScheme].white}
                    backgroundColor={colors[colorScheme].primary}
                    buttonColor={colors[colorScheme].primary}
                    onPress={() => setModalVisible(true)}
                    buttonStyle={{
                        width: '90%',
                        alignSelf: 'center',
                        marginTop: 30,
                        marginBottom: 20,
                        borderRadius: 50,
                        display: order.order_status !== 'pending' ? 'flex' : 'none',
                    }}
                />
           </ScrollView>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <View onPress={() => setModalVisible(true)}
                        style={{
                            backgroundColor: colors[colorScheme].background,
                            width: '90%',
                            borderRadius: 10,
                            padding: 20,
                        }}>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 20,
                            fontFamily: 'Inter-Regular',
                        }}>Cancel Dispatch?</Text>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                            marginTop: 10,
                        }}>
                            Are you sure you want to dispatch?
                        </Text>
                        <View style={{
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 30,
                            marginBottom: 10,
                            width: '100%',
                        }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}
                                style={{
                                    // backgroundColor: colors.white,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                    borderWidth: 1,
                                    borderColor: colors[colorScheme].primary,
                                }}>
                                <Text style={{
                                    color: colors[colorScheme].primary,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                    textAlign: 'center',
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                cancel()
                            }}
                                style={{
                                    backgroundColor: colors[colorScheme].primary,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                }}>
                                <Text style={{
                                    color: colors[colorScheme].white,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                    textAlign: 'center',
                                }}>proceed</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}