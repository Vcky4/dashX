import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import mainRouts from "../../navigation/routs/mainRouts";

export default Chat = ({ navigation }) => {
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
                    width: '100%',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 24,
                        fontFamily: 'Inter-Bold',
                        alignSelf: 'center',
                    }}>Message</Text>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity style={{
                            marginEnd: 10,
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
                        <Image
                            source={user.photo?.length > 0 ? { uri: user.photo } : require('../../../assets/images/user.png')}
                            style={{
                                width: 40,
                                height: 40,
                                resizeMode: "cover",
                                borderRadius: 40,
                            }}
                        />
                        <View>
                            <Text style={{
                                color: colors[colorScheme].white,
                                fontSize: 16,
                                fontFamily: 'Inter-Bold',
                                marginStart: 10,
                            }}>{user.name}</Text>
                            <Text style={{
                                color: colors[colorScheme].white,
                                fontSize: 12,
                                fontFamily: 'Inter-Regular',
                                marginStart: 10,
                            }}>Online</Text>
                        </View>
                    </View>
                </View>
            </View>


            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                keyExtractor={item => item}
                renderItem={({ item }) => {
                    return (
                        <View style={{
                            flexDirection: 'row',
                            marginHorizontal: 20,
                            marginVertical: 10,
                            justifyContent: item % 2 === 0 ? 'flex-start' : 'flex-end',
                        }}>

                            <View style={{
                                backgroundColor: colors[colorScheme].primary,
                                padding: 10,
                                borderRadius: 10,
                                marginHorizontal: 10,
                            }}>
                                <Text style={{
                                    color: colors[colorScheme].white,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Regular',
                                }}>Hello</Text>
                            </View>
                        </View>
                    )
                }}
            />


        </View>
    )
}