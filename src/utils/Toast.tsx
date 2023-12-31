import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";


type Props = {
    message: string | null
};

const Toast: React.FC<Props> = ({ message }) => {
    const [toast, setToast] = useState<string | null>(null);

    useEffect(() => {
        if (message) {
            setToast(message);
        }
        const timeout = setTimeout(() => {
            setToast(null);
        }, 3000);

        return () => clearTimeout(timeout);
    }, [toast]);

    return (
        toast ? null :
            <View style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 9999
            }}>
                {toast && <View style={{
                    backgroundColor: "red",
                    padding: 10,
                    borderRadius: 10
                }}>
                    <Text style={{
                        color: "white",
                        fontSize: 16,
                        fontFamily: 'Inter-Regular'
                    }}>{toast}</Text>
                </View>}
            </View>
    );
}

export default Toast;