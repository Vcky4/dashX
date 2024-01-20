import React, { useContext, useState } from "react";
import { Image, KeyboardAvoidingView, Linking, Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";
import endpoints from "../../../assets/endpoints/endpoints";
import Toast from "react-native-toast-message";

export default Dispatch = ({ onEnd, item }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [code, setCode] = useState('')
    const [processing, setProcessing] = useState(false)
    const [inputCode, setInputCode] = useState(false)
    // console.log(item)

    const endDispatch = async () => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.deliverOrder, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "dispatchid": user.id,
                    "orderid": item._id,
                    "ordercode": code
                })
            })
            const json = await response.json()
            // console.log(json)
            setProcessing(false)
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Success',
                    text2: 'Order Delivered'
                })
                setInputCode(false)
                setCode('')
                onEnd()
            }
            else {
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: json.message
                })
            }
        }
        catch (error) {
            console.log(error)
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2: 'Something went wrong'
            })
            setProcessing(false)
        }
    }
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 10,
                marginBottom: 20,
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
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{
                        marginEnd: 10
                    }}
                        onPress={() => {
                            //navigate to whatsapp
                            //regex to replace first 0 with +234
                            const number = item?.recieverphone?.replace(/^0/, '+234')
                            Linking.openURL(`https://wa.me/${number}`)
                        }}>
                        <Image
                            source={require('../../../assets/images/whatsapp.png')}
                            style={{
                                width: 34,
                                height: 34,
                                resizeMode: "contain",
                            }}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        backgroundColor: colors[colorScheme].primary,
                        borderRadius: 20,
                        padding: 4,
                    }}
                        onPress={() => {
                            //call
                            Linking.openURL(`tel:${item?.recieverphone}`)
                        }}>
                        <Image
                            source={require('../../../assets/images/phone.png')}
                            style={{
                                width: 21,
                                height: 21,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].white,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{
                width: '100%',
                paddingHorizontal: 20,
                marginBottom: 10,
            }}>

                <View style={{
                    width: '100%',
                    flexDirection: 'row',
                    marginTop: 10,
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
                        }}>Enroute Delivery</Text>
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
            </View>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                marginLeft: 20,
                marginBottom: 10,
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
                        // height: 30,
                        flex: 0.8,
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
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        {/* <Image
                            source={require('../../../assets/images/point.png')}
                            style={{
                                width: 14,
                                height: 14,
                                resizeMode: "contain",
                                marginTop: 2,
                            }}
                        /> */}
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 14,
                            fontFamily: 'Inter-Bold',
                            marginLeft: 5,
                            marginBottom: 2,
                        }}>Pickup: <Text style={{
                            fontFamily: 'Inter-Medium',
                        }}>{item?.senderaddress}</Text></Text>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginTop: 5,
                    }}>
                        {/* <Image
                            source={require('../../../assets/images/point2.png')}
                            style={{
                                width: 14,
                                height: 14,
                                resizeMode: "contain",
                            }}
                        /> */}
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
            </View>
            <View style={{
                marginTop: 10,
                elevation: 10,
                backgroundColor: colors[colorScheme].background,
                borderRadius: 10,
                // shadowColor: colors[colorScheme].textGray,
                paddingHorizontal: 14,
                marginHorizontal: 10,
                paddingVertical: 10,
            }}>

                <View style={{
                    paddingHorizontal: 20,
                    paddingVertical: 2,
                    borderColor: colors[colorScheme].primary,
                    borderWidth: 1,
                    borderRadius: 10,
                    marginBottom: 10,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: 10,
                    width: '90%'
                }}>
                    <KeyboardAvoidingView>
                        <TextInput
                            placeholder="Enter Code"
                            value={code}
                            onChangeText={(text) => {
                                setCode(text)
                            }}
                            maxLength={6}
                            cursorColor={colors[colorScheme].primary}
                            placeholderTextColor={colors[colorScheme].textGray}
                            style={{
                                fontFamily: 'Inter-Medium',
                                fontSize: 23,
                                textAlign: 'center',
                                color: colors[colorScheme].textDark
                            }} />
                    </KeyboardAvoidingView>
                </View>
                <Button title={'End Dispatch'}
                    onPress={() => {
                        endDispatch()
                    }}
                    buttonStyle={{
                        borderRadius: 30,
                        height: 50,
                        width: '90%',
                        marginTop: 10,
                        alignSelf: 'center',
                        marginBottom: 10
                    }}
                    fontSize={16}
                    loading={processing}
                    enabled={code.length > 4 && !processing}
                />
            </View>

            {/* 
            <Modal
                animationType="slide"
                transparent={true}
                visible={inputCode}
                onRequestClose={() => {
                    setInputCode(!inputCode);
                }}
            >
                <TouchableOpacity onPress={() => setInputCode(!inputCode)}
                    style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                    }}>
                    <View style={{
                        backgroundColor: colors[colorScheme].background,
                        width: '80%',
                        borderRadius: 20,
                        padding: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'Inter-SemiBold',
                            fontSize: 20,
                            color: colors[colorScheme].textDark,
                            alignSelf: 'center',
                        }}>Input Code</Text>
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
                            marginTop: 20
                        }}>
                            <KeyboardAvoidingView>
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
                            </KeyboardAvoidingView>
                        </View>

                        <Button title={'End Dispatch'}
                            onPress={() => {
                                endDispatch()
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
                </TouchableOpacity>
            </Modal> */}
        </>
    )
}