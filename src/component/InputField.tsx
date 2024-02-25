import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

import colors from "../../assets/colors/colors";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    theme?: 'dark' | 'light',
    label?: string,
} & TextInputProps;


export default function InputField({ label, theme = 'dark', containerStyle, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: colors[theme].primary,
            borderRadius: 50,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
            justifyContent: 'center',
        }, containerStyle]}>
            <Text style={{
                position: 'absolute',
                fontSize: 14,
                fontFamily: 'Inter-Medium',
                display: label ? 'flex' : 'none',
                color: colors[theme].textGray,
                transform: [{
                    translateY: -24,
                }]
            }}>{label}</Text>
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    color: colors[theme].textDark,
                }}
                placeholderTextColor={colors[theme].textGray}
                cursorColor={colors[theme].primary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

        </View>
    );
}