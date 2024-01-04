import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";
import { AuthContext } from "../../../context/AuthContext";
import InputField from "../../component/InputField";

export default Withdraw = ({ navigation }) => {
    const { colorScheme, user } = useContext(AuthContext)
    const [vehicleData, setVehicleData] = useState({
        vehicle_number: '',
        vehicle_type: '',
        vehicle_model: '',
        vehicle_color: '',
    })
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors[colorScheme].background,
        }}>
            <View style={{
                backgroundColor: colors[colorScheme].primary,
                padding: 20,
                paddingBottom: 30,
                marginBottom: 20,
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
                    }}>Withdraw</Text>
                </View>
            </View>

            <InputField
                theme={colorScheme}
                value={vehicleData.vehicle_number}
                onChangeText={(text) => setVehicleData({ ...vehicleData, vehicle_number: text })}
                placeholder="GT Bank"
                containerStyle={styles.input}
                label="Bank"
            />

            <InputField
                theme={colorScheme}
                value={vehicleData.vehicle_number}
                onChangeText={(text) => setVehicleData({ ...vehicleData, vehicle_number: text })}
                placeholder="23456789023"
                containerStyle={styles.input}
                label="Account number"
            />

            <InputField
                theme={colorScheme}
                value={vehicleData.vehicle_number}
                onChangeText={(text) => setVehicleData({ ...vehicleData, vehicle_number: text })}
                placeholder="Adeola Adeyemi"
                containerStyle={styles.input}
                label="Account name"
            />

        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        marginTop: 38,
        marginHorizontal: 24,
    }
})