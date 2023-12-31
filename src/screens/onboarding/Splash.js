import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import colors from "../../../assets/colors/colors";

export default Splash = () => {
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.image}
                source={require("../../../assets/images/splash.png")}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: '100%',
        height: '100%',
    }
});