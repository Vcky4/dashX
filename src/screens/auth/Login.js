import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from "react-native";
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

const validationSchema = yup.object().shape({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default Login = ({ navigation }) => {
    const { saveToken, saveUser, colorScheme } = useContext(AuthContext)
    const appearance = colorScheme
    const [processing, setProcessing] = useState(false);

    const loginUser = async ({ email, password }) => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.login, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log(data);
            if (response.ok) {
                Toast.show({
                    type: 'success',
                    text1: 'Login successful',
                    text2: data.message
                });
                saveUser({
                    ...data?.data.userDetails,
                    id: data?.data?.userDetails?._id
                });
                saveToken(data?.data?.token);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login failed',
                    text2: data.message
                });
                console.log('Login error:', data);
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Login failed',
                text2: error.message
            });
            console.log('Login error:', error);
        } finally {
            setProcessing(false);
        }
    }

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[appearance].background,
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
                    }}>Sign in.</Text>
                </View>

                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        loginUser(values);
                        setSubmitting(false);
                    }}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <InputField
                                theme={appearance}
                                value={values.email}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                placeholder="Enter e-mail"
                                containerStyle={styles.input}
                            />
                            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}
                            <PasswordInput
                                theme={appearance}
                                value={values.password}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                placeholder="Password"
                                containerStyle={styles.input}
                            />
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}

                            <TouchableOpacity onPress={() => {
                                navigation.navigate(authRouts.forgotPassword)
                            }}>
                                <Text style={{
                                    fontFamily: 'Inter-SemiBold',
                                    fontSize: 14,
                                    color: colors[appearance].primary,
                                    marginTop: 16,
                                    marginLeft: 35
                                }}>Forgot password?</Text>
                            </TouchableOpacity>


                            <Button
                                title="Sign in"
                                buttonStyle={{
                                    marginTop: 30,
                                    marginHorizontal: 20,
                                    borderRadius: 30,
                                }}
                                loading={processing}
                                enabled={!errors.email && !errors.password && !processing}
                                textColor={colors[appearance].textDark}
                                buttonColor={colors[appearance].primary}
                                onPress={handleSubmit}
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
                                        fontFamily: 'Inter-Bold',
                                        fontSize: 18,
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
                        </View>
                    )}
                </Formik>
            </ScrollView>

        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        marginTop: 20,
        marginHorizontal: 20,
    },
    error: {
        color: 'red',
        fontSize: 12,
        marginLeft: 20,
    }
});
