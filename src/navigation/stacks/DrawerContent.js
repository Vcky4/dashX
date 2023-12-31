import React, { useContext, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Modal } from "react-native";

import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import CancelIcon from "../../../assets/icons/cancel.svg";
import StarLgIcon from "../../../assets/icons/Star-lg.svg";
import LogoutIcon from "../../../assets/icons/logout.svg";
import mainRoute from "../routs/mainRouts";
import profileRouts from "../routs/profileRouts";
import SettingsIcon from "../../../assets/icons/settings.svg";
import OrdersIcon from "../../../assets/icons/orders.svg";
import HelpIcon from "../../../assets/icons/help.svg";
import EarningsIcon from "../../../assets/icons/earnings.svg";


export default function DrawerContent(props) {
    const { logout, user } = useContext(AuthContext);
    // console.log('from drawer', user);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: colors.primary,
            }}>
                <View style={styles.content}>
                    <View style={{
                        backgroundColor: colors.primary,
                        width: '100%',
                        paddingHorizontal: 30,
                        paddingTop: 50,
                        paddingBottom: 16,
                    }}>
                        <TouchableOpacity
                            onPress={() => props.navigation.closeDrawer()}
                            style={{
                                padding: 10,
                                borderRadius: 5,
                                backgroundColor: 'rgba(255, 255, 255, 0.35)',
                                width: 32,
                            }}>
                            <CancelIcon fill={colors.white} height={12} width={12} />
                        </TouchableOpacity>

                    </View>
                    <ScrollView
                        vertical
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: 'flex-start',
                            width: '100%',
                            paddingVertical: 30,
                            paddingHorizontal: 30,
                        }}>
                        <View style={{
                        }}>
                            <Image
                                source={user?.kyc?.selfie
                                    ? { uri: user?.kyc?.selfie }
                                    : require('../../../assets/images/profile.png')}
                                style={{
                                    width: 60,
                                    height: 60,
                                    resizeMode: "contain",
                                    borderRadius: 30,
                                }}

                            />
                            <Text style={{
                                color: colors.white,
                                fontSize: 20,
                                fontFamily: 'Poppins-Bold',
                                marginTop: 8,
                                marginBottom: 10,
                            }}>{user?.firstName} {user?.lastName}</Text>

                        </View>
                        <TouchableOpacity style={{ marginTop: 30 }}
                            onPress={() => props.navigation.navigate(profileRouts.orderHistory)}>
                            <View style={styles.itemWrapper}>
                                <OrdersIcon />
                                <Text style={styles.items}>Order History</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => props.navigation.navigate(profileRouts.profile)}>
                            <View style={styles.itemWrapper}>
                                <SettingsIcon fill={colors.white} />
                                <Text style={styles.items}>Profile Settings</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(mainRoute.help)}
                            style={{ marginTop: 20 }} >
                            <View style={styles.itemWrapper}>
                                <HelpIcon />
                                <Text style={styles.items}>Help &  Support</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => props.navigation.navigate(profileRouts.myEarnings)}
                            style={{ marginTop: 20 }} >
                            <View style={styles.itemWrapper}>
                                <EarningsIcon />
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
                                <LogoutIcon />
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
        color: colors.white,
        fontSize: 16,
        fontFamily: 'Inter-Regular',
        marginStart: 20,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
});