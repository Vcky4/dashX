import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, TextInput, ScrollView, Animated } from "react-native";
import Toast from 'react-native-toast-message';

import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";


export default SignUp = ({ navigation }) => {
    const { saveToken, saveUser } = useContext(AuthContext)
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [city, setCity] = useState("")
    const [gender, setGender] = useState("MALE")
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

    // const signUpUser = async () => {
    //     setProcessing(true)
    //     const response = await fetch(endpoints.baseUrl + endpoints.register, {
    //         method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(
    //             {
    //                 "firstName": firstName,
    //                 "lastName": lastName,
    //                 "email": email,
    //                 "password": password,
    //                 "city": city,
    //                 "gender": gender,
    //                 "phone": phone
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
    //                     text1: 'SignUp successful',
    //                     text2: data.message
    //                 })
    //                 saveUser(data.user)
    //                 navigation.navigate(authRouts.otpVerification, { token: data.data.accessToken })
    //             } else {
    //                 Toast.show({
    //                     type: 'error',
    //                     text1: 'SignUp failed',
    //                     text2: data.message
    //                 });
    //                 // navigation.navigate(authRouts.otpVerification, { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGE4MDczOWY3NGE2NDdmM2Q5N2YyYmYiLCJyb2xlIjoiUklERVIiLCJnZW5lcmF0b3IiOiIyMDIzMDcwNzEzMzgxN09BQkpNTlBWIiwiaWF0IjoxNjg4NzMzNDk3LCJleHAiOjE2ODg4MTk4OTd9.quJHfi-_YMVGrvc7e40ycvHLuB_wynf1LBxPxaIlvGk' })
    //                 console.log('response: ', response)
    //                 console.log('SignUp error:', data)
    //             }

    //         })
    //         .catch((error) => {
    //             setProcessing(false)
    //             Toast.show({
    //                 type: 'error',
    //                 text1: 'SignUp failed',
    //                 text2: error.message
    //             });
    //             console.log('response: ', response)
    //             console.log('SignUp error:', error);
    //         })
    // }
    return (
        <View>

        </View>
    );
}

const styles = StyleSheet.create({

});