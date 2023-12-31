import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, KeyboardAvoidingView, Dimensions } from 'react-native';
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
import CarIcon from '../../../assets/icons/car.svg'
import KekeIcon from '../../../assets/icons/keke.svg'
import KekeIconWhite from '../../../assets/icons/keke-white.svg'
import BikeIcon from '../../../assets/icons/motorcycle.svg'
import TruckIcon from '../../../assets/icons/truck.svg'
import profileRouts from '../../navigation/routs/profileRouts';


const { width, height } = Dimensions.get('window')


export default UpdateVehicleInfo = ({ navigation }) => {
    const { saveUser, user, token } = useContext(AuthContext)
    const [step, setStep] = useState(1)
    const [model, setModel] = useState("")
    const [year, setYear] = useState("")
    const [Color, setColor] = useState("")
    const [Number, setNumber] = useState("")
    const [processing, setProcessing] = useState(false);
    const [wheel, setWheel] = useState("Car")

    const canProceed = step == 1 ? true :
        model.length > 0
        && year.length > 0
        && Color.length > 0
        && Number.length > 0

    const update = async () => {
        setProcessing(true)
        // let docs = {
        //     driver_document: [idBackFile.uri, idFrontFile.uri],
        //     driver_id: user.data.id
        // }
        let docs = new FormData();
        docs.append('carModel', model);
        docs.append('manufactureYear', year);
        docs.append('plateNumber', Number);
        docs.append('color', Color);

        const response = await fetch(endpoints.baseUrl + endpoints.updateVehicle + user._id, {
            method: 'PATCH', // *GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "multipart/form-data",
                // 'Authorization': 'Bearer ' + token
            },
            body: docs // body data type must match "Content-Type" header
        });
        response.json()
            .then((data) => {
                console.log('driver doc', data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Upload failed',
                        text2: data.message
                    });
                    saveUser(data?.data)
                    navigation.navigate(profileRouts.welcome)
                    // navigation.replace(profileRouts.setBank)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Upload failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                }

            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Upload failed',
                    text2: error.message
                });
                console.log('response: ', response)
                console.log('upload error:', error);
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
                <TouchableOpacity onPress={() => step > 1 ? setStep(1) : navigation.goBack()}
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
                }}>Vehicle Registration</Text>

            </View >
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
                        <Text style={styles.greetings}>{step == 1 ?
                            'Pick Your Wheels'
                            :
                            'Tell us more about your'
                        } <Text style={{
                            // color: colors.primary,
                        }}>{step != 1 && wheel}</Text>
                        </Text>
                        {
                            step == 1 ?
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    width: '100%',
                                    marginTop: 20,
                                    alignSelf: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <TouchableOpacity onPress={() => setWheel("Keke")} style={{
                                        backgroundColor: wheel == "Keke" ? colors.primary : colors.white,
                                        borderRadius: 10,
                                        // padding: 10,
                                        marginTop: 20,
                                        width: "47%",
                                        height: 129 / width * 414,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 2
                                    }}>
                                        {
                                            wheel == "Keke" ? <KekeIconWhite />
                                                : <KekeIcon />
                                        }
                                        <Text style={{
                                            color: wheel == "Keke" ? colors.white : colors.black,
                                            fontSize: 16,
                                            fontFamily: 'Inter-Medium',
                                            marginTop: 10
                                        }}>Keke</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setWheel("Truck")} style={{
                                        backgroundColor: wheel == "Truck" ? colors.primary : colors.white,
                                        borderRadius: 10,
                                        // padding: 10,
                                        marginTop: 20,
                                        width: "47%",
                                        height: 129 / width * 414,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 2
                                    }}>
                                        <TruckIcon fill={wheel == "Truck" ? colors.white : colors.primary} />
                                        <Text style={{
                                            color: wheel == "Truck" ? colors.white : colors.black,
                                            fontSize: 16,
                                            fontFamily: 'Inter-Medium',
                                            marginTop: 10
                                        }}>Truck</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setWheel("Car")} style={{
                                        backgroundColor: wheel == "Car" ? colors.primary : colors.white,
                                        borderRadius: 10,
                                        // padding: 10,
                                        marginTop: 20,
                                        width: "47%",
                                        height: 129 / width * 414,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 2
                                    }}>
                                        <CarIcon fill={wheel == "Car" ? colors.white : colors.primary} />
                                        <Text style={{
                                            color: wheel == "Car" ? colors.white : colors.black,
                                            fontSize: 16,
                                            fontFamily: 'Inter-Medium',
                                            marginTop: 10
                                        }}>Car</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => setWheel("Motorcycle")} style={{
                                        backgroundColor: wheel == "Motorcycle" ? colors.primary : colors.white,
                                        borderRadius: 10,
                                        // padding: 10,
                                        marginTop: 20,
                                        width: "47%",
                                        height: 129 / width * 414,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        elevation: 2
                                    }}>
                                        <BikeIcon fill={wheel == "Motorcycle" ? colors.white : colors.primary} />
                                        <Text style={{
                                            color: wheel == "Motorcycle" ? colors.white : colors.black,
                                            fontSize: 16,
                                            fontFamily: 'Inter-Medium',
                                            marginTop: 10
                                        }}>Motorcycle</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <View>
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                                        style={styles.inputWrapper} >

                                        <InputField
                                            label={wheel + " Model"}
                                            placeholder={'Yamaha'}
                                            value={model} onChangeText={text => setModel(text)}
                                            selectionColor={colors.primary}
                                            autoCapitalize={'words'}
                                            placeholderTextColor={colors.textGray} />
                                    </KeyboardAvoidingView>
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                                        style={styles.inputWrapper} >

                                        <InputField
                                            label="Manufacture Year"
                                            placeholder={'2020'}
                                            value={year} onChangeText={text => setYear(text)}
                                            selectionColor={colors.primary}
                                            placeholderTextColor={colors.textGray} />
                                    </KeyboardAvoidingView>
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                                        style={styles.inputWrapper} >

                                        <InputField
                                            label="Plate Number"
                                            placeholder={'XGH029'}
                                            value={Number} onChangeText={text => setNumber(text)}
                                            selectionColor={colors.primary}
                                            autoCapitalize={'characters'}
                                            placeholderTextColor={colors.textGray} />
                                    </KeyboardAvoidingView>
                                    <KeyboardAvoidingView
                                        behavior={Platform.OS === "ios" ? "padding" : "height"}
                                        style={styles.inputWrapper} >

                                        <InputField
                                            label="Colour"
                                            placeholder={'Pink'}
                                            value={Color} onChangeText={text => setColor(text)}
                                            selectionColor={colors.primary}
                                            autoCapitalize={'words'}
                                            placeholderTextColor={colors.textGray} />
                                    </KeyboardAvoidingView>
                                </View>
                        }
                    </View>
                    <View>
                        {
                            step == 2 &&
                            <Text style={{
                                color: colors.black,
                                fontSize: 12,
                                fontFamily: 'Inter-Medium',
                                width: '80%',
                                marginBottom: 30,
                                marginTop: 10
                            }}>By signing up, you agree to our <Text style={{
                                color: colors.primary,
                            }}>Terms &
                                    conditions</Text>  and <Text style={{
                                        color: colors.primary,
                                    }}>Privacy Policy.</Text>
                            </Text>
                        }
                        <Button title={step == 1 ? "Next" : 'Submit'}
                            onPress={() => {
                                if (step == 2) {
                                    update()
                                } else {
                                    setStep(2)
                                }
                            }}
                            buttonStyle={styles.createAccountButton}
                            loading={processing}
                            enabled={canProceed && !processing}

                        />
                    </View>
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
        width: '90%',
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
        marginBottom: 40,
    },


});