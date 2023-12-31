import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

import colors from "../../assets/colors/colors";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
} & TextInputProps;


export default function InputField({ containerStyle, label, ...rest }: Props) {
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
            />

        </View>

    );
}