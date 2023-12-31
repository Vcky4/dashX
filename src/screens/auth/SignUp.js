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
import PhoneInput from "../../component/PhoneInput";


export default SignUp = ({ navigation }) => {
    const { saveToken, saveUser } = useContext(AuthContext)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState("MALE")
    const [step, setStep] = useState(1)
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const canProceed =
        phone?.length > 9 &&
        password?.length > 0 &&
        firstName?.length > 0 &&
        lastName?.length > 0 &&
        emailRegex.test(email) &&
        city?.length > 0
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


    const signUpUser = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.register, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    "firstName": firstName,
                    "lastName": lastName,
                    "email": email,
                    "password": password,
                    "city": city,
                    "gender": gender,
                    "phone": phone
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
                        text2: data.message
                    })
                    saveUser(data.user)
                    navigation.navigate(authRouts.otpVerification, { token: data.data.accessToken })
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
                }}>Create Account</Text>

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
                            Let’s Start with creating your account</Text>
                        <View>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.inputWrapper} >

                                <InputField
                                    label="First Name"
                                    placeholder={'firstname'}
                                    value={firstName} onChangeText={text => setFirstName(text)}
                                    selectionColor={colors.primary}
                                    placeholderTextColor={colors.textGray} />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.inputWrapper} >

                                <InputField
                                    label="Last Name"
                                    placeholder={'Surname'}
                                    value={lastName} onChangeText={text => setLastName(text)}
                                    selectionColor={colors.primary}
                                    placeholderTextColor={colors.textGray} />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.inputWrapper} >

                                <InputField
                                    label="Email Address"
                                    placeholder={'example@mail.com'}
                                    value={email} onChangeText={text => setEmail(text)}
                                    selectionColor={colors.primary}
                                    placeholderTextColor={colors.textGray} />
                            </KeyboardAvoidingView>
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.inputWrapper} >

                                <PhoneInput
                                    placeholder={'09XXXXXXXXX'}
                                    value={phone} onChangeText={text => setPhone(text.replace(/^0+/, ''))}
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
                            <KeyboardAvoidingView
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                                style={styles.inputWrapper} >

                                <InputField
                                    label="City"
                                    placeholder={'Uyo'}
                                    value={city} onChangeText={text => setCity(text)}
                                    selectionColor={colors.primary}
                                    placeholderTextColor={colors.textGray} />
                            </KeyboardAvoidingView>

                            <Text style={styles.label}>Gender</Text>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <TouchableOpacity onPress={() => setGender('MALE')}
                                    style={{
                                        backgroundColor: gender == 'MALE' ? colors.inactive : 'transparent',
                                        borderRadius: 20,
                                        paddingVertical: 5,
                                        paddingHorizontal: 20,
                                    }}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: 'Inter-Medium',
                                        color: colors.textDark,
                                    }}>Male</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setGender('FEMALE')}
                                    style={{
                                        backgroundColor: gender == 'FEMALE' ? colors.inactive : 'transparent',
                                        borderRadius: 20,
                                        paddingVertical: 5,
                                        paddingHorizontal: 20,
                                        marginLeft: 10,
                                    }}>
                                    <Text style={{
                                        fontSize: 14,
                                        fontFamily: 'Inter-Medium',
                                        color: colors.textDark,
                                    }}>Female</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        marginTop: 40,
                        marginBottom: 70,
                    }}>
                        {
                            step > 1 &&
                            <View>
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
                                <Text style={{
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                    color: colors.black,
                                    marginBottom: 20,
                                    width: '80%',
                                }}>By signing up, you agree to our <Text style={{
                                    color: colors.primary,
                                    fontFamily: 'Inter-Medium',
                                }}>
                                        Terms & conditions
                                    </Text> and <Text style={{
                                        color: colors.primary,
                                        fontFamily: 'Inter-Medium',
                                    }}>
                                        Privacy Policy.
                                    </Text>
                                </Text>
                            </View>
                        }
                        <Button title={'Next'}
                            onPress={() => {
                                signUpUser()
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
        fontFamily: "Inetr-Regular",
        height: 44,
        backgroundColor: colors.aliceBlue,
    },
    label: {
        fontSize: 14,
        fontFamily: 'Inter-Regular',
        color: colors.textLight,
        marginBottom: 8,
        marginTop: 20,
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


});