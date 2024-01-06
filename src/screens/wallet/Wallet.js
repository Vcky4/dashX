import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import { RefreshControl } from "react-native-gesture-handler";

export default Wallet = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [processing, setProcessing] = React.useState(false)
    const [balance, setBalance] = React.useState({})
    const [history, setHistory] = React.useState([])


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
                if (Array.isArray(json.data)) {
                    console.log('resJson', resJson)
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
                // console.log('resJson', resJson.data)
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

    useEffect(() => {
        onRefresh()
    }, [])

    const onRefresh = () => {
        getBalance()
    }
    return (
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
                }}>₦ {balance?.balance?.toLocaleString()}</Text>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                }}>
                    <TouchableOpacity onPress={() => navigation.navigate(mainRouts.deposit)}
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
            />

        </View>
    )
}