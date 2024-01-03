import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { AuthContext } from "../../../context/AuthContext";
import colors from "../../../assets/colors/colors";
import PendingOrderItem from "./PendingOrderItem";
import endpoints from "../../../assets/endpoints/endpoints";

export default PendingOrder = ({ item }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [orders, setOrders] = useState([])
    const [processing, setProcessing] = useState(false)

    const getOrders = async () => {
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.listOdrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    'city': 'ikot ekpene',
                    "dispatchid": user.id,
                })
            })
            const json = await response.json()
            // console.log(json)
            //check if array
            if (Array.isArray(json.data)) {
                setOrders(json.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const acceptOrders = async (id) => {
        setProcessing(true)
        try {
            const response = await fetch(endpoints.baseUrl + endpoints.acceptOrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    "dispatchid": user.id,
                    "orderid": id
                })
            })
            const json = await response.json()
            setProcessing(false)
            console.log(json)
            //check if array
            if (Array.isArray(json.data)) {
                // setOrders(json.data)
            }
        } catch (error) {
            setProcessing(false)
            console.error(error)
        }
    }

    useEffect(() => {
        getOrders()
    }, [])
    return (
        <FlatList style={{
            backgroundColor: colors[colorScheme].background,
            width: '100%',
            paddingHorizontal: 5,
        }}
            data={orders}
            renderItem={({ item }) =>
                <PendingOrderItem
                    processing={processing}
                    onPress={() => {
                        acceptOrders(item._id)
                    }}
                    item={item} />
            }
        />
    )
}