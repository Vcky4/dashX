import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";


export default Intro = ({ navigation }) => {
    const [translate] = useState(new Animated.Value(0));
    const [fadeIn] = useState(new Animated.Value(0));
    const [position, setPosition] = useState(300);
    const [fade, setFade] = useState(0);
    useEffect(() => { setTimeout(() => { setPosition(90); setFade(1) }, 2000) });
    useEffect(() => {
        Animated.timing(translate, {
            toValue: position,
            duration: 500,
            useNativeDriver: true // <-- Add this
        }).start()
    })
    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: fade,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fade]);
    return (
        <View style={styles.container}>
            <Animated.Image
                style={{
                    width: 161,
                    height: 96,
                    transform: [{ translateY: translate }],
                    alignSelf: "center",
                }}
                source={require("../../../assets/images/logo_text.png")}
            />
            <Animated.View style={{
                width: '100%',
                // transform: [{ translateY: 20 }],
                alignSelf: "center",
                paddingHorizontal: 24,
                paddingBottom: 80,
                opacity: fadeIn,
            }}>
                <Text style={{
                    color: colors.white,
                    fontSize: 26,
                    alignSelf: "center",
                    fontFamily: 'Inter-Medium',
                }}>Rider App</Text>
                <Button title={'Sign Up'}
                    onPress={() => { navigation.navigate(authRouts.signUp) }}
                    buttonStyle={{
                        borderRadius: 8,
                        height: 44,
                        marginTop: 100,

                    }}
                    textColor={colors.black}
                    buttonColor={colors.white}
                    loading={false}
                    enabled={true}
                />
                <Button title={'Sign in'}
                    onPress={() => { navigation.navigate(authRouts.login) }}
                    buttonStyle={{
                        borderRadius: 8,
                        height: 55,
                        marginTop: 16,
                        borderColor: colors.white,
                        borderWidth: 1,
                    }}
                    buttonColor={colors.primary}
                    loading={false}
                    enabled={true}

                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'space-between'
    },
});