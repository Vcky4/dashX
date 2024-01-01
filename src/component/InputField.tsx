import React, { useState } from "react";
import { View, TextInput, Text, TextInputProps } from "react-native";

import colors from "../../assets/colors/colors";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    theme?: 'dark' | 'light'
} & TextInputProps;


export default function InputField({ theme = 'dark', containerStyle, ...rest }: Props) {
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor: colors[theme].primary,
            borderRadius: 50,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
        }, containerStyle]}>
            <TextInput
                style={{
                    fontSize: 16,
                    fontFamily: 'Inter-Medium',
                    color: colors[theme].textDark,
                }}
                cursorColor={colors[theme].primary}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...rest}
            />

        </View>

    );
}