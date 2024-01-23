import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import endpoints from "../../../assets/endpoints/endpoints";
import { RefreshControl } from "react-native-gesture-handler";

export default Analytics = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [processing, setProcessing] = React.useState(false)

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
                    }}>Analytics</Text>
                </View>
                <Text style={{
                    color: colors[colorScheme].primary,
                    fontSize: 12,
                    fontFamily: 'Inter-Regular',
                    alignSelf: 'center',
                    backgroundColor: colors[colorScheme].white,
                    padding: 4,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    marginTop: 6,
                }}>{user.online_status ? 'Online' : 'Offline'}</Text>
            </View>


    
        </View>
    )
}