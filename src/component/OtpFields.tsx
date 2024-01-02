import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from "react-native";
import colors from "../../assets/colors/colors";

type Props = {
    nuberOfFields: number,
    style?: object,
    fieldStyle?: object,
    onChangeText?: (text: string) => void,
    value: string,
    pointerEvents?: 'auto' | 'none',
    isSecured?: boolean,
    theme?: 'light' | 'dark'
};

const OtpFields: React.FC<Props> = ({
    theme = 'dark',
    nuberOfFields,
    style,
    fieldStyle,
    onChangeText = (text) => { },
    value,
    pointerEvents = 'auto',
    isSecured = false
}) => {
    const otpFields = [];
    const refsFocus = useRef<TextInput>(null);

    for (var t = 0; t < nuberOfFields; t++) {
        otpFields.push(
            <TouchableOpacity
                onPress={() => { refsFocus.current && refsFocus.current.focus() }}
                key={t} >
                <View
                    style={[styles.otpField, {
                        borderColor: colors[theme].primary,
                    }]}>
                    <Text style={[{
                        color: colors[theme].primary,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                    }, fieldStyle]}>{isSecured ? value[t] && '*' : value[t]}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <>
            <View
                pointerEvents={pointerEvents}
                style={[styles.otpWraper, style, { opacity: pointerEvents == 'auto' ? 1 : 0.5, }]} >
                {otpFields}

            </View>
            <TextInput ref={refsFocus}
                // keyboardType={Platform.OS === "ios" ? "number-pad" : "numeric"}
                value={value}
                secureTextEntry={isSecured}
                selectionColor={'transparent'}
                style={{ color: 'transparent', fontSize: 0, height: 0, width: 0 }}
                onChangeText={text => {
                    console.log(text);
                    onChangeText(text.length <= nuberOfFields ? text: value);
                }} />
        </>
    );
}


const styles = StyleSheet.create({
    otpWraper: {
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'center',
    },
    otpField: {
        width: 42,
        height: 40,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        marginHorizontal: 4,
    },
})

export default OtpFields;