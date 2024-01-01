import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Animated } from "react-native";
import Toast from 'react-native-toast-message';

import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";


export default ForgetPassword = ({ navigation }) => {
    const { saveToken, saveUser, colorScheme } = useContext(AuthContext)
    const appearance = colorScheme
    const [email, setEmail] = useState("")
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const canProceed =
        emailRegex.test(email)
    const [processing, setProcessing] = useState(false);

    // const loginUser = async () => {
    //     setProcessing(true)
    //     const response = await fetch(endpoints.baseUrl + endpoints.login, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(
    //             {
    //                 "email": email,
    //                 "password": password,
    //             }
    //         ) // body data type must match "Content-Type" header
    //     });
    //     response.json()
    //         .then((data) => {
    //             console.log(data); // JSON data parsed by `data.json()` call
    //             setProcessing(false)
    //             if (response.ok) {
    //                 Toast.show({
    //                     type: 'success',
    //                     text1: 'Login successful',
    //                     text2: data.message
    //                 })
    //                 // saveUser(data.user)
    //                 // navigation.navigate(authRouts.otpVerification, { token: data.data.accessToken })
    //             } else {
    //                 Toast.show({
    //                     type: 'error',
    //                     text1: 'Login failed',
    //                     text2: data.message
    //                 });
    //                 navigation.navigate(authRouts.otpVerification, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4MDczOWY3NGE2NDdmM2Q5N2YyYmYiLCJyb2xlIjoiUklERVIiLCJnZW5lcmF0b3IiOiIyMDIzMDcwNzEzMzgxN09BQkpNTlBWIiwiaWF0IjoxNjg4NzMzNDk3LCJleHAiOjE2ODg4MTk4OTd9.quJHfi-_YMVGrvc7e40ycvHLuB_wynf1LBxPxaIlvGk' })
    //                 console.log('response: ', response)
    //                 console.log('Login error:', data)
    //             }

    //         })
    //         .catch((error) => {
    //             setProcessing(false)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'Login failed',
    //                 text2: error.message
    //             });
    //             console.log('response: ', response)
    //             console.log('Login error:', error);
    //         })
    // }
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[appearance].background
        }}>
            <View style={{
                flexDirection: 'row',
                backgroundColor: colors[appearance].primary,
                height: 50,
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 20
            }}>
                <Image
                    source={require('../../../assets/images/logo.png')}
                    style={{
                        width: 70,
                        resizeMode: 'contain'
                    }}
                />
            </View>

            <ScrollView style={{
                paddingHorizontal: 20,
                paddingVertical: 16,
            }}>
                <Text style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 32,
                    color: colors[appearance].textDark,
                }}>Forget Password</Text>

                <View style={{
                    marginTop: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                }}>
                    <View style={{
                        height: 22,
                        width: 22,
                        borderRadius: 15,
                        borderWidth: 5,
                        borderColor: colors[appearance].primary,
                    }} />
                    <Text style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        marginLeft: 15,
                    }}>Recovery.</Text>
                </View>

                <InputField
                    theme={appearance}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter e-mail"
                    containerStyle={styles.input}
                />


                <Button
                    title="Send Code"
                    buttonStyle={{
                        marginTop: 30,
                        marginHorizontal: 20,
                        borderRadius: 30,
                    }}
                    loading={processing}
                    enabled={canProceed && !processing}
                    textColor={colors[appearance].textDark}
                    buttonColor={colors[appearance].primary}
                    onPress={() => {
                        // loginUser()
                        navigation.navigate(authRouts.resetPassword)
                    }}
                />

                <Text style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 14,
                    color: colors[appearance].textDark,
                    textAlign: 'center',
                    marginTop: 20,
                    fontStyle: 'italic'
                }}>Don’t have a DashX Account?
                    <Text
                        onPress={() => {
                            navigation.navigate(authRouts.signUp)
                        }}
                        style={{
                            color: colors[appearance].primary,
                            fontFamily: 'Inter-SemiBold',
                        }}>  Sign Up</Text></Text>

                <Text style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 14,
                    color: colors[appearance].textDark,
                    textAlign: 'center',
                    marginTop: 30,
                    fontStyle: 'italic',
                    paddingHorizontal: 20
                }}>By continuing, you agree to Dash X
                    <Text style={{
                        color: colors[appearance].primary,
                        fontWeight: 'bold',
                    }}> Conditions of use </Text> and<Text style={{
                        color: colors[appearance].primary,
                        fontWeight: 'bold',
                    }}> Privacy Notice</Text></Text>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        marginHorizontal: 20,
    }
});