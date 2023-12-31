import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Animated } from "react-native";

import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";


export default Intro = ({ navigation }) => {

    return (
        <View style={styles.container}>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
        justifyContent: 'space-between'
    },
});