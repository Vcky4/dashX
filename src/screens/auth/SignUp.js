import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Formik } from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';

import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";
import InputField from "../../component/InputField";
import PasswordInput from "../../component/PasswordInput";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import PhoneInput from "../../component/PhoneInput";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const validationSchema = yup.object().shape({
    name: yup.string().required('Full Name is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    phone: yup.string().required('Phone Number is required'),
    password: yup.string().required('Password is required'),
});

export default SignUp = ({ navigation }) => {
    const { saveToken, saveUser, colorScheme } = useContext(AuthContext)
    const appearance = colorScheme
    const [processing, setProcessing] = useState(false);
    const [accountType, setAccountType] = useState("Personal");

    const signUpUser = async (values) => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.signUp, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    personel_account: accountType === 'Personal' ? true : false,
                }),
            });
            const data = await response.json();
            // console.log(data);
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
                console.log('SignUp error:', data);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'SignUp failed',
                text2: error.message
            });
            console.log('SignUp error:', error);
        } finally {
            setProcessing(false);
        }
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
                    flexDirection: 'row',
                    marginTop: 20,
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        onPress={() => setAccountType('Personal')}
                        style={styles.accountTypeButton}>
                        <View style={[styles.radioButton, { borderColor: accountType === 'Personal' ? colors[appearance].primary : colors[appearance].textLight }]} />
                        <Text style={[styles.radioButtonText, { color: colors[appearance].textDark, }]}>Personal</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setAccountType('Business')}
                        style={styles.accountTypeButton}>
                        <View style={[styles.radioButton, { borderColor: accountType === 'Business' ? colors[appearance].primary : colors[appearance].textLight }]} />
                        <Text style={[styles.radioButtonText, { color: colors[appearance].textDark, }]}>Business</Text>
                    </TouchableOpacity>
                </View>

                <KeyboardAwareScrollView>
                    <Text style={[styles.accountTypeText, { color: colors[appearance].textDark }]}>You are creating an account as {accountType === 'Business' ? 'a Business' : 'an Individual'}</Text>

                    <Formik
                        initialValues={{ name: '', email: '', phone: '', password: '' }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            signUpUser(values);
                            setSubmitting(false);
                        }}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <InputField
                                    theme={appearance}
                                    value={values.name}
                                    onChangeText={handleChange('name')}
                                    onBlur={handleBlur('name')}
                                    placeholder="Full Name"
                                    containerStyle={styles.input}
                                />
                                {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}
                                <InputField
                                    theme={appearance}
                                    value={values.email}
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    placeholder="Enter e-mail"
                                    containerStyle={styles.input}
                                />
                                {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                                <PhoneInput
                                    theme={appearance}
                                    value={values.phone}
                                    onChangeText={handleChange('phone')}
                                    onBlur={handleBlur('phone')}
                                    placeholder="Phone Number"
                                    containerStyle={styles.input}
                                />
                                {touched.phone && errors.phone && <Text style={styles.error}>{errors.phone}</Text>}
                                <PasswordInput
                                    theme={appearance}
                                    value={values.password}
                                    onChangeText={handleChange('password')}
                                    onBlur={handleBlur('password')}
                                    placeholder="Password"
                                    containerStyle={styles.input}
                                />
                                {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                                <Button
                                    title="Sign Up"
                                    buttonStyle={{
                                        marginTop: 30,
                                        marginHorizontal: 20,
                                        borderRadius: 30,
                                    }}
                                    loading={processing}
                                    enabled={!Object.values(errors).some(error => !!error) && !processing}
                                    textColor={colors[appearance].textDark}
                                    buttonColor={colors[appearance].primary}
                                    onPress={handleSubmit}
                                />
                            </View>
                        )}
                    </Formik>
                </KeyboardAwareScrollView>

                <TouchableOpacity
                    onPress={() => navigation.navigate(authRouts.login)}
                    style={styles.link}>
                    <Text style={[styles.linkText, { color: colors[appearance].primary }]}>Already have an account? Sign in</Text>
                </TouchableOpacity>

                <Text style={[styles.termsText, { color: colors[appearance].primary }]}>By continuing, you agree to Dash X <Text style={styles.termsLink}>Conditions of use</Text> and <Text style={styles.termsLink}>Privacy Notice</Text></Text>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    accountTypeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 15,
    },
    radioButton: {
        height: 22,
        width: 22,
        borderRadius: 15,
        borderWidth: 5,
    },
    radioButtonText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        marginLeft: 15,
    },
    accountTypeText: {
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        marginTop: 20,
        marginLeft: 15,
    },
    input: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 24,
        marginTop: 5
    },
    link: {
        alignItems: 'center',
        marginTop: 20,
    },
    linkText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        fontStyle: 'italic'
    },
    termsText: {
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 30,
        fontStyle: 'italic',
        paddingHorizontal: 20
    },
    termsLink: {
        fontWeight: 'bold',
    },
});
