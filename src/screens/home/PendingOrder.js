import React, { useContext } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import PendingOrderItem from "./PendingOrderItem";

export default PendingOrder = ({ item }) => {
    const { colorScheme } = useContext(AuthContext)
    return (
        <FlatList style={{
            backgroundColor: colors[colorScheme].background,
            width: '100%',
            paddingHorizontal: 5,
        }}
            data={[1, 2, 4, 5, 6, 7, 8, 9, 0]}
            renderItem={({ item }) =>
                <PendingOrderItem />
            }
        />
    )
}