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


export default VerifyPickUp = ({ navigation, route }) => {
    const { item } = route.params
    // console.log(item)
    const { user, saveUser, colorScheme, token } = useContext(AuthContext)
    const appearance = colorScheme
    const [packageImage, setPackageImage] = useState(null);
    const [processing, setProcessing] = useState(false);
    const [step, setStep] = useState(1)

    const canProceed = packageImage !== null


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
                console.log(data); // JSON data parsed by `data.json()` call
                setProcessing(false)
                if (response.ok) {
                    Toast.show({
                        type: 'success',
                        text1: 'Order updated',
                        text2: data.message
                    })
                    
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
                            setPackageImage(res.assets[0]);
                        }
                    })
                }}
                    style={{
                        width: 250,
                        height: 250,
                        borderRadius: 10,
                        alignSelf: 'center',
                        borderWidth: 8,
                        marginTop: 5,
                        borderColor: colors[appearance].secondary,
                        justifyContent: 'center'
                    }}>
                    <Image
                        source={packageImage ? { uri: packageImage.uri } : require('../../../assets/images/camera.png')}
                        style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    fontFamily: 'Inter-Medium',
                    fontSize: 16,
                    color: colors[appearance].textDark,
                    alignSelf: 'center',
                    marginVertical: 20,
                }}>Snap package</Text>
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