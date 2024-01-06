import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";
import Button from "../../component/Button";

export default Deposit = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [processing, setProcessing] = React.useState(false)
    const [amount, setAmount] = React.useState('5000')

    const deposit = () => {
        setProcessing(true)
        fetch(endpoints.baseUrl + endpoints.fundwallet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                "amount": amount,
                "email": user?.email,
                "usertype": "dispatch"
            }),
        }).then(res => res.json())
            .then(resJson => {
                setProcessing(false)
                console.log('resJson', resJson)
                if (resJson.status) {
                    navigation.navigate(mainRouts.browser, {
                        url: resJson.data,
                        title: 'Deposit'
                    })
                }
            })
            .catch(err => {
                setProcessing(false)
                console.log('err', err)
            })
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
                    }}>Deposit</Text>
                </View>
            </View>


            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 18,
                        fontFamily: 'Inter-Bold',
                        marginHorizontal: 20,
                        marginTop: 50,
                    }}>Deposit To</Text>
                    <View style={{
                        backgroundColor: '#D8C7FF',
                        padding: 20,
                        borderRadius: 20,
                        marginTop: 20,
                        marginHorizontal: 20,
                    }}>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>Emmanuel Jonah</Text>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 24,
                            fontFamily: 'Inter-Bold',
                            marginVertical: 15,
                        }}>Wema Bank</Text>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 24,
                            fontFamily: 'Inter-Bold',
                        }}>4567809844567</Text>
                    </View>
                </View>

                <Button
                    title={`Deposit ₦ ${amount.toLocaleString()}`}
                    buttonStyle={{
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 30,
                        marginBottom: 50,
                    }}
                    loading={processing}
                    enabled={amount.length > 0 && !processing}
                    textColor={colors[colorScheme].textDark}
                    buttonColor={colors[colorScheme].primary}
                    onPress={() => deposit()}
                />

            </View>
        </View>
    )
}