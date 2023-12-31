import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Animated } from "react-native";
import Toast from 'react-native-toast-message';

import colors from "../../../assets/colors/colors";
import authRouts from "../../navigation/routs/authRouts";
import Button from "../../component/Button";
import PasswordInput from "../../component/PasswordInput";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";
import ArrowBack from '../../../assets/icons/arrow_back.svg'
import InputField from "../../component/InputField";
import SuccessIcon from '../../../assets/icons/success.svg'
import ErrorIcon from '../../../assets/icons/error.svg'


export default Login = ({ navigation }) => {
    const { login, playerId, user } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const canProceed = email.length > 5
        && password.length > 0;
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('')
    const [fadeIn] = useState(new Animated.Value(0));
    const [fade, setFade] = useState(0);
    useEffect(() => {
        message != '' && setFade(1)
        setTimeout(() => { setFade(0); setMessage('') }, 2500)
    }, [message]);

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: fade,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fade]);

    const loginUser = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.login, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "email": email,
                    "password": password
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
                        text1: 'Login successful',
                        text2: data.message
                    })
                    login(data.data.accessToken, data.data.user)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Login failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Login error:', data.message)
                }

            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: error.message
                });
                console.log('Login error:', error);
            })
    }
    return (
        <>
            <View style={{
                backgroundColor: colors.white,
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 24,
                paddingVertical: 20,
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    style={{}}>
                    <ArrowBack width={20} height={20} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    flex: 1,
                    textAlign: 'center',
                    marginRight: 20,
                    color: colors.black,
                    fontFamily: 'Inter-Regular'
                }}>Sign in</Text>

            </View>
            <ScrollView
                vertical
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    width: '100%',
                }}>
                <View style={styles.container}>
                    <View>
                        <Text style={styles.greetings}>Sign in to start accepting
                            delivery request  </Text>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.inputWrapper} >

                            <InputField
                                label="Email Address"
                                placeholder={'example@email.com'}
                                value={email} onChangeText={text => setEmail(text)}
                                selectionColor={colors.primary}
                                placeholderTextColor={colors.textGray} />
                        </KeyboardAvoidingView>
                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.inputWrapper} >

                            <PasswordInput
                                label="Password"
                                value={password}
                                placeholder={'At least 6 characters'}
                                onChangeText={text => setPassword(text)}
                                selectionColor={colors.primary}
                                placeholderTextColor={colors.textGray}
                            />
                        </KeyboardAvoidingView>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(authRouts.resetPassword)}
                            style={styles.forgotPassword}>
                            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{
                        marginTop: 34,
                        marginBottom: 70,
                    }}>
                        <Animated.View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginBottom: 30,
                            backgroundColor: success ? colors.success : colors.error,
                            borderRadius: 5,
                            padding: 10,
                            opacity: fadeIn,

                        }}>
                            {success ? <SuccessIcon /> : <ErrorIcon />}
                            <Text style={{
                                fontSize: 13,
                                fontFamily: 'Inter-Regular',
                                color: colors.textDark,
                                marginLeft: 10,
                            }}>{message}</Text>

                        </Animated.View>
                        <Button title={'Continue'}
                            onPress={() => {
                                loginUser()
                            }}
                            buttonStyle={styles.createAccountButton}
                            loading={processing}
                            enabled={canProceed & !processing}

                        />
                    </View>

                </View>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: 24,
        paddingTop: 10,
        justifyContent: 'space-between',
    },

    greetings: {
        fontSize: 20,
        fontFamily: "Inter-Bold",
        color: colors.textDark,
        width: '80%',
    },
    inputWrapper: {
        marginTop: 20,
    },
    emailInput: {
        paddingHorizontal: 16,
        borderRadius: 8,
        width: '100%',
        fontSize: 14,
        color: colors.activeText,
        fontFamily: "Poppins-Regular",
        height: 44,
        backgroundColor: colors.aliceBlue,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Popins-Regular',
        color: colors.textLight,
        marginBottom: 8,
    },
    passwordInput: {
        borderRadius: 8,
        color: colors.textDark,
        backgroundColor: colors.aliceBlue,
        fontFamily: "Poppins-Regular",
    },
    forgotPassword: {
        flexDirection: "row",
        marginTop: 4,
        width: "100%",
        justifyContent: "flex-end",
    },

    forgotPasswordText: {
        fontFamily: "Poppins-Medium",
        fontSize: 12,
        color: colors.primary,
    },
    createAccountButton: {
        borderRadius: 8,
        height: 55,

    },


});