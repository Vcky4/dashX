import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";

export default Deposit = ({ navigation }) => {
    const { colorScheme, user } = useContext(AuthContext)
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                paddingBottom: 30,
                borderBottomLeftRadius: 30,
                borderBottomRightRadius: 30,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        left: 0,
                    }}
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].white,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                    }}>Deposit</Text>
                </View>
            </View>


            <View style={{
                flex: 1,
                justifyContent: 'space-between'
            }}>
                <View>
                    <Text style={{
                        color: colors[colorScheme].textDark,
                        fontSize: 18,
                        fontFamily: 'Inter-Bold',
                        marginHorizontal: 20,
                        marginTop: 50,
                    }}>Deposit To</Text>
                    <View style={{
                        backgroundColor: '#D8C7FF',
                        padding: 20,
                        borderRadius: 20,
                        marginTop: 20,
                        marginHorizontal: 20,
                    }}>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>Emmanuel Jonah</Text>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 24,
                            fontFamily: 'Inter-Bold',
                            marginVertical: 15,
                        }}>Wema Bank</Text>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 24,
                            fontFamily: 'Inter-Bold',
                        }}>4567809844567</Text>
                    </View>
                </View>
                <TouchableOpacity style={{
                    backgroundColor: colors[colorScheme].primary,
                    padding: 20,
                    borderRadius: 30,
                    marginTop: 20,
                    marginHorizontal: 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 40
                }}>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                    }}>I've paid</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}