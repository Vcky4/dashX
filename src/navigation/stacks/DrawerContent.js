import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from "react-native";

import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import mainRoute from "../routs/mainRouts";
import profileRouts from "../routs/profileRouts";


export default function DrawerContent(props) {
    const { logout, user, colorScheme, toggleTheme } = useContext(AuthContext);
    // console.log('from drawer', user);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: colors[colorScheme].background,
            }}>
                <View style={styles.content}>
                    <View style={{
                        backgroundColor: colors[colorScheme].primary,
                        width: '100%',
                        height: 150,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../../assets/images/logo.png')}
                            style={{
                                width: '50%',
                                // height: 60,
                                resizeMode: "contain",
                            }}

                        />
                    </View>
                    <ScrollView
                        vertical
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-start',
                            width: '100%',
                            paddingBottom: 20,
                            paddingHorizontal: 20,
                        }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 20,
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require('../../../assets/images/profile.jpg')}
                                    style={{
                                        width: 46,
                                        height: 46,
                                        resizeMode: "cover",
                                        borderRadius: 50,
                                        marginRight: 14,
                                    }}
                                />
                                <View>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 18,
                                        fontFamily: 'Inter-Bold',
                                    }}>Travor</Text>
                                    <Text style={{
                                        color: colors[colorScheme].textGray,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Regular',
                                    }}>View Profile</Text>
                                </View>
                            </View>
                            <TouchableOpacity onPress={() => toggleTheme()}>
                                <Image
                                    source={
                                        colorScheme === 'light' ?
                                            require('../../../assets/images/night.png') :
                                            require('../../../assets/images/light.png')
                                    }
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textDark,
                                    }}
                                />
                            </TouchableOpacity>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '90%',
                            marginTop: 20,
                        }}>
                            <View>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                }}>Today’s Earnings:</Text>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 25,
                                    fontFamily: 'Inter-SemiBold',
                                }}>₦8,900</Text>
                            </View>
                            <Image
                                source={require('../../../assets/images/outline.png')}
                                style={{
                                    width: 33,
                                    height: 33,
                                    resizeMode: "contain",
                                }}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Text style={styles.items}>Order History</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate(profileRouts.profile)}>
                            <View style={styles.itemWrapper}>
                                <Text style={styles.items}>Profile Settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(mainRoute.help)}
                            style={{ marginTop: 20 }} >
                            <View style={styles.itemWrapper}>
                                <Text style={styles.items}>Help &  Support</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(profileRouts.myEarnings)}
                            style={{ marginTop: 20 }} >
                            <View style={styles.itemWrapper}>
                                <Text style={styles.items}>My earnings</Text>
                            </View>
                        </TouchableOpacity>

                        {/* <TouchableOpacity
                            onPress={() => props.navigation.navigate(profileRouts.myRating)}
                            style={{ marginTop: 20 }} >
                            <View style={styles.itemWrapper}>
                                <StarLgIcon fill={colors.white} height={20} width={20} />
                                <Text style={styles.items}>My rating</Text>
                            </View>
                        </TouchableOpacity> */}
                    </ScrollView>

                    <View style={{
                        flex: 1,
                        justifyContent: 'flex-end',
                        paddingBottom: 50,
                        paddingHorizontal: 30,
                    }}>
                        <TouchableOpacity onPress={() =>
                            // logout()
                            setModalVisible(true)
                        }>
                            <View style={styles.itemWrapper}>
                                <Text style={styles.items}>Logout</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View onPress={() => setModalVisible(!modalVisible)}
                    style={{
                        flex: 1,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>

                    <View onPress={() => setModalVisible(true)}
                        style={{
                            backgroundColor: colors.white,
                            width: '90%',
                            borderRadius: 10,
                            padding: 20,
                        }}>
                        <Text style={{
                            color: colors.textHash,
                            fontSize: 20,
                            fontFamily: 'Inter-Regular',
                        }}>Log Out?</Text>
                        <Text style={{
                            color: colors.textHash,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                            marginTop: 10,
                        }}>
                            Are you sure you want to log out?
                        </Text>
                        <View style={{
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            flexDirection: 'row',
                            marginTop: 30,
                            marginBottom: 10,
                            width: '100%',
                        }}>
                            <TouchableOpacity onPress={() => setModalVisible(false)}
                                style={{
                                    backgroundColor: colors.white,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                    borderWidth: 1,
                                    borderColor: colors.textHash,
                                }}>
                                <Text style={{
                                    color: colors.textHash,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                    textAlign: 'center',
                                }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(false)
                                logout()
                            }}
                                style={{
                                    backgroundColor: colors.primary,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                }}>
                                <Text style={{
                                    color: colors.white,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                    textAlign: 'center',
                                }}>Log Out</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    title: {
        color: colors.textColor1,
        fontSize: 28,
        fontFamily: 'Outfit-Bold',
    },

    content: {
        flex: 1,
    },
    items: {
        flexDirection: 'row',
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        marginStart: 20,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});