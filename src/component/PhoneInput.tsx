import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps } from "react-native";
import colors from "../../assets/colors/colors";
import NigerianFlag from "../../assets/icons/Nigeria-Flag.svg";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    // label: string,
    onPress?: () => void,
} & TextInputProps;


const PhoneInput: React.FC<Props> = ({ containerStyle, onPress, ...rest }: Props) => {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: isFocused ? colors.primary : colors.inactive,
            borderRadius: 5,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
        }, containerStyle]}>

            <View style={{
                flexDirection: "row",
                // justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
            }}>
                <TouchableOpacity
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        borderEndWidth: 1,
                        borderEndColor: colors.primary,
                        paddingRight: 8,
                    }}
                    onPress={onPress}>
                    <NigerianFlag />
                    <Text style={{
                        color: colors.textGray,
                        fontSize: 14,
                        fontFamily: 'Inter-Regular',
                        marginLeft: 5,
                    }}>+234</Text>
                </TouchableOpacity>
                <TextInput
                    style={{
                        // transform: [{ translateY: 6 }],
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                        color: colors.black,
                        flexGrow: 1,
                        paddingLeft: 8,
                    }}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                    inputMode="numeric"
                />

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

export default PhoneInput;