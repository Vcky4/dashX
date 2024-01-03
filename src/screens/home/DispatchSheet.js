import React, { useContext } from "react";
import { Image, Linking, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import Button from "../../component/Button";
import Swiper from "react-native-swiper";
import mainRouts from "../../navigation/routs/mainRouts";

export default Dispatch = ({ navigation, onIndexChanged, onDispatch }) => {
    const { colorScheme, user } = useContext(AuthContext)
    const dispatch = true
    const items = [1, 2, 3]
    return (
        <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                // marginTop: 10,
                marginBottom: 10,
                justifyContent: 'space-between',
                paddingHorizontal: 20,
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
                            fontSize: 16,
                            fontFamily: 'Inter-Bold',
                        }}>{user?.name}</Text>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>{user.email}</Text>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 12,
                            fontFamily: 'Inter-Regular',
                        }}>08096867881</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 20,
                    padding: 6,
                }}
                    onPress={() => {
                        //call
                        Linking.openURL(`tel:${user?.phone}`)
                    }}>
                    <Image
                        source={require('../../../assets/images/phone.png')}
                        style={{
                            width: 22,
                            height: 22,
                            resizeMode: "contain",
                            tintColor: colors[colorScheme].white,
                        }}
                    />
                </TouchableOpacity>
            </View>

        </>
    )
}