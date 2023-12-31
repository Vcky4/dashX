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


export default ResetPassword = ({ navigation }) => {
    const [email, setEmail] = useState("")
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const [processing, setProcessing] = useState(false);
    const [success, setSuccess] = useState(false);
    const [message, setMessage] = useState('')
    const [step, setStep] = useState(1)
    const [otp, setOtp] = useState("")
    const [password, setPassword] = useState("")
    const [timerCount, setTimer] = useState(0);
    const [activator, setActivator] = useState(Math.random());

    const canProceed = step == 1 ? emailRegex.test(email)
        : otp.length == 4 && password.length > 4;

    useEffect(() => {
        let interval;
        // if (text.length == 4) {
        //   // verify(text);
        // }
        interval = setInterval(() => {
            if (timerCount > 0) {
                setTimer(lastTimerCount => {
                    lastTimerCount <= 1 && clearInterval(interval);
                    return lastTimerCount - 1;
                });
            }
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, [activator]);

    const resend = async () => {
        setTimer(60);
        setActivator(Math.random());
        const response = await fetch(endpoints.baseUrl + endpoints.resend, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
            }),
        });
        response
            .json()
            .then(data => {
                setProcessing(false);
                console.log(data);
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Resend Successful',
                        text2: data.message,
                    });
                    setTimer(60);
                    setActivator(Math.random());
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Resend Failed',
                        text2: data.message,
                    });
                }
            })
            .catch(err => {
                setTimer(0);
                setActivator(Math.random());
                Toast.show({
                    type: 'error',
                    text1: 'Code resend Failed',
                    text2: err.message,
                });
                console.log(err.message);
            });
    };

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

    const forgetPassword = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.forgotPassword, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "email": email
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
                        text1: 'Successful',
                        text2: data?.message
                    })
                    setStep(2)
                    setTimer(60);
                    setActivator(Math.random());
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Reset failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('forget password error:', data.message)
                }

            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Reset failed',
                    text2: error.message
                });
                console.log('response: ', response)
                console.log('forget password error:', error);
            })
    }

    const resetPassword = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.resetPassword, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "otp": parseInt(otp),
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
                        text1: 'Successful',
                        text2: 'Password reset successful'
                    })
                    navigation.goBack()
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Reset failed',
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
                    text1: 'Reset failed',
                    text2: error.message
                });
                console.log('response: ', response)
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
                }}>Reset Password</Text>

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
                        <Text style={styles.greetings}>{
                            step == 1 ? "Enter your email address below"
                                : "Enter the OTP sent to your email address"
                        }</Text>
                        <Text style={{
                            fontSize: 13,
                            fontFamily: 'Inter-Regular',
                            color: colors.textDark,
                            marginTop: 10,
                        }}>Remember password? <Text onPress={() => navigation.navigate(authRouts.login)}
                            style={{
                                fontFamily: 'Inter-Bold',
                            }}>Back to login</Text>
                        </Text>
                        {step == 1 ?
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
                            :
                            <>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                                    style={styles.inputWrapper} >

                                    <InputField
                                        label="Otp"
                                        placeholder={'enter otp here'}
                                        value={otp} onChangeText={text => setOtp(text)}
                                        selectionColor={colors.primary}
                                        placeholderTextColor={colors.textGray} />
                                    <TouchableOpacity
                                        onPress={() => {
                                            timerCount > 0 ? {} : resend();
                                        }}
                                        style={styles.resend}>
                                        <Text style={styles.resend}>
                                            {timerCount > 0 ? '0:' + timerCount : 'Resend'}
                                        </Text>
                                    </TouchableOpacity>
                                </KeyboardAvoidingView>
                                <KeyboardAvoidingView
                                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                                    style={styles.inputWrapper} >

                                    <InputField
                                        label="New Password"
                                        placeholder={'enter new password here'}
                                        value={password} onChangeText={text => setPassword(text)}
                                        selectionColor={colors.primary}
                                        placeholderTextColor={colors.textGray} />
                                </KeyboardAvoidingView>
                            </>
                        }

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
                        <Button title={
                            step == 1 ? "Continue" : "Reset Password"
                        }
                            onPress={() => {
                                step == 1 ? forgetPassword() : resetPassword()
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
        fontFamily: "Inter-Medium",
        color: colors.textDark,
        width: '60%',
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
        fontFamily: "Inter-Regular",
        height: 44,
        backgroundColor: colors.aliceBlue,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: colors.textLight,
        marginBottom: 8,
    },
    passwordInput: {
        borderRadius: 8,
        color: colors.textDark,
        backgroundColor: colors.aliceBlue,
        fontFamily: "Inter-Regular",
    },
    forgotPassword: {
        flexDirection: "row",
        marginTop: 4,
        width: "100%",
        justifyContent: "flex-end",
    },

    forgotPasswordText: {
        fontFamily: "Inter-Medium",
        fontSize: 12,
        color: colors.primary,
    },
    createAccountButton: {
        borderRadius: 8,
        height: 55,

    },
    resend: {
        fontSize: 15,
        // textAlign: 'center',
        color: colors.primary,
        // alignSelf: 'center',
        marginTop: 2,
        fontFamily: 'Inter-Semibold',
    },

});