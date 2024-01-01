import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from "react-native";

import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";
import authRouts from "../../navigation/routs/authRouts";
import Swiper from "react-native-swiper";


const { width, height } = Dimensions.get("window");

export default Intro = ({ navigation }) => {
    const [page, setPage] = useState(0);
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={require("../../../assets/images/background.png")}
            />
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginTop: 20,
                alignItems: 'center'
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    {
                        [1, 2, 3].map((i) => {
                            return (
                                <View key={i}
                                    style={{
                                        height: 2.5,
                                        width: page === i - 1 ? 65 : 50,
                                        backgroundColor: colors.white,
                                        borderRadius: 10,
                                        marginHorizontal: 2
                                    }}
                                />
                            )
                        })
                    }
                </View>

                <TouchableOpacity>
                    <Text style={{
                        color: colors.white,
                        fontSize: 16,
                    }}>Skip</Text>
                </TouchableOpacity>
            </View>
            <Swiper
                loop={false}
                showsPagination={false}
                index={page}
                onIndexChanged={(index) => setPage(index)}
            >
                <View style={styles.page}>
                    <Image
                        style={{
                            width: '100%',
                            height: width * 0.6,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/cuate.png")}
                    />
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: colors.white,
                        marginTop: height * 0.1,
                        marginBottom: 10,
                        marginStart: 20,
                    }}>Effortless Delivery Solutions</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: colors.white,
                        marginStart: 20,
                        marginEnd: 20,
                    }}>Vehicles are available for all kinds of product irrespectiveof the product size.</Text>
                </View>
                <View style={styles.page}>
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: colors.white,
                        marginTop: height * 0.02,
                        marginBottom: 10,
                        marginStart: 20,
                    }}>Tailor Your Delivery Experience</Text>
                    <Text style={{
                        fontSize: 18,
                        color: colors.white,
                        marginStart: 20,
                        marginEnd: 20,
                    }}>Select the Perfect Vehicle Type for Your Cargo Needs.</Text>
                    <Image
                        style={{
                            width: '100%',
                            height: height * 0.42,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/amico.png")}
                    />

                </View>
                <View style={styles.page}>
                    <Image
                        style={{
                            width: '100%',
                            height: width * 0.6,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/pana.png")}
                    />
                    <Text style={{
                        fontSize: 32,
                        fontWeight: 'bold',
                        color: colors.white,
                        marginTop: height * 0.1,
                        marginBottom: 10,
                        marginStart: 20,
                    }}>Effortless Dispatching at Your Fingertips</Text>
                    <Text style={{
                        fontSize: 18,
                        color: colors.white,
                        marginStart: 20,
                        marginEnd: 20,
                    }}>Request a Dispatcher Ride Anytime, Anywhere – Seamless and Swift Logistics Solutions</Text>
                </View>
            </Swiper>

            <Button
                textColor={colors.primary}
                buttonColor={colors.white}
                enabled={true}
                buttonStyle={styles.button}
                loading={false}
                title={page === 2 ? "Sign up Now" : "Next"}
                onPress={() => {
                    if (page === 2) {
                        // navigation.navigate(authRouts.LOGIN)
                    } else {
                        setPage(page + 1)
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primary,
    },
    image: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
    },
    button: {
        marginHorizontal: 20,
        marginBottom: height * 0.07,
        borderRadius: 25,
    }
});