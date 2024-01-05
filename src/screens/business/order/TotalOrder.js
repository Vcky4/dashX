import React, { useContext, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { AuthContext } from "../../../../context/AuthContext";
import colors from "../../../../assets/colors/colors";
import DatePicker from "react-native-date-picker";
import businessRoutes from "../../../navigation/routs/businessRouts";

export default TotalOrder = ({ navigation }) => {
    const { colorScheme, user, token } = useContext(AuthContext)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());


    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: colors[colorScheme].background,
            }}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 18,
                    paddingVertical: 10,
                    backgroundColor: colors[colorScheme].primary,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}>
                        <Image
                            source={require('../../../../assets/images/back.png')}
                            style={{
                                width: 30,
                                height: 30,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].white,
                            }}
                        />
                    </TouchableOpacity>
                    <Text style={{
                        color: colors[colorScheme].white,
                        fontSize: 18,
                        fontFamily: 'Inter-Bold',
                        marginStart: 20,
                    }}>Total Order</Text>
                </View>

                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 16,
                    marginHorizontal: 20,
                    marginBottom: 10
                }}>
                    <TouchableOpacity onPress={() => setOpen(true)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                        }}>{
                                startDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                        }</Text>
                        <Image
                            source={require('../../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].textGray,
                                transform: [{ rotate: '-90deg' }],
                            }}
                        />
                    </TouchableOpacity>

                    <Text style={{
                        fontFamily: 'Inter-Medium',
                        fontSize: 16,
                        color: colors[colorScheme].textDark,
                    }}>to</Text>

                    <TouchableOpacity onPress={() => setOpen2(true)}
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors[colorScheme].textGray,
                            fontSize: 16,
                            fontFamily: 'Inter-Regular',
                        }}>{
                                startDate.toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })
                        }</Text>
                        <Image
                            source={require('../../../../assets/images/back.png')}
                            style={{
                                width: 24,
                                height: 24,
                                resizeMode: "contain",
                                tintColor: colors[colorScheme].textGray,
                                transform: [{ rotate: '-90deg' }],
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                    renderItem={({ item, index }) =>
                        <TouchableOpacity onPress={() => navigation.navigate(businessRoutes.orderDetails, { item: item })}
                            style={{
                                backgroundColor: colors[colorScheme].background,
                                paddingVertical: 10,
                                paddingHorizontal: 14,
                                alignSelf: 'center',
                                borderBottomWidth: 0.5,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: '100%',
                                borderBottomColor: colors[colorScheme].textGray,
                            }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                {/* <Image
                                    source={require('../../../../assets/images/user.png')}
                                    style={{
                                        width: 50,
                                        height: 50,
                                        resizeMode: "contain",
                                    }}
                                /> */}
                                <View style={{
                                    // marginStart: 10,
                                }}>
                                    <Text style={{
                                        color: colors[colorScheme].textDark,
                                        fontSize: 16,
                                        fontFamily: 'Inter-Medium',
                                    }}>Peter Andrew</Text>
                                    <Text style={{
                                        color: colors[colorScheme].textGray,
                                        fontSize: 12,
                                        fontFamily: 'Inter-Regular',
                                    }}>09:19am  - Jan. 1st, 2024</Text>
                                </View>
                            </View>
                            <View style={{
                                marginStart: 10,
                                alignItems: 'flex-end',
                            }}>
                                <Text style={{
                                    color: colors[colorScheme].textDark,
                                    fontSize: 16,
                                    fontFamily: 'Inter-Medium',
                                }}>+N20,000</Text>
                                <Text style={{
                                    color: colors[colorScheme].textGray,
                                    fontSize: 12,
                                    fontFamily: 'Inter-Regular',
                                }}>Delivered</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>

            <DatePicker
                modal
                open={open}
                date={startDate}
                onConfirm={date => {
                    setOpen(false);
                    setStartDate(date);
                }}
                mode="date"
                onCancel={() => {
                    setOpen(false);
                }}
            />

            <DatePicker
                modal
                open={open2}
                date={endDate}
                onConfirm={date => {
                    setOpen2(false);
                    setEndDate(date);
                }}
                mode="date"
                onCancel={() => {
                    setOpen2(false);
                }}
            />
        </>
    )
};