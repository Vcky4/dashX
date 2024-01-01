import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextInputProps, Image } from "react-native";
import colors from "../../assets/colors/colors";

type Props = {
    // leftComponet?: React.ReactNode,
    containerStyle?: object,
    label: string,
    theme?: 'dark' | 'light'
} & TextInputProps;


const PasswordInput: React.FC<Props> = ({ theme='dark', containerStyle, label, ...rest }: Props) => {
    const [visible, setVisible] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[{
            borderColor:colors[theme].primary ,
            borderRadius: 50,
            borderWidth: 1,
            paddingHorizontal: 10,
            height: 50,
        }, containerStyle]}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center"
            }}>
                <TextInput
                    style={{
                        fontSize: 14,
                        fontFamily: 'Inter-Medium',
                        color: colors[theme].textDark,
                        width: "90%"
                    }}
                    cursorColor={colors[theme].primary}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...rest}
                    secureTextEntry={!visible}
                />
                <TouchableOpacity onPress={() => { setVisible(!visible) }}>
                    {
                        visible ?
                            <Image 
                            source={require('../../assets/images/eye-closed.png')}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                            resizeMode="contain"
                             />
                            :
                            <Image
                            source={require('../../assets/images/eye_opened.png')}
                            style={{
                                width: 20,
                                height: 20,
                            }}
                            resizeMode="contain"
                             />
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
});

export default PasswordInput;