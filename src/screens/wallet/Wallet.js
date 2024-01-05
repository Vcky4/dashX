import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";

export default Wallet = ({ navigation }) => {
    const { colorScheme, user } = useContext(AuthContext)
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
                }}>₦ 4,589.55</Text>
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
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
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
                                }}>Withdraw</Text>
                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                }}>To Bank Account</Text>
                            </View>
                        </View>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>₦ 4,589.55</Text>
                    </View>
                }
            />

        </View>
    )
}