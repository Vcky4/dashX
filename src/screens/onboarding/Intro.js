import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, ImageBackground, useColorScheme } from "react-native";

import colors from "../../../assets/colors/colors";
import authRouts from "../../navigation/routs/authRouts";
import Swiper from "react-native-swiper";
import { AuthContext } from "../../../context/AuthContext";


const { width, height } = Dimensions.get("window");
export default Intro = ({ navigation }) => {
    const { colorScheme, onboard } = useContext(AuthContext)
    const appearance = colorScheme
    const [page, setPage] = useState(0);
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[appearance].background
        }}>
            <Image
                style={styles.image}
                source={require("../../../assets/images/onb.png")}
            />
            <TouchableOpacity
                onPress={() => {
                    if (page === 2) {
                        // navigation.navigate(authRouts.LOGIN)
                    } else {
                        setPage(page + 1)
                    }
                }}
                style={{
                    position: 'absolute',
                    bottom: 220,
                    right: 12,
                    zIndex: 10,
                }}>
                <ImageBackground
                    style={{
                        width: 40,
                        height: 40,
                        resizeMode: 'contain',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    source={
                        page === 0
                            ? require("../../../assets/images/loader.png")
                            : page === 1
                                ? require("../../../assets/images/loader1.png")
                                : require("../../../assets/images/loader2.png")
                    }
                >
                    <Image
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: 'contain',
                        }}
                        source={require("../../../assets/images/Icon_arrow.png")}
                    />
                </ImageBackground>
            </TouchableOpacity>
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
                            height: width * 0.9,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/delivery2.png")}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors[appearance].textDark,
                        marginTop: height * 0.1,
                        marginBottom: 10,
                        marginStart: 20,
                        width: width * 0.5,
                    }}>Swift Solutions, Speedy Service</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: colors[appearance].textDark,
                        marginStart: 20,
                        marginEnd: 20,
                        width: width * 0.75
                    }}>Experience the thrill of swift deliveries with DashX. Your goods, our priority – because time matters</Text>
                </View>
                <View style={styles.page}>
                    <Image
                        style={{
                            width: '100%',
                            height: width * 0.9,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/delivery1.png")}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors[appearance].textDark,
                        marginTop: height * 0.1,
                        marginBottom: 10,
                        marginStart: 20,
                        width: width * 0.5,
                    }}>Affordable Delivery, Unbeatable Value</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: colors[appearance].textDark,
                        marginStart: 20,
                        marginEnd: 20,
                        width: width * 0.75
                    }}>Enjoy the luxury of low-cost delivery without compromising on service. DashX brings you quality at a price that fits your budget.</Text>
                </View>
                <View style={styles.page}>
                    <Image
                        style={{
                            width: '100%',
                            height: width * 0.9,
                            resizeMode: 'contain',
                            alignSelf: 'center',
                            marginTop: height * 0.1,
                        }}
                        source={require("../../../assets/images/delivery3.png")}
                    />
                    <Text style={{
                        fontSize: 20,
                        fontWeight: 'bold',
                        color: colors[appearance].textDark,
                        marginTop: height * 0.1,
                        marginBottom: 10,
                        marginStart: 20,
                        width: width * 0.5,
                    }}>Versatile Rides, Infinite Possibilities</Text>
                    <Text style={{
                        fontSize: 18,
                        fontWeight: 'normal',
                        color: colors[appearance].textDark,
                        marginStart: 20,
                        marginEnd: 20,
                        width: width * 0.75
                    }}>No matter the size, we've got the wheels. From small parcels to bulky items, DashX delivers convenience at every dimension</Text>
                </View>
            </Swiper>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingHorizontal: 20,
                marginBottom: 60,
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
                                        height: 5,
                                        width: page === i - 1 ? 25 : 20,
                                        backgroundColor: page === i - 1 ? colors[appearance].primary : colors[appearance].inactive,
                                        borderRadius: 10,
                                        marginHorizontal: 2
                                    }}
                                />
                            )
                        })
                    }
                </View>
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
            }}>
                <TouchableOpacity
                    onPress={() => {
                        page < 2 ? setPage(2)
                            : onboard()
                    }}
                    style={{
                        marginBottom: 20,
                        marginEnd: 30,
                    }}
                >
                    <Text style={{
                        color: colors[appearance].textDark,
                        fontSize: 16,
                        fontWeight: '600',
                    }}>{page < 2 ? 'Skip >>' : 'Start ->'}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: height * 0.093,
        height: height,
        position: 'absolute',
        // top: 0,
        right: 0,
        resizeMode: 'contain',
    },
    page: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'column',
    },
});