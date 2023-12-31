import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps } from "react-native";
import colors from "../../assets/colors/colors";
import EyeOpened from "../../assets/icons/eye.svg";
import EyeClosed from "../../assets/icons/eye-off.svg";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
} & TextInputProps;


const PasswordInput: React.FC<Props> = ({ containerStyle, label, ...rest }: Props) => {
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: isFocused ? colors.primary : colors.inactive,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
        }, containerStyle]}>
            <Text style={{
                color: colors.black,
                fontSize: 10,
                fontFamily: 'Inter-Regular',
                position: 'absolute',
                top: 5,
                left: 14,
            }}>{label}</Text>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <TextInput
                    style={{
                        transform: [{ translateY: 6 }],
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                        color: colors.black,
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                    secureTextEntry={!visible}
                />
                <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                    {
                        visible ?
                            <EyeClosed />
                            :
                            <EyeOpened />
                    }
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    passwordWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        borderRadius: 8,
        height: 44,
        // borderColor: colors.inactive,
        // borderWidth: 1,
        // elevation: 1
    },
    passwordInput: {
        fontSize: 14,
        color: colors.textDark,
        fontFamily: "NunitoSans-Regular",
    },
});

export default PasswordInput;