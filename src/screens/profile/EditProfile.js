import React, { useContext, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, BackHandler } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import Toast from "react-native-toast-message";
import endpoints from "../../../assets/endpoints/endpoints";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";


export default EditProfile = ({ navigation }) => {
    const { user, saveUser, colorScheme, token } = useContext(AuthContext)
    const appearance = colorScheme
    const [userData, setUserData] = useState({
        "dispatchid": user.id,
        "country": "Nigeria",
        "email": user.email,
        "phone": user.phone,
        "name": user.name,
        "kin_name": user.kin.kin_name,
        "kin_number": user.kin.kin_number,
    })
    const [vehicleData, setVehicleData] = useState({
        "dispatchid": user.id,
        "vehicle_number": user.vehicle.vehicle_number,
        "vehicle_type": user.vehicle.vehicle_type,
    })
    const [image, setImage] = useState(null);
    const [driverLicense, setDriverLicense] = useState(null);
    const [acceptTerms, setAcceptTerms] = useState(false)
    const [selectVehicleType, setSelectVehicleType] = useState(false)
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1)

    const step1Pass = userData?.name?.length > 0 && userData?.phone?.length > 0 && userData?.kin_name?.length > 0 && userData?.kin_number?.length > 0
    const step2Pass = vehicleData?.vehicle_number?.length > 0 && vehicleData?.vehicle_type?.length > 0 && driverLicense !== null
    const canProceed = (step1Pass || step > 1) && (step2Pass || (step > 2 || step < 2)) && (image || (step < 3)) && (acceptTerms || (step < 4))


    // BackHandler.addEventListener('hardwareBackPress', () => {
    //     if (step > 1) {
    //         setStep(step - 1)
    //         return true
    //     } else {
    //         return false
    //     }
    // })

    useEffect(() => {
        if (user.photo.length > 0) {
            setImage({ uri: user.photo })
        }
        if (user.vehicle.driving_license.length > 0) {
            setDriverLicense({ uri: user.vehicle.driving_license })
        }
    }, [])


    const uploadImage = (pic, onComplete) => {
        if (!pic.type) {
            onComplete(pic.uri)
            return
        }
        setProcessing(true)
        const data = new FormData()
        const uri = pic.uri;
        const type = pic.type;
        const name = pic.fileName;
        data.append('file', {
            uri,
            type,
            name,
        })
        data.append('upload_preset', 'yhm2npph')
        data.append("cloud_name", "drlz1cp2v")
        fetch("https://api.cloudinary.com/v1_1/drlz1cp2v/upload", {
            method: "POST",
            body: data
        }).then(res => res.json()).
            then(data => {
                setProcessing(false)
                console.log(data.url)
                onComplete(data.url)
            }).catch(err => {
                setProcessing(false)
                console.log(err)
            })
    }
    const updateProfile = async () => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.updateProfile, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(
                userData
            ) // body data type must match "Content-Type" header
        });
        response.json()
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Profile updated',
                        text2: data.message
                    })
                    setStep(2)
                    saveUser({
                        ...data?.data,
                        id: data?.data?._id,
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Profile update failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Profile update error:', data)
                }
            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Profile update failed',
                    text2: error.message
                });
                console.log('Profile update error:', error);
            });
    }


    const finish = async (url) => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.uploadPhoto, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                "dispatchid": user.id,
                "photo": url
            }) // body data type must match "Content-Type" header
        });
        response.json()
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Process Completed',
                        text2: data.message
                    })
                    saveUser({
                        ...data?.data,
                        id: data?.data?._id,
                    })
                    navigation.goBack()
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Profile update failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Profile update error:', data)
                }
            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Profile update failed',
                    text2: error.message
                });
                console.log('Profile update error:', error);
            });
    }

    const updateVehicle = async (url) => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.updateVehicle, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(
                {
                    ...vehicleData,
                    "driving_license": url
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
                        text1: 'Profile updated',
                        text2: data.message
                    })
                    setStep(3)
                    saveUser({
                        ...data?.data,
                        id: data?.data?._id,
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Profile update failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Profile update error:', data)
                }
            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Profile update failed',
                    text2: error.message
                });
                console.log('Profile update error:', error);
            });
    }
    return (
        <>
            <View style={{
                backgroundColor: colors[appearance].background,
                flex: 1,
            }}>
                <View style={{
                    flexDirection: 'row',
                    height: 50,
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 20,
                }}>
                    <TouchableOpacity onPress={() => {
                        if (step > 1) {
                            setStep(step - 1)
                        } else {
                            navigation.goBack()
                        }
                    }}>
                        <Image
                            source={require("../../../assets/images/back.png")}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: 'contain',
                                tintColor: colors[appearance].textDark,
                            }}
                        />
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        left: 0,
                        right: 0,
                    }}>
                        <View style={{
                            width: 50,
                            height: 3,
                            backgroundColor: step > 0 ? colors[appearance].primary : colors[appearance].textLight,
                        }} />
                        <View style={{
                            width: 50,
                            height: 3,
                            backgroundColor: step > 1 ? colors[appearance].primary : colors[appearance].textLight,
                        }} />
                        <View style={{
                            width: 50,
                            height: 3,
                            backgroundColor: step > 2 ? colors[appearance].primary : colors[appearance].textLight,
                        }} />
                    </View>
                </View>

                <Text style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 24,
                    color: colors[appearance].textDark,
                    display: step === 4 ? 'none' : 'flex',
                    alignSelf: 'center',
                }}>{
                        step === 1 ? 'Personal Details' :
                            step === 2 ? 'Transport Details' :
                                'Verify Identity'
                    }</Text>

                <ScrollView style={{
                    display: step === 1 ? 'flex' : 'none',
                }}>
                    <InputField
                        theme={appearance}
                        value={userData.name.split(' ')[0]}
                        onChangeText={(text) => setUserData({ ...userData, name: text + ' ' + userData.name.split(' ')[1] })}
                        placeholder="Enter first name"
                        containerStyle={styles.input}
                        label="First Name"
                    />
                    <InputField
                        theme={appearance}
                        value={userData.name.split(' ')[1]}
                        onChangeText={(text) => setUserData({ ...userData, name: userData.name.split(' ')[0] + ' ' + text })}
                        placeholder="Enter last name"
                        containerStyle={styles.input}
                        label="Last Name"
                    />
                    <InputField
                        theme={appearance}
                        value={userData.phone}
                        onChangeText={(text) => setUserData({ ...userData, phone: text })}
                        placeholder="Enter phone number"
                        containerStyle={styles.input}
                        label="Phone Number"
                    />
                    <InputField
                        theme={appearance}
                        value={userData.email}
                        onChangeText={(text) => setUserData({ ...userData, email: text })}
                        placeholder="Enter e-mail"
                        containerStyle={styles.input}
                        label="Email"
                    />
                    <InputField
                        theme={appearance}
                        value={userData.kin_name}
                        onChangeText={(text) => setUserData({ ...userData, kin_name: text })}
                        placeholder="Enter next of kin"
                        containerStyle={styles.input}
                        label="Next of Kin"
                    />
                    <InputField
                        theme={appearance}
                        value={userData.kin_number}
                        onChangeText={(text) => setUserData({ ...userData, kin_number: text })}
                        placeholder="Enter next of kin phone number"
                        containerStyle={styles.input}
                        label="Next of Kin Phone Number"
                    />
                </ScrollView>
                <View style={{
                    display: step === 2 ? 'flex' : 'none',
                    height: '70%',
                }}>
                    <TouchableOpacity onPress={() => setSelectVehicleType(true)}>
                        <InputField
                            theme={appearance}
                            value={vehicleData.vehicle_type}
                            // onChangeText={(text) => setUserData({ ...userData, email: text })}
                            placeholder="Transportation type"
                            containerStyle={styles.input}
                            label="Vehicle Type"
                            readOnly={true}
                        />
                    </TouchableOpacity>

                    <InputField
                        theme={appearance}
                        value={vehicleData.vehicle_number}
                        onChangeText={(text) => setVehicleData({ ...vehicleData, vehicle_number: text })}
                        placeholder="LAG -234-JK"
                        containerStyle={styles.input}
                        label="Plate Number"
                    />

                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        alignSelf: 'center',
                        marginVertical: 20,
                        width: '80%',
                        textAlign: 'center',
                    }}>Position your ID card in the camera.{'\n'}
                        NIN preferable for Businesses and Driver's license for personal</Text>
                    <TouchableOpacity onPress={() => {
                        launchCamera({
                            mediaType: 'photo',
                            // includeBase64: true,
                            // maxHeight: 200,
                            // maxWidth: 200,
                        }, (res) => {
                            console.log(res);
                            if (res.didCancel) {
                                console.log('User cancelled image picker');
                                Toast.show({
                                    type: 'success',
                                    text1: 'Cancelled',
                                    text2: 'Process cancelled successfully'
                                });
                            }
                            else if (res.error) {
                                console.log('ImagePicker Error: ', res.error);
                                Toast.show({
                                    type: 'error',
                                    text1: 'failed to get image',
                                    text2: res.error
                                });
                            }
                            else if (res.assets) {
                                setDriverLicense(res.assets[0]);
                            }
                        })
                    }}
                        style={{
                            width: 300,
                            height: 200,
                            borderRadius: 10,
                            alignSelf: 'center',
                            borderWidth: 8,
                            marginTop: 5,
                            borderColor: colors[appearance].secondary,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={driverLicense ? { uri: driverLicense.uri } : require('../../../assets/images/camera.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={{
                    display: step === 3 ? 'flex' : 'none',
                    height: '60%',
                    alignItems: 'center',
                }}>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 16,
                        color: colors[appearance].textDark,
                        alignSelf: 'center',
                        marginVertical: 20,
                        width: '80%',
                        textAlign: 'center',
                    }}>Position your bare face clearly in the camera
                        No face mask or glasses</Text>

                    <TouchableOpacity onPress={() => {
                        launchCamera({
                            mediaType: 'photo',
                            // includeBase64: true,
                            // maxHeight: 200,
                            // maxWidth: 200,
                        }, (res) => {
                            console.log(res);
                            if (res.didCancel) {
                                console.log('User cancelled image picker');
                                Toast.show({
                                    type: 'success',
                                    text1: 'Cancelled',
                                    text2: 'Process cancelled successfully'
                                });
                            }
                            else if (res.error) {
                                console.log('ImagePicker Error: ', res.error);
                                Toast.show({
                                    type: 'error',
                                    text1: 'failed to get image',
                                    text2: res.error
                                });
                            }
                            else if (res.assets) {
                                setImage(res.assets[0]);
                            }
                        })
                    }}
                        style={{
                            width: 300,
                            height: 300,
                            borderRadius: 150,
                            borderWidth: 8,
                            borderColor: colors[appearance].secondary,
                            justifyContent: 'center'
                        }}>
                        <Image
                            source={image ? { uri: image.uri } : require('../../../assets/images/camera.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: 150,
                                resizeMode: 'cover',
                            }}
                        />
                    </TouchableOpacity>
                </View>

                <View style={{
                    display: step === 4 ? 'flex' : 'none',
                    height: '70%',
                    paddingHorizontal: 20,
                }}>
                    <Image
                        source={require('../../../assets/images/terms.png')}
                        style={{
                            width: 60,
                            height: 60,
                            resizeMode: 'contain',
                        }}
                    />
                    <Text style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 24,
                        width: '80%',
                        color: colors[appearance].textDark,

                    }}>Accept SmartBest Terms & Review Privacy Policy</Text>
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        width: '95%',
                        color: colors[appearance].textGray,
                        marginTop: 10,
                    }}>By selecting “I Agree” Below, I have reviewed and agree to the
                        <Text style={{
                            color: colors[appearance].primary,
                        }}> Terms of Use</Text> and acknowledge the
                        <Text style={{
                            color: colors[appearance].primary,
                        }}> Privacy Policy</Text>. I am at least 18 years of age.
                    </Text>
                </View>
                <View style={{
                    display: step === 4 ? 'flex' : 'none',
                    marginStart: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <BouncyCheckbox
                        innerIconStyle={{
                            borderRadius: 5,
                            borderColor: colors[appearance].inactive,
                            borderWidth: 1,
                            width: 20,
                            height: 20,
                        }}
                        fillColor={colors[appearance].primary}
                        iconStyle={{
                            borderRadius: 5,
                            borderColor: colors[appearance].textGray,
                            borderWidth: 1,
                            width: 20,
                            height: 20,
                        }}
                        isChecked={acceptTerms}
                        text=""
                        disableBuiltInState
                        onPress={() => setAcceptTerms(!acceptTerms)}
                    />
                    <Text style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 14,
                        color: colors[appearance].textGray,
                    }}>I Agree</Text>
                </View>
                <Button
                    title={step < 3 ? 'Continue' : step === 4 ? 'Submit' : 'Finish Setup'}
                    buttonStyle={{
                        marginBottom: 50,
                        marginHorizontal: 20,
                        borderRadius: 30,
                        marginTop: 20,
                    }}
                    loading={processing}
                    enabled={canProceed && !processing}
                    textColor={colors[appearance].textDark}
                    buttonColor={colors[appearance].primary}
                    onPress={() => {
                        if (step === 1) {
                            updateProfile()
                        } else if (step === 2) {
                            uploadImage(driverLicense, (url) => updateVehicle(url))
                        } else if (step === 3) {
                            setStep(4)
                        } else {
                            uploadImage(image, (url) => finish(url))
                        }
                        // navigation.navigate(authRouts.otpVerification)
                    }}
                />
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={selectVehicleType}
                onRequestClose={() => {
                    setSelectVehicleType(!selectVehicleType);
                }}
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.5)',
                }}>
                    <View style={{
                        backgroundColor: colors[appearance].background,
                        width: '90%',
                        borderRadius: 20,
                        padding: 20,
                    }}>
                        <Text style={{
                            fontFamily: 'Inter-Medium',
                            fontSize: 24,
                            color: colors[appearance].textDark,
                            alignSelf: 'center',
                        }}>Select Vehicle Type</Text>
                        <ScrollView style={{
                            marginTop: 20,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setVehicleData({ ...vehicleData, vehicle_type: 'car' })
                                setSelectVehicleType(false)
                            }}>
                                <Text style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 18,
                                    color: colors[appearance].textDark,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}>Car</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setVehicleData({ ...vehicleData, vehicle_type: 'bike' })
                                setSelectVehicleType(false)
                            }}>
                                <Text style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 18,
                                    color: colors[appearance].textDark,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}>Bike</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setVehicleData({ ...vehicleData, vehicle_type: 'Truck' })
                                setSelectVehicleType(false)
                            }}>
                                <Text style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 18,
                                    color: colors[appearance].textDark,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}>Truck</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setVehicleData({ ...vehicleData, vehicle_type: 'van' })
                                setSelectVehicleType(false)
                            }}>
                                <Text style={{
                                    fontFamily: 'Inter-Medium',
                                    fontSize: 18,
                                    color: colors[appearance].textDark,
                                    alignSelf: 'center',
                                    marginVertical: 10,
                                }}>Van</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 38,
        marginHorizontal: 24,
    }
})