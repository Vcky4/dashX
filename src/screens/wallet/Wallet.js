import React, { useCallback, useContext, useEffect, useRef } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import { RefreshControl } from "react-native-gesture-handler";
import BottomSheet from 'react-native-simple-bottom-sheet';
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import { useFocusEffect } from "@react-navigation/native";

export default Wallet = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const appearance = colorScheme;
    const [processing, setProcessing] = React.useState(false)
    const [balance, setBalance] = React.useState({})
    const [history, setHistory] = React.useState([])
    const [amount, setAmount] = React.useState('')
    const canproceed = amount.length >= 4 // Check if amount is greater than or equal to 4 digits
    const [isOpen, setIsOpen] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)
    const panelRef = useRef();

    const deposit = () => {
        setIsLoading(true)
        fetch(endpoints.baseUrl + endpoints.fundwallet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                amount: parseInt(amount),
                email: user?.email,
                usertype: "dispatch"
            }),
        }).then(res => res.json())
            .then(resJson => {
                setIsLoading(false)
                console.log('resJson', resJson);
                if (resJson.status) {
                    panelRef.current.togglePanel()
                    navigation.navigate(mainRouts.browser, {
                        url: resJson.data,
                        title: 'Deposit'
                    });
                }
            })
            .catch(err => {
                setIsLoading(false)
                console.log('err', err);
            });
    };

    const getHistory = (id) => {
        setProcessing(true)
        fetch(endpoints.baseUrl + endpoints.walletHistory, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                walletid: id
            }),
        }).then(res => res.json())
            .then(resJson => {
                setProcessing(false)
                if (Array.isArray(resJson.data)) {
                    // console.log('resJson', resJson)
                    setHistory(resJson.data)
                }
            })
            .catch(err => {
                setProcessing(false)
                console.log('err', err)
            })
    }

    const getBalance = () => {
        setProcessing(true)
        fetch(endpoints.baseUrl + endpoints.getBalance, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
            }),
        }).then(res => res.json())
            .then(resJson => {
                setProcessing(false)
                // console.log('balance', resJson.data)
                if (resJson.status) {
                    setBalance(resJson.data)
                    getHistory(resJson.data._id)
                }
            })
            .catch(err => {
                setProcessing(false)
                console.log('err', err)
            })
    }

    useFocusEffect(
        useCallback(() => {
            onRefresh()
        }, [])
    )

    const onRefresh = () => {
        getBalance()
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
                        }}>Wallet</Text>
                    </View>
                </View>

                <View style={{
                    backgroundColor: colors[colorScheme].black,
                    padding: 20,
                    borderRadius: 20,
                    marginTop: 20,
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                    }}>Total Balance</Text>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                        marginVertical: 15,
                    }}>₦ {balance?.balance?.toLocaleString() || '0.00'}</Text>
                    <View style={{
                        marginTop: 10,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <TouchableOpacity onPress={() => panelRef.current.togglePanel()}
                            style={{
                                backgroundColor: colors[colorScheme].primary,
                                paddingHorizontal: 16,
                                paddingVertical: 8,
                                borderRadius: 20,
                            }}>
                            <Text style={{
                                color: colors[colorScheme].white,
                                fontSize: 16,
                                fontFamily: 'Inter-SemiBold',
                            }}>+ Deposit</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate(mainRouts.withdraw)}
                        style={{
                            backgroundColor: colors[colorScheme].primary,
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 20,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        <Image
                            source={require('../../../assets/images/down.png')}
                            style={{
                                width: 12,
                                height: 12,
                                resizeMode: "contain",
                            }}
                        />
                        <Text style={{
                            color: colors[colorScheme].white,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                            marginLeft: 5,
                        }}>Withdraw</Text>
                    </TouchableOpacity>
                    </View>
                </View>

                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-SemiBold',
                    marginHorizontal: 20,
                    marginTop: 16,
                }}>Recent Transactions</Text>


                <FlatList
                    refreshControl={
                        <RefreshControl
                            refreshing={processing}
                            onRefresh={onRefresh}
                        />
                    }
                    data={history}
                    contentContainerStyle={{
                        paddingBottom: 20,
                    }}
                    renderItem={({ item }) =>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginHorizontal: 20,
                            marginTop: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    backgroundColor: colors[colorScheme].primary,
                                    padding: 10,
                                    borderRadius: 10,
                                }}>
                                    <Image
                                        source={require('../../../assets/images/down.png')}
                                        style={{
                                            width: 12,
                                            height: 12,
                                            resizeMode: "contain",
                                        }}
                                    />
                                </View>
                                <View style={{
                                    marginLeft: 10,
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-SemiBold',
                                    }}>Deposit</Text>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 14,
                                        fontFamily: 'Inter-Regular',
                                    }}>To wallet</Text>
                                </View>
                            </View>
                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 16,
                                fontFamily: 'Inter-SemiBold',
                            }}>₦{item.amount.toLocaleString()}</Text>
                        </View>
                    }
                    ListEmptyComponent={
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 60,
                        }}>
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 14,
                                fontFamily: 'Inter-SemiBold',
                            }}>No transactions yet</Text>
                        </View>
                    }
                />

            </View>
            <BottomSheet isOpen={isOpen}
                wrapperStyle={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    elevation: 10,
                    backgroundColor: colors[colorScheme].background,
                    flex: 1,
                }}
                sliderMinHeight={0}
                onOpen={() => {
                    setIsOpen(true)
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                ref={ref => panelRef.current = ref}
            >
                <View style={{ paddingHorizontal: 20 }}>
                    <Text style={{
                        fontFamily: 'Satoshi-Bold',
                        fontSize: 24,
                        color: colors[appearance].textDark,
                        marginTop: 20,
                        textAlign: 'center'
                    }}>
                        Deposit
                    </Text>
                    <Text style={{
                        fontFamily: 'Satoshi-Medium',
                        fontSize: 15,
                        color: colors[appearance].textDark,
                        marginTop: 20,
                    }}>
                        Enter Amount (NGN)
                    </Text>
                    {/* Input field for amount */}
                    <InputField
                        theme={appearance}
                        value={amount}
                        onChangeText={setAmount}
                        keyboardType='numeric'
                        placeholder="Enter Amount"
                        containerStyle={{ marginTop: 16 }}
                    />
                    {/* Note for amount */}
                    {
                        amount.length > 1 && amount <= 100 &&
                        <Text style={{
                            color: colors[appearance].error,
                        }}>Note: Amount cannot be less than #100</Text>
                    }

                    {/* Buttons for Cancel and Recharge Wallet */}
                    <View style={{
                        marginTop: 40,
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginBottom: 20,
                        justifyContent: 'space-between'
                    }}>
                        {/* Cancel button */}
                        <Button
                            title="Cancel"
                            buttonStyle={{
                                borderRadius: 10,
                                width: '45%'
                            }}
                            enabled={true}
                            textColor={colors[appearance].buttonLight}
                            buttonColor={colors[appearance].card}
                            onPress={() => {
                                panelRef.current.togglePanel()
                            }}
                        />
                        {/* Recharge Wallet button */}
                        <Button
                            title="Proceed"
                            buttonStyle={{
                                borderRadius: 10,
                                width: '45%'
                            }}
                            loading={isLoading}
                            enabled={canproceed}
                            textColor={colors[appearance].white}
                            buttonColor={colors[appearance].primary}
                            onPress={() => {
                                deposit()
                            }}
                            fontSize={16}
                        />
                    </View>
                </View>
            </BottomSheet>
        </>
    )
}