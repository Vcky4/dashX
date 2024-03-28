import React, { useContext, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import BottomSheet from 'react-native-simple-bottom-sheet';


export default Withdraw = ({ navigation }) => {
    const { colorScheme, user } = useContext(AuthContext)
    const [account, setAccount] = useState({
        bank_name: '',
        account_number: '',
        account_name: '',
        amount: ''
    })
    const [isOpen, setIsOpen] = React.useState(false)
    const panelRef = useRef();
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
                        onChangeText={(text) => setAccount({ ...account, account_number: text })}
                        placeholder="23456789023"
                        containerStyle={styles.input}
                        label="Account number"
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
                    />
                </View>

                <Button
                    title="Withdraw"
                    buttonStyle={{
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 30,
                    }}
                    loading={false}
                    enabled={true}
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
                onOpen={() => {
                    setIsOpen(true)
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                ref={ref => panelRef.current = ref}
            >
                <View style={{ width: '100%', backgroundColor: colors[colorScheme].background, alignSelf: "center" }}>

                    <FlatList
                        data={[1, 2, 3, 4,5,6,7,8,9]}
                        renderItem={() => (
                            <TouchableOpacity
                            style={{paddingVertical:6}}
                            onPress={()=>{}}
                            >

                            <Text style={{
                                color: colors[colorScheme].textDark,
                                fontSize: 16,
                                fontFamily: 'Inter-Regular',
                            }}>
                                Bank name
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