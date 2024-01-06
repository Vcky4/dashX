import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform, Dimensions, Linking, ActivityIndicator } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'react-native-simple-bottom-sheet';

import colors from "../../../../assets/colors/colors";
import endpoints from "../../../../assets/endpoints/endpoints";

import { AuthContext } from "../../../../context/AuthContext";
import mapStyles from "../../home/mapStyles/mapStyles";


export default Monitor = ({ navigation }) => {
    const { width, height } = Dimensions.get('window');
    const GOOGLE_API_KEY = endpoints.gg;
    const { user, token, saveUser, colorScheme, toggleTheme } = useContext(AuthContext);
    // const [distance, setDistance] = useState(0);
    // const [duration, setDuration] = useState(0);
    const [isDispatch, setIsDispatch] = useState(false);
    const [open, setOpen] = useState(false);
    const panelRef = useRef(null);
    const [updateCount, setUpdateCount] = useState(0);
    const [positioned, setPositioned] = useState(false);
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [fleets, setFleets] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [thisFleet, setThisFleet] = useState({});
    const [order, setOrder] = useState(null);

    const getTotalFleests = async () => {
        setProcessing(true);
        const response = await fetch(endpoints.baseUrl + endpoints.retriveFleets, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "dispatchid": user.id,
            })
        })
        const json = await response.json()
        // console.log(json.data)
        setProcessing(false)
        //check if array
        if (Array.isArray(json.data)) {
            setFleets(json.data)
        }
    }

    const getFleet = async (id) => {
        setProcessing(true);
        getCurrentOrder(id)
        const response = await fetch(endpoints.baseUrl + endpoints.singleFleet, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "dispatchid": user.id,
                "fleetid": id
            })
        })
        const json = await response.json()
        // console.log(json)
        setThisFleet(json.data)
        setProcessing(false)
    }

    const getCurrentOrder = async (id) => {
        setProcessing(true);
        const response = await fetch(endpoints.baseUrl + endpoints.fleetOrders, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                "dispatchid": user.id,
                "fleetid": id
            })
        })
        const json = await response.json()
        setProcessing(false)
        console.log(json.data)
        //check if array
        if (Array.isArray(json.data)) {
            setOrder(json.data[0])
            // if (dispatchItem === null) {
            //     setDispatchItem(json.data[0])
            // }
            // setDispatchItem(json.data[0])
        }
    }

    useEffect(() => {
        getTotalFleests()
    }, [])

    //open direction on maps
    const openDirection = (lat, lng) => {
        const scheme = Platform.select({
            ios: 'maps:0,0?q=',
            android: 'geo:0,0?q=',
        });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';
        const url = Platform.OS === 'ios' ? `${scheme}${label}@${latLng}` : `${scheme}${latLng}(${label})`;
        Linking.openURL(url);
    }



    const onMapPress = (e) => {
        this.mapView.animateToRegion({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        });
    }


    const updateMyLocation = (e) => {
        myLocation = e.nativeEvent.coordinate;

        // console.log('myLocation', myLocation)
        setUpdateCount(updateCount + 1);
        setCoordinates({
            latitude: e.nativeEvent.coordinate.latitude,
            longitude: e.nativeEvent.coordinate.longitude,
        });
        // if (autoPosition && !helpCoordinates || autoPosition && isDispatch) {
        this.mapView.setCamera({
            center: {
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
            },
            pitch: isDispatch ? 50 : 0,
            heading: e.nativeEvent.coordinate?.heading,
            altitude: e.nativeEvent.coordinate?.altitude,
            zoom: isDispatch ? 60 : 17,
        }, { duration: 10000 })
        // }
    }

    const mapCustomStyle = mapStyles[colorScheme]
    //check if ready
    // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
    return (

        <View style={[styles.container, {}]}>
            <TouchableOpacity onPress={() => {
                getTotalFleests()
            }}
                style={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    zIndex: 100,
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 40,
                    padding: 6,
                    elevation: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    // display: online ? 'flex' : 'none',
                }} >
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                    display: processing ? 'none' : 'flex',
                }}>Refresh</Text>

                <ActivityIndicator
                    animating={processing}
                    size="small"
                    color={colors[colorScheme].white}
                    style={{
                        display: processing ? 'flex' : 'none',
                    }}
                />

            </TouchableOpacity>

            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                top: 10,
                left: 20,
                zIndex: 100,
                backgroundColor: colors[colorScheme].background,
                borderRadius: 40,
                elevation: 10,
                paddingEnd: 10,
            }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Image
                        source={user?.photo?.length > 0 ? { uri: user?.photo } : require('../../../../assets/images/user.png')}
                        style={{
                            width: 40,
                            height: 40,
                            alignSelf: 'center',
                            resizeMode: 'cover',
                            borderRadius: 25,
                        }}
                    />
                </TouchableOpacity>

                <Text style={{
                    color: colors[colorScheme].textDark,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                    marginLeft: 10,
                }}>{user.name}</Text>

                <TouchableOpacity style={{
                    marginLeft: 10,
                }}
                    onPress={() => toggleTheme()}>
                    <Image
                        source={
                            colorScheme === 'light' ?
                                require('../../../../assets/images/night.png') :
                                require('../../../../assets/images/light.png')
                        }
                        style={{
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                            tintColor: colors[colorScheme].textDark,
                        }}
                    />
                </TouchableOpacity>
            </View>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapView}
                userInterfaceStyle={colorScheme}
                onPress={onMapPress}
                ref={c => this.mapView = c}
                showsMyLocationButton={false}
                showsUserLocation={true}
                customMapStyle={mapCustomStyle}
                // showsTraffic={true}
                tintColor={colors[colorScheme].primary}
                showsBuildings={true}
                showsCompass={true}
                // followsUserLocation={true}
                zoomControlEnabled={false}
                // camera={{
                //     center: {
                //         latitude: myLocation.latitude,
                //         longitude: myLocation.longitude,
                //     },
                //     pitch: 90,
                //     heading: myLocation?.heading ? myLocation?.heading : 0,
                //     altitude: myLocation?.altitude ? myLocation?.altitude : 0,
                //     zoom: 15,
                // }}

                userLocationUpdateInterval={10000}
                accessible={true}
                showsScale={true}
                rotateEnabled={true}
                compassOffset={{ x: -10, y: 300 }}
                onUserLocationChange={updateMyLocation}
                showsIndoors={true}
                showsIndoorLevelPicker={true}
                showsPointsOfInterest={true}
                // loadingEnabled
                // region={{
                //     latitude: coordinates[0].latitude,
                //     longitude: coordinates[0].longitude,
                //     latitudeDelta: 0.015,
                //     longitudeDelta: 0.0121,
                // }}
                initialCamera={{
                    center: {
                        latitude: 0,
                        longitude: 0,
                    },
                    pitch: 0,
                    heading: 0,
                    altitude: 0,
                    zoom: 15,
                }}
            // initialRegion={{
            //     latitude: 48.8587741,
            //     longitude: 2.2069771,
            //     latitudeDelta: 0.0922,
            //     longitudeDelta: 0.0922 * (width / height),
            // }}
            >



                {
                    open && order !== null && <>
                        <Marker
                            coordinate={order.order_status === 'shipping' ?
                                {
                                    latitude: parseFloat(order?.receivercordinate?.receiverlat),
                                    longitude: parseFloat(order?.receivercordinate?.receiverlong),
                                }
                                :
                                {
                                    latitude: parseFloat(order?.sendercordinate?.senderlat),
                                    longitude: parseFloat(order?.sendercordinate?.senderlong),
                                }
                            }
                            title={"Pickup"}
                            description={''}
                        // pinColor={colors[colorScheme].primary}
                        >
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={require('../../../../assets/images/lcActive.png')}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        resizeMode: 'contain',
                                        zIndex: 10,
                                        // tintColor: colors[colorScheme].white,
                                    }}
                                />
                            </View>
                        </Marker>
                        {
                            order && <Marker
                                coordinate={{
                                    latitude: parseFloat(thisFleet.fleet.cordinate.latitude),
                                    longitude: parseFloat(thisFleet.fleet.cordinate.longitude),
                                }}
                                title={"Pickup"}
                                description={''}
                            // pinColor={colors[colorScheme].primary}
                            >
                                <View style={{
                                    // width: 40,
                                    // height: 40,
                                    // borderRadius: 20,
                                    // backgroundColor: colors[colorScheme].primary,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <Image
                                        source={{ uri: user.photo }}
                                        style={{
                                            width: 24,
                                            height: 24,
                                            resizeMode: 'cover',
                                            borderRadius: 14,
                                            position: 'absolute',
                                            zIndex: 10,
                                            top: 5,
                                            // tintColor: colors[colorScheme].white,
                                        }}
                                    />
                                    <Image
                                        source={require('../../../../assets/images/lcBlack.png')}
                                        style={{
                                            width: 32,
                                            height: 40,
                                            resizeMode: 'contain',
                                            // tintColor: colors[colorScheme].white,
                                        }}
                                    />

                                    <Image
                                        source={require('../../../../assets/images/lcActive.png')}
                                        style={{
                                            width: 20,
                                            height: 20,
                                            resizeMode: 'contain',
                                            position: 'absolute',
                                            bottom: -6,
                                            zIndex: 10,
                                            // tintColor: colors[colorScheme].white,
                                        }}
                                    />
                                </View>
                            </Marker>
                        }
                    </>
                }

                {
                    !open && <>
                        {
                            fleets.map((fleet, index) =>

                                <Marker key={index}
                                    coordinate={{
                                        latitude: parseFloat(fleet.cordinate.latitude),
                                        longitude: parseFloat(fleet.cordinate.longitude),
                                    }}
                                    title={fleet.name}
                                    description={fleet.vehicle.vehicle_number}
                                    onPress={() => {
                                        setThisFleet({
                                            fleet: fleet
                                        })
                                        getFleet(fleet._id)
                                        panelRef.current.togglePanel()
                                    }}
                                // pinColor={colors[colorScheme].primary}
                                >
                                    <View style={{
                                        // width: 40,
                                        // height: 40,
                                        // borderRadius: 20,
                                        // backgroundColor: colors[colorScheme].primary,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                        <Image
                                            source={{ uri: user.photo }}
                                            style={{
                                                width: 24,
                                                height: 24,
                                                resizeMode: 'cover',
                                                borderRadius: 14,
                                                position: 'absolute',
                                                zIndex: 10,
                                                top: 5,
                                                // tintColor: colors[colorScheme].white,
                                            }}
                                        />
                                        <Image
                                            source={require('../../../../assets/images/lcBlack.png')}
                                            style={{
                                                width: 32,
                                                height: 40,
                                                resizeMode: 'contain',
                                                // tintColor: colors[colorScheme].white,
                                            }}
                                        />

                                        <Image
                                            source={
                                                fleet.online_status ?
                                                    require('../../../../assets/images/lcActive.png') :
                                                    require('../../../../assets/images/lcRed.png')
                                            }
                                            style={{
                                                width: 20,
                                                height: 20,
                                                resizeMode: 'contain',
                                                position: 'absolute',
                                                bottom: -6,
                                                zIndex: 10,
                                                // tintColor: colors[colorScheme].white,
                                            }}
                                        />
                                    </View>
                                </Marker>)
                        }
                    </>
                }

                {(open && order != null) &&
                    <MapViewDirections
                        origin={{
                            latitude: parseFloat(thisFleet.fleet.cordinate.latitude),
                            longitude: parseFloat(thisFleet.fleet.cordinate.longitude),
                        }}
                        destination={
                            order.order_status === 'shipping' ?
                                {
                                    latitude: parseFloat(order?.receivercordinate?.receiverlat),
                                    longitude: parseFloat(order?.receivercordinate?.receiverlong),
                                }
                                :
                                {
                                    latitude: parseFloat(order?.sendercordinate?.senderlat),
                                    longitude: parseFloat(order?.sendercordinate?.senderlong),
                                }
                        }
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor={colors[colorScheme].primary}
                        timePrecision="now"
                        precision="high"
                        optimizeWaypoints={true}
                        mode='DRIVING'
                        // waypoints={waypoints}
                        onStart={(params) => {
                            // console.log('params :>>', params)
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log('result :>>', result?.end_location)
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            // setDistance(result.distance);
                            // setDuration(result.duration);
                            // setWaypoints(result.coordinates);

                            if (!positioned) {
                                this.mapView.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                                setPositioned(true)
                            }
                        }}
                        onError={(errorMessage) => {
                            console.log('GOT AN ERROR', errorMessage);
                        }}
                    />}

            </MapView>

            <BottomSheet isOpen={open}
                wrapperStyle={{
                    borderTopLeftRadius: 22,
                    borderTopRightRadius: 22,
                    elevation: 10,
                    backgroundColor: colors[colorScheme].background,
                    // flex: 1,
                }}
                outerContentStyle={{
                    width: width,
                    borderRadius: 8,
                    left: -20.5,
                }}
                onOpen={() => setOpen(true)}
                onClose={() => {
                    setThisFleet({})
                    setOpen(false)
                    setPositioned(false)
                }}
                sliderMaxHeight={height - 100}
                sliderMinHeight={isDispatch ? 50 : 0}
                ref={ref => panelRef.current = ref}>

                <View style={{
                    paddingHorizontal: 20,
                    marginBottom: 30
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>Order Details</Text>
                        <Text style={{
                            color: colors[colorScheme].textDark,
                            fontSize: 16,
                            fontFamily: 'Inter-SemiBold',
                        }}>{thisFleet?.name}</Text>
                    </View>

                    <View style={{
                        borderRadius: 10,
                        backgroundColor: '#EFE9E7',
                        padding: 10,
                        marginTop: 10
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                            <View>
                                <Text style={{
                                    color: colors[colorScheme].black,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                }}>Current order price</Text>
                                <Text style={{
                                    color: colors[colorScheme].black,
                                    fontSize: 16,
                                    fontFamily: 'Inter-SemiBold',
                                }}>₦{thisFleet?.totalamount}</Text>
                            </View>

                            <View style={{
                                alignItems: 'flex-end',
                            }}>
                                <Text style={{
                                    color: colors[colorScheme].black,
                                    fontSize: 14,
                                    fontFamily: 'Inter-Regular',
                                }}>Orders completed</Text>
                                <Text style={{
                                    color: colors[colorScheme].black,
                                    fontSize: 16,
                                    fontFamily: 'Inter-SemiBold',
                                }}>{thisFleet.totalorder}</Text>
                            </View>
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            paddingHorizontal: 10,
                        }}>
                            <Image
                                source={require('../../../../assets/images/mark.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    tintColor: order?.order_status === 'pending' ? 'white' : '',
                                }}
                            />
                            <View style={{
                                backgroundColor: order?.order_status !== 'shipping' ? colors[colorScheme].inactive : colors[colorScheme].primary,
                                width: '40%',
                                height: 6
                            }} />
                            <Image
                                source={require('../../../../assets/images/mark.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    tintColor: order?.order_status !== 'shipping' ? 'white' : '',
                                }}
                            />
                            <View style={{
                                backgroundColor: order?.order_status !== 'delivered' ? colors[colorScheme].inactive : colors[colorScheme].primary,
                                width: '40%',
                                height: 6
                            }} />
                            <Image
                                source={require('../../../../assets/images/mark.png')}
                                style={{
                                    width: 20,
                                    height: 20,
                                    resizeMode: 'contain',
                                    tintColor: order?.order_status !== 'delivered' ? '' : colors[colorScheme].primary
                                }}
                            />
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <Text style={{
                                color: colors[colorScheme].primary,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                            }}>Pickup</Text>
                            <Text style={{
                                color: colors[colorScheme].primary,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                                left: 10
                            }}>In Progress</Text>
                            <Text style={{
                                color: colors[colorScheme].primary,
                                fontSize: 14,
                                fontFamily: 'Inter-Regular',
                            }}>Delivered</Text>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    mapView: {
        width: '100%',
        height: '100%',
    },
});



async function requestLocationPermission() {
    if (Platform.OS === 'ios') {
        Geolocation.setRNConfiguration({
            authorizationLevel: 'whenInUse'
        })

        Geolocation.requestAuthorization()
        // IOS permission request does not offer a callback :/
        return null
    } else if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } catch (err) {
            console.warn(err.message)
            return false
        }
    }
}