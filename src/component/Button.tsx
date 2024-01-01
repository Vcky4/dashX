import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';

import colors from "../../assets/colors/colors";

type Props = {
    title: string,
    onPress: () => void,
    buttonStyle?: object,
    enabled?: boolean,
    textColor?: string,
    loading?: boolean,
    buttonColor?: string,
    theme?: 'dark' | 'light'
};

const Button: React.FC<Props> = ({theme='dark', title, onPress, buttonStyle, enabled, textColor, loading, buttonColor = colors[theme].primary }) => {
    return (
        <View pointerEvents={(enabled && !loading) ? 'auto' : 'none'}
            style={[buttonStyle, {
                opacity: (enabled && !loading) ? 1 : 0.5,
                height: 50,
                backgroundColor: buttonColor
            }]}>
            <TouchableOpacity onPress={() => enabled && !loading ? onPress() : {}}
                style={{
                    flex: 1,
                }} >

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    flex: 1,
                    justifyContent: 'flex-end'
                }}>
                    <Text style={{
                        fontSize: 24,
                        textAlign: 'center',
                        fontFamily: 'Inter-SemiBold',
                        color: textColor ? textColor : colors[theme].white,
                        flex: 1
                    }}>{title}</Text>

                    <ActivityIndicator size={'large'}
                        color={colors[theme].white}
                        hidesWhenStopped={true}
                        animating={loading ? loading : false}
                        style={{
                            position: 'absolute',
                            paddingEnd: 10,
                        }}
                    />

                </View>

            </TouchableOpacity>
        </View>

    );
}

export default Button;