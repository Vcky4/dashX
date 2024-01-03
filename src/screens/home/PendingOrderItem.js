import React, { useContext } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import Button from "../../component/Button";


export default PendingOrderItem = ({ item }) => {
    const { colorScheme } = useContext(AuthContext)
    return (
        <View style={{
            backgroundColor: colors[colorScheme].background,
            width: '100%',
            elevation: 10,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
            paddingHorizontal: 10,
        }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <Text style={{
                    color: colors[colorScheme].primary,
                    fontSize: 16,
                    fontFamily: 'Medium',
                }}>Dell Latitude Laptop</Text>
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Medium',
                }}>₦4,589.55</Text>
                <Button title={'Accept'}
                    onPress={() => {
                    }}
                    buttonStyle={{
                        borderRadius: 20,
                        height: 30,
                        width: 86,
                    }}
                    fontSize={16}
                    loading={false}
                    enabled={true}
                />
            </View>
            <View style={{
                width: '100%',
                marginTop: 15,
                flexDirection: 'row',
            }}>
                <Image
                    source={require('../../../assets/images/point.png')}
                    style={{
                        width: 14,
                        height: 14,
                        resizeMode: "contain",
                        marginTop: 2,
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                    marginLeft: 5,
                }}>Pickup: <Text style={{
                    fontFamily: 'Inter-Medium',
                }}>25, Ogeretedo Street, Dopemu, Agege</Text></Text>
            </View>
            <View style={{
                width: '100%',
                flexDirection: 'row',
                marginTop: 5
            }}>
                <Image
                    source={require('../../../assets/images/point2.png')}
                    style={{
                        width: 14,
                        height: 14,
                        resizeMode: "contain",
                        marginTop: 2,
                    }}
                />
                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 14,
                    fontFamily: 'Inter-Bold',
                    marginLeft: 5,
                }}>Delivery: <Text style={{
                    fontFamily: 'Inter-Medium',
                }}>25, Ogeretedo Street, Dopemu, Agege</Text></Text>
            </View>
        </View>
    )
}