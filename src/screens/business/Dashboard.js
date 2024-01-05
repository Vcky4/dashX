import React, { useContext, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";

export default Dashboard = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)

    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                width: '100%',
                paddingHorizontal: 18,
                paddingVertical: 10,
                backgroundColor: colors[colorScheme].primary,
            }}>
                <TouchableOpacity
                    onPress={() => navigation.openDrawer()}>
                    <Image
                        source={require('../../../assets/images/menu.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                            tintColor: colors[colorScheme].white,
                        }}
                    />
                </TouchableOpacity>
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 18,
                    fontFamily: 'Inter-Bold',
                    marginStart: 20,
                }}>{user.name}</Text>
            </View>
        </View>
    )
};