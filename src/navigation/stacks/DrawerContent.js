import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from "react-native";
import DeviceInfo from 'react-native-device-info';

import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import mainRoute from "../routs/mainRouts";
import profileRouts from "../routs/profileRouts";


export default function DrawerContent(props, onPendingOrderPress = () => { }) {
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
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(profileRouts.profile)}
                            style={{
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
                                    }}>{user?.name}</Text>
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
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            // width: '90%',
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
                        </View>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => {
                                props.navigation.toggleDrawer()
                                onPendingOrderPress()
                            }}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/time.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>Pending orders</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/time.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>History</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/wallet.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>Wallet</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/chat.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>Message</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/support.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>Support</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/setting.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>Settings</Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <Image
                                    source={require('../../../assets/images/help.png')}
                                    style={{
                                        width: 22,
                                        height: 22,
                                        resizeMode: "contain",
                                        tintColor: colors[colorScheme].textGray,
                                    }}
                                />
                                <Text style={[styles.items, {
                                    color: colors[colorScheme].textGray,
                                }]}>About</Text>
                            </View>
                        </TouchableOpacity>
                    </ScrollView>

                    <View style={{
                        justifyContent: 'flex-start',
                        paddingBottom: 50,
                        paddingHorizontal: 30,
                        width: '100%',
                    }}>
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100%',
                            marginBottom: 10,
                        }}
                            onPress={() =>
                                setModalVisible(true)
                            }>
                            <Image
                                source={require('../../../assets/images/logout.png')}
                                style={{
                                    width: 33,
                                    height: 33,
                                    resizeMode: "contain",
                                    marginRight: 20,
                                    tintColor: colors[colorScheme].textGray,
                                }}
                            />
                            <Text style={{
                                color: colors[colorScheme].textGray,
                                fontSize: 20,
                                fontFamily: 'Inter-Medium',
                            }}>Logout</Text>
                        </TouchableOpacity>

                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 18,
                            fontFamily: 'Inter-SemiBold',
                            marginTop: 20,
                        }}>V {DeviceInfo.getVersion()}</Text>
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
                            backgroundColor: colors[colorScheme].background,
                            width: '90%',
                            borderRadius: 10,
                            padding: 20,
                        }}>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 20,
                            fontFamily: 'Inter-Regular',
                        }}>Log Out?</Text>
                        <Text style={{
                            color: colors[colorScheme].textDark,
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
                                    // backgroundColor: colors.white,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                    borderWidth: 1,
                                    borderColor: colors[colorScheme].primary,
                                }}>
                                <Text style={{
                                    color: colors[colorScheme].primary,
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
                                    backgroundColor: colors[colorScheme].primary,
                                    padding: 10,
                                    borderRadius: 5,
                                    marginTop: 20,
                                    width: "45%",
                                }}>
                                <Text style={{
                                    color: colors[colorScheme].white,
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
        alignItems: 'center',
        width: '100%',
        marginStart: 10,
    },
});