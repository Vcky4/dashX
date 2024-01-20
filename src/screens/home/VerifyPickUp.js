import React, { useContext, useEffect, useRef, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, ScrollView, Modal, BackHandler, SafeAreaView } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import InputField from "../../component/InputField";
import Button from "../../component/Button";
import Toast from "react-native-toast-message";
import endpoints from "../../../assets/endpoints/endpoints";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { RNCamera } from "react-native-camera";


export default VerifyPickUp = ({ navigation, route }) => {
    const { item } = route.params
    // console.log(item)
    const { user, saveUser, colorScheme, token } = useContext(AuthContext)
    const appearance = colorScheme
    const [packageImage, setPackageImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1)
    const camera = useRef(null);
    const [takingPic, setTakingPic] = useState(false)
    const [isSnaping, setIsSnapping] = useState(true)

    const canProceed = packageImage !== null


    const takePicture = async () => {
        if (camera.current && !takingPic) {

            let options = {
                quality: 0.85,
                fixOrientation: true,
                forceUpOrientation: true,
            };

            setTakingPic(true);

            try {
                const data = await camera.current.takePictureAsync(options);
                console.log('Success', JSON.stringify(data));
                setPackageImage({
                    uri: data.uri,
                    type: 'image/jpeg',
                    name: new Date().getTime() + '.jpg',
                })
                setIsSnapping(false)
            } catch (err) {
                console.log('Error', 'Failed to take picture: ' + (err.message || err));
                return;
            } finally {
                setTakingPic(false);
            }
        }
    };


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

    const verify = async (url) => {
        setProcessing(true)
        const response = await fetch(endpoints.baseUrl + endpoints.verifyOrder, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify(
                {
                    "dispatchid": user.id,
                    "orderid": item?._id,
                    "upload": [{ "url": url }]
                }
            ) // body data type must match "Content-Type" header
        });
        response.json()
            .then((data) => {
                // console.log(data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Order updated',
                        text2: data.message
                    })
                    navigation.goBack()
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Order update failed',
                        text2: data.message
                    });
                    console.log('response: ', response)
                    console.log('Order update error:', data)
                }
            })
            .catch((error) => {
                setProcessing(false)
                Toast.show({
                    type: 'error',
                    text1: 'Order update failed',
                    text2: error.message
                });
                console.log('Order update error:', error);
            });
    }
    return (
        <View style={{
            backgroundColor: colors[appearance].background,
            flex: 1,
        }}>
            <Text style={{
                fontFamily: 'Inter-Medium',
                fontSize: 20,
                marginTop: 20,
                color: colors[appearance].textDark,
                display: step === 4 ? 'none' : 'flex',
                alignSelf: 'center',
            }}>{'Verify Pickup'}</Text>

            <View style={{
                height: '70%',
            }}>

                <Text style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 16,
                    color: colors[appearance].textDark,
                    alignSelf: 'center',
                    marginVertical: 20,
                    width: '80%',
                    textAlign: 'center',
                }}>*Please inspect package carefully as when uploaded, you will be fully responsible for any damage or loss.</Text>
                <TouchableOpacity activeOpacity={0.8}
                onPress={() => {
                        if (isSnaping) {
                            takePicture()
                            return
                        }
                        setIsSnapping(true)
                    }}
                    style={{
                        width: 250,
                        height: 330,
                        borderRadius: 10,
                        alignSelf: 'center',
                        borderWidth: 8,
                        marginTop: 5,
                        borderColor: colors[appearance].secondary,
                        justifyContent: 'center'
                    }}>

                    {isSnaping ? <RNCamera
                        ref={ref => {
                            camera.current = ref;
                        }}
                        captureAudio={false}
                        style={{
                            width: '100%',
                            height: '100%',
                        }}
                        type={RNCamera.Constants.Type.back}
                        androidCameraPermissionOptions={{
                            title: 'Permission to use camera',
                            message: 'We need your permission to use your camera',
                            buttonPositive: 'Ok',
                            buttonNegative: 'Cancel',
                        }} />
                        :
                        <Image 
                            source={packageImage ? { uri: packageImage.uri } : require('../../../assets/images/camera.png')}
                            style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'contain',
                            }}
                        />}
                    <Text onPress={() => {
                        if (isSnaping) {
                            takePicture()
                            return
                        }
                        setIsSnapping(true)
                    }}
                        style={{
                            position: 'absolute',
                            color: '#ffffff',
                            alignSelf: 'center',
                            backgroundColor: 'rgba(0,0,0,0.5)',
                            padding: 20,
                            borderRadius: 10
                        }}>{isSnaping ? 'Tap to capture' : 'Retake'}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {
                    if (isSnaping) {
                        takePicture()
                        return
                    }
                    setIsSnapping(true)
                }}
                    style={{
                        alignSelf: 'center',
                        marginVertical: 20,
                        marginTop: 20,
                    }}>
                    <Text style={{
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 16,
                        color: colors[appearance].primary,
                    }}>{
                            isSnaping ? 'Take Picture' : 'Retake Picture'
                        }</Text>
                </TouchableOpacity> */}
            </View>

            <Button
                title={'Upload'}
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
                    uploadImage(packageImage, (url) => verify(url))
                    // navigation.navigate(authRouts.otpVerification)
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 38,
        marginHorizontal: 24,
    }
})