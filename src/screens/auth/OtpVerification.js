import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Animated } from "react-native";
import Toast from 'react-native-toast-message';

import colors from "../../../assets/colors/colors";
import ArrowBack from '../../../assets/icons/arrow_back.svg'
import OtpFields from "../../component/OtpFields";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";
import endpoints from "../../../assets/endpoints/endpoints";


export default OtpVerification = ({ navigation, route }) => {
    const { token } = route.params
    const { saveToken, user } = useContext(AuthContext)
    const [otp, setOtp] = useState("")
    const [processing, setProcessing] = useState(false)
    const [timerCount, setTimer] = useState(0);
    const [activator, setActivator] = useState(Math.random());

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
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                email: user.email,
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


    const verify = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.verify, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(
                {
                    "otp": parseInt(otp)
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
                        text1: 'Verification successful',
                        text2: data.message
                    })
                    saveToken(token)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Verification failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Verification error:', data)
                }

            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Verification failed',
                    text2: error.message
                });
                console.log('response: ', response)
                console.log('Verification error:', error);
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
                    style={{
                        position: 'absolute',
                        left: 20,
                        zIndex: 1
                    }}>
                    <ArrowBack width={20} height={20} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 16,
                    alignSelf: 'center',
                    flex: 1,
                    textAlign: 'center',
                    // marginRight: 20,
                    color: colors.black,
                    fontFamily: 'Inter-Medium'
                }}>Registration OTP</Text>
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
                        <Text style={styles.greetings}>
                            Enter OTP
                        </Text>
                        <Text style={styles.desc}>
                            An OTP has been sent to your registered email.
                        </Text>

                        <KeyboardAvoidingView
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                            style={styles.inputWrapper} >

                            <OtpFields
                                style={styles.otp}
                                nuberOfFields={4}
                                value={otp}
                                isSecured={true}
                                onChangeText={text => {
                                    setOtp(text);
                                    if (text.length == 4) {
                                        // verify(text);
                                    }
                                }}
                            />
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
                    </View>
                    <Button title={'Submit'}
                        onPress={() => {
                            verify()
                        }}
                        buttonStyle={styles.createAccountButton}
                        loading={processing}
                        enabled={otp.length == 4}

                    />
                </View>
            </ScrollView>
        </>
    )
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
        width: '80%',
    },


    desc: {
        fontSize: 14,
        fontFamily: "Inter-Reular",
        color: colors.textDark,
        width: '90%',
    },

    createAccountButton: {
        borderRadius: 8,
        height: 55,
    },

    inputWrapper: {
        marginTop: 20,
        marginBottom: 20,
    },
    createAccountButton: {
        borderRadius: 8,
        height: 55,
        marginBottom: 40,
    },
    resend: {
        fontSize: 15,
        // textAlign: 'center',
        color: colors.primary,
        // alignSelf: 'center',
        marginBottom: 10,
        fontFamily: 'Inter-Semibold',
      },

});