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
import PhoneInput from "../../component/PhoneInput";


export default SignUp = ({ navigation }) => {
    const { saveToken, saveUser, colorScheme } = useContext(AuthContext)
    const appearance = colorScheme
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [accountType, setAccountType] = useState("Personal")
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const canProceed =
        phone?.length === 11 &&
        password?.length > 0 &&
        name?.split(' ').length > 1 &&
        emailRegex.test(email)
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);

    const signUpUser = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.signUp, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {

                    "email": email,
                    "name": name,
                    "password": password,
                    "phone": phone,
                    "personel_account": accountType === 'Personal' ? true : false,
                }
            ) // body data type must match "Content-Type" header
        });
        response.json()
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'SignUp successful',
                        text2: data.data
                    })
                    navigation.navigate(authRouts.otpVerification)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'SignUp failed',
                        text2: data.message
                    });
                    // navigation.navigate(authRouts.otpVerification, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4MDczOWY3NGE2NDdmM2Q5N2YyYmYiLCJyb2xlIjoiUklERVIiLCJnZW5lcmF0b3IiOiIyMDIzMDcwNzEzMzgxN09BQkpNTlBWIiwiaWF0IjoxNjg4NzMzNDk3LCJleHAiOjE2ODg4MTk4OTd9.quJHfi-_YMVGrvc7e40ycvHLuB_wynf1LBxPxaIlvGk' })
                    console.log('response: ', response)
                    console.log('SignUp error:', data)
                }

            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'SignUp failed',
                    text2: error.message
                });
                console.log('response: ', response)
                console.log('SignUp error:', error);
            })
    }
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
                }}>Welcome</Text>

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
                    }}>Create account.</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            setAccountType('Personal')
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginLeft: 15,
                        }}>
                        <View style={{
                            height: 22,
                            width: 22,
                            borderRadius: 15,
                            borderWidth: 5,
                            borderColor: accountType === 'Personal' ? colors[appearance].primary : colors[appearance].textLight,
                        }} />
                        <Text style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 16,
                            color: colors[appearance].textDark,
                            marginLeft: 15,
                        }}>Personal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setAccountType('Business')
                        }}
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            marginLeft: 15,
                        }}>
                        <View style={{
                            height: 22,
                            width: 22,
                            borderRadius: 15,
                            borderWidth: 5,
                            borderColor: accountType === 'Business' ? colors[appearance].primary : colors[appearance].textLight,
                        }} />
                        <Text style={{
                            fontFamily: 'Inter-Regular',
                            fontSize: 16,
                            color: colors[appearance].textDark,
                            marginLeft: 15,
                        }}>Business</Text>
                    </TouchableOpacity>
                </View>

                <InputField
                    theme={appearance}
                    value={name}
                    onChangeText={setName}
                    placeholder="Full Name"
                    containerStyle={styles.input}
                />
                <InputField
                    theme={appearance}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter e-mail"
                    containerStyle={styles.input}
                />
                <PhoneInput
                    theme={appearance}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="Phone Number"
                    containerStyle={styles.input}
                />
                <PasswordInput
                    theme={appearance}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password"
                    containerStyle={styles.input}
                />

                <Button
                    title="Sign Up"
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
                        signUpUser()
                        // navigation.navigate(authRouts.otpVerification)
                    }}
                />

                <Text style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 14,
                    color: colors[appearance].textDark,
                    textAlign: 'center',
                    marginTop: 20,
                    fontStyle: 'italic'
                }}>Already have an account?
                    <Text
                        onPress={() => {
                            navigation.navigate(authRouts.login)
                        }}
                        style={{
                            color: colors[appearance].primary,
                            fontFamily: 'Inter-SemiBold',
                        }}>  Sign in</Text></Text>

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