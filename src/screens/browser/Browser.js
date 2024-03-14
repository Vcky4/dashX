import React, { useState, useEffect, useRef, useContext } from "react";
import { TouchableOpacity, View, ActivityIndicator, BackHandler, Text, Image } from "react-native";
import { WebView } from 'react-native-webview';
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";



export default Browser = ({ route, navigation }) => {
    const { url, title } = route.params;
    const { colorScheme } = useContext(AuthContext)
    const [currentUrl, setCurrentUrl] = useState(url);
    const [currentTitle, setCurrentTitle] = useState(title);
    // This state saves whether your WebView can go back
    const [webViewcanGoBack, setWebViewcanGoBack] = useState(false);
    //ref
    const myWebView = useRef();
    const goBack = () => {

        // Getting the webview reference
        const webView = myWebView.current

        if (webViewcanGoBack) {
            myWebView.current?.goBack()
        }
        else {
            navigation.goBack()
        }
    }

    const handleBackButtonPress = () => {
        try {
            goBack();
        } catch (err) {
            console.log("[handleBackButtonPress] Error : ", err.message)
        }
    }


    //handle back button
    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () => {
            // console.log("Back button is pressed")
            handleBackButtonPress();
            return true;
        });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', () => {
                console.log("Back button is pressed")
                handleBackButtonPress();
                return true;
            });
        }
    }, [])
    return (
        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: colors[colorScheme].primary }}>
                <TouchableOpacity onPress={() => goBack()}>
                    <Image
                        tintColor={colors[colorScheme].white}
                        source={require('../../../assets/images/back.png')}
                        style={{ width: 30, height: 30 }} />
                </TouchableOpacity>
                <Text style={{
                    fontSize: 20,
                    marginLeft: 10,
                    color: colors[colorScheme].white,
                }}>{currentTitle}</Text>
            </View>
            <WebView
                source={{ uri: url }}
                style={{}}
                //get current url
                onNavigationStateChange={(navState) => {
                    console.log(navState.url)
                    setCurrentUrl(navState.url);
                    if (navState.url.includes('smartbestaltinsmart')) {
                        //send data to parent
                        navigation.goBack()
                        // navigation.navigate(parent, {
                        //     status: 'success'
                        // })
                    }
                }}
                //ref
                ref={myWebView}
                //show loading indicator
                renderLoading={() => (
                    <ActivityIndicator
                        color={colors[colorScheme].primary}
                        size="large"
                        style={{ flex: 1 }}
                    />
                )}
                javaScriptEnabled={true}
                onLoadProgress={({ nativeEvent }) => {
                    // This function is called everytime your web view loads a page
                    // and here we change the state of can go back
                    setWebViewcanGoBack(nativeEvent.canGoBack)
                }}
            />
        </View>
    )
}