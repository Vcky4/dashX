import React, { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import BottomSheet from 'react-native-simple-bottom-sheet';
import endpoints from "../../../assets/endpoints/endpoints";


const { width, height } = Dimensions.get('window')

export default Withdraw = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [account, setAccount] = useState({
        bank_name: '',
        account_number: '',
        account_name: '',
        amount: '',
        bank_code: '',
    })
    const [isOpen, setIsOpen] = React.useState(false)
    const panelRef = useRef();
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [banks, setBanks] = useState([])

    const canProceed = account.amount.length > 0 && account.account_number.length == 10 && account.bank_name.length > 0 && account.account_name.length > 0

    const getBanks = () => {
        setLoading(true)
        fetch(endpoints.baseUrl + endpoints.getBanks, {
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
                setLoading(false)
                // console.log('resJson', resJson.data)
                if (Array.isArray(resJson.data.data)) {
                    setBanks(resJson?.data?.data)
                }
            })
            .catch(err => {
                setLoading(false)
                console.log('err', err)
            })
    }

    const verifyAccount = () => {
        setLoading(true)
        fetch(endpoints.baseUrl + endpoints.verifyBank, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                account_number: account.account_number,
                bank_code: account.bank_code,
            }),
        }).then(res => res.json())
            .then(resJson => {
                setLoading(false)
                console.log('verify bank', resJson)
            })
            .catch(err => {
                setLoading(false)
                console.log('err', err)
            })
    }

    useEffect(() => {
        if (account.account_number.length == 10 && account.bank_code.length > 0) {
            verifyAccount()
        }
    }, [account.account_number, account.bank_code])
    useEffect(() => {
        getBanks()
    }, [])
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                paddingBottom: 30,
                marginBottom: 20,
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
                    }}>Withdraw</Text>
                </View>
            </View>

            <View style={{
                justifyContent: 'space-between',
                flex: 1,
                marginBottom: 60,
            }}>
                <View>

                    <InputField
                        theme={colorScheme}
                        value={account.amount}
                        onChangeText={(text) => setAccount({ ...account, amount: text })}
                        placeholder="Amount"
                        containerStyle={styles.input}
                        label="Amount"
                    />

                    <InputField
                        theme={colorScheme}
                        value={account.account_number}
                        onChangeText={(text) => {
                            if (text.length < 11) {
                                setAccount({ ...account, account_number: text })
                            }
                            // if (text.length === 10) {
                            //     //hide keyboard
                            //     panelRef.current.togglePanel()
                            // }
                        }}
                        placeholder="23456789023"
                        containerStyle={styles.input}
                        label="Account number"
                        inputMode="numeric"
                    />
                    <TouchableOpacity
                        onPress={() => {
                            panelRef.current.togglePanel()
                        }}
                    >
                        <InputField
                            theme={colorScheme}
                            value={account.bank_name}
                            onChangeText={(text) => setAccount({ ...account, bank_name: text })}
                            placeholder="GT Bank"
                            containerStyle={styles.input}
                            label="Bank"
                            editable={false}
                        />
                    </TouchableOpacity>


                    <InputField
                        theme={colorScheme}
                        value={account.account_name}
                        onChangeText={(text) => setAccount({ ...account, account_name: text })}
                        placeholder="Adeola Adeyemi"
                        containerStyle={styles.input}
                        label="Account name"
                        editable={false}
                    />
                </View>

                <Button
                    title="Withdraw"
                    buttonStyle={{
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 30,
                    }}
                    loading={loading}
                    enabled={canProceed}
                    textColor={colors[colorScheme].textDark}
                    buttonColor={colors[colorScheme].primary}
                    onPress={() => {
                        // loginUser()
                        // navigation.navigate(authRouts.otpVerification)
                    }}
                />
            </View>



            <BottomSheet isOpen={isOpen}
                wrapperStyle={{
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    elevation: 10,
                    backgroundColor: colors[colorScheme].background,
                    flex: 1,
                }}
                sliderMinHeight={0}
                sliderMaxHeight={height * 0.5}
                onOpen={() => {
                    setIsOpen(true)
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                ref={ref => panelRef.current = ref}
            >
                <InputField
                    theme={colorScheme}
                    value={query}
                    onChangeText={(text) => setQuery(text)}
                    placeholder="Search bank"
                    containerStyle={{}}
                />
                <View style={{
                    width: '100%', backgroundColor: colors[colorScheme].background,
                    alignSelf: "center",
                    height: height * 0.5 - 50,
                }}>

                    <FlatList
                        data={banks.filter(bank => bank.name.toLowerCase().includes(query.toLowerCase()))}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={{ paddingVertical: 6 }}
                                onPress={() => {
                                    setAccount({ ...account, bank_name: item?.name, bank_code: item?.code })
                                    panelRef.current.togglePanel()
                                }}
                            >
                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                }}>
                                    {item?.name}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </BottomSheet>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 38,
        marginHorizontal: 24,
    }
})