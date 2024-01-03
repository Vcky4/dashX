import React, { useContext } from "react";
import { View, Text } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";

export default Profile = () => {
    const { colorScheme, user } = useContext(AuthContext)
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
            padding: 20,
        }}>
            <Text>Profile</Text>
        </View>
    )
}