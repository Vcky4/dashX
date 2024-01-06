import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform, Dimensions, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'react-native-simple-bottom-sheet';

import colors from "../../../assets/colors/colors";
import endpoints from "../../../assets/endpoints/endpoints";
import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from "../../navigation/routs/mainRouts";
import { AuthContext } from "../../../context/AuthContext";
import profileRouts from "../../navigation/routs/profileRouts";
import Button from "../../component/Button";
import getAddress from "../../utils/getAddress";
import Dispatch from "./Dispatch";
import DispatchSheet from "./DispatchSheet";
import Toast from "react-native-toast-message";
import PendingOrder from "./PendingOrder";
import mapStyles from "./mapStyles/mapStyles";

var Sound = require('react-native-sound');


Sound.setCategory('Playback');
var ding = new Sound(dings, error => {
    if (error) {
        console.log('failed to load the sound', error);
        return;
    }
    // if loaded successfully
    console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
});

export default Home = ({ navigation }) => {
    const [helpCoordinates, setHelpCoordinate] = useState(null);
    const { width, height } = Dimensions.get('window');
    const GOOGLE_API_KEY = endpoints.gg;
    const { user, token, saveUser, colorScheme } = useContext(AuthContext);
    const [autoPosition, setAutoPosition] = useState(true);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDispatch, setIsDispatch] = useState(false);
    const [address, setAddress] = useState('');
    const [bottomStep, setBottomStep] = useState(0);
    const [online, setOnline] = useState(false);
    const panelRef = useRef(null);
    const panelRef2 = useRef(null);
    const [updateCount, setUpdateCount] = useState(0);
    const [myOrders, setMyOrders] = useState([])
    const [dispatchItem, setDispatchItem] = useState(null)
    const [processing, setProcessing] = useState(false)
    const [isOpen, setIsOpen] = useState(false)
    const [newOrders, setNewOrders] = useState(0)
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });

    const [positioned, setPositioned] = useState(false)


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

    // //setup to socket
    // const socket = io(endpoints.socketUrl, {
    //     extraHeaders: {
    //         authorization: `Bearer ${token}`,
    //     },
    // });

    const getMyOrder = async () => {
        const response = await fetch(endpoints.baseUrl + endpoints.myOrders, {
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
        // console.log(json)
        //check if array
        if (Array.isArray(json.data)) {
            setMyOrders(json.data)
            // if (dispatchItem === null) {
            //     setDispatchItem(json.data[0])
            // }
            // setDispatchItem(json.data[0])
        }
    }

    useEffect(() => {
        setInterval(() => {
            if (!isDispatch) {
                getMyOrder()
            }
        }, 5000)
    }, [])

    const retriveProfile = () => {
        fetch(endpoints.baseUrl + endpoints.retriveProfile, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
            }),
        }).then(res => res.json())
            .then(resJson => {
                // console.log('resJson', resJson)
                if (resJson.status) {
                    setOnline(resJson.data.online_status)
                    saveUser({
                        id: resJson.data._id,
                        ...resJson.data,
                    });
                    // console.log('json.data.kin.kin_name', user?.photo.length)
                    if (resJson.data?.photo?.length < 1) {
                        navigation.navigate(profileRouts.editProfile)
                    }
                }
            })
            .catch(err => {
                console.log('err', err)
            })
    }


    const updateStatus = () => {
        setProcessing(true)
        fetch(endpoints.baseUrl + endpoints.updateStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                status: !online
            }),
        }).then(res => res.json())
            .then(resJson => {
                setProcessing(false)
                // console.log('resJson', resJson)
                if (resJson.status) {
                    saveUser({
                        id: resJson.data._id,
                        ...resJson.data,
                    });
                    setOnline(!online)
                }
            })
            .catch(err => {
                setProcessing(false)
                console.log('err', err)
            })
    }

    useEffect(() => {
        //find for oder_status == shipping
        if (myOrders.find(item => item.order_status == 'shipping' && bottomStep === 0) && !isDispatch) {
            bottomStep == 0 && setBottomStep(2)
            setDispatchItem(myOrders.find(item => item.order_status == 'shipping'))
            setIsDispatch(true)
            panelRef.current.togglePanel()
        }
    }, [myOrders])

    const startDispatch = (id) => {
        fetch(endpoints.baseUrl + endpoints.startDispatch, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                dispatchid: user?.id,
                "orderid": id
            }),
        }).then(res => res.json())
            .then(resJson => {
                // console.log('resJson', resJson)
                if (resJson.status) {
                    setIsDispatch(true)
                    panelRef.current.togglePanel()
                    openDirection(
                        parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                        parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                    )
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Error',
                        text2: resJson.message,
                    })
                }
            })
            .catch(err => {
                console.log('err', err)
                Toast.show({
                    type: 'error',
                    text1: 'Error',
                    text2: err,
                })
            })
    }
    useEffect(() => {
        retriveProfile();
    }, [])

    // // console.log('dispatchItem', dispatchItem)
    // //connect to socket
    // useEffect(() => {
    //     // if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
    //     socket.on('connect', e => {
    //         console.log('connected', socket.connected);
    //         // setOnline(true);
    //         // socket.emit('updateLocation', {
    //         //   latitude: parseFloat(coordinate.latitude),
    //         //   longitude: parseFloat(coordinate.longitude),
    //         //   // location: callback
    //         // });
    //         // console.log(' first sent', [coordinate.longitude, coordinate.latitude]);
    //     });

    //     socket.on('disconnect', e => {
    //         setOnline(false);
    //         console.log('disconnected', socket.connected);
    //     });
    //     // }
    //     return () => {
    //         socket.off('connect');
    //         socket.off('disconnect');
    //         // socket.off('receiveAlerts');
    //     };
    // }, [token]);
    // useEffect(() => {
    //     messageTrigger && setFade(1)
    //     setTimeout(() => { setFade(0); setMessageTrigger(false) }, 10000)
    // }, [messageTrigger]);

    // useEffect(() => {
    //     Animated.timing(fadeIn, {
    //         toValue: fade,
    //         duration: 1000,
    //         useNativeDriver: true,
    //     }).start();
    // }, [fade]);

    const playPause = () => {
        ding.play(success => {
            if (success) {
                // playPause();
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
        });
        ding.setNumberOfLoops(-1);
    };


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
        if (autoPosition && !helpCoordinates || autoPosition && isDispatch) {
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
        }
    }

    //update control
    const updateControl = (state) => {
        if (!state) {
            setUpdateCount(0);
            setAutoPosition(false);
            // console.log('updateCount', updateCount)
        }
    }
    useEffect(() => {
        setUpdateCount(30)
    }, [])

    useEffect(() => {
        if (updateCount > 30) {
            setAutoPosition(true);
            // console.log('autoPosition', autoPosition)
            setUpdateCount(0);
        }
    }, [updateCount])
    useEffect(() => {
        requestLocationPermission()
    }, [])
    useEffect(() => {

        if (requestLocationPermission()) {
            setTimeout(() => {
                setHelpCoordinate({
                    latitude: 6.59,
                    longitude: 3.78,
                })
                // panelRef.current.togglePanel()
            }, 5000);
            // setTimeout(() => {
            //     setAccepted(true)
            // }, 10000);
        }
    }, [])

    const getAddres = (lat, lng) => {
        getAddress(lat, lng, (result) => {
            setAddress(result[0])
        })
    }
    // console.log('dispatch', dispatchItem)
    useEffect(() => {
        getAddres(coordinate.latitude, coordinate.longitude)
    }, [coordinate])

    useEffect(() => {
        ding.setVolume(1);
        return () => {
            ding.release();
        };
    }, []);

    // Subscribe to network state updates
    // useEffect(() => {
    //     NetInfo.addEventListener(state => {
    //         console.log("Connection type", state.type);
    //         // updateUserStatus(state.isConnected && forceOnline);
    //     });
    // }, [forceOnline])

    //update user location every 30 seconds

    // let ratings = []
    // for (let i = 0; i < 5; i++) {
    //     ratings.push(
    //         <TouchableOpacity key={i}
    //             onPress={() => { setRating(i + 1) }}
    //             style={{
    //                 marginHorizontal: 4,
    //             }}>
    //             {/* <StarLgIcon fill={rating > i ? colors.primary : colors.inactiveBt} /> */}
    //         </TouchableOpacity>
    //     )
    // }
    const mapCustomStyle = mapStyles[colorScheme]
    //check if ready
    // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
    return (

        <View style={[styles.container, {}]}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}
                style={{
                    position: 'absolute',
                    top: 20,
                    left: 20,
                    zIndex: 100,
                    backgroundColor: colors[colorScheme].white,
                    borderRadius: 40,
                    padding: 6,
                    elevation: 10,
                }} >
                <Image
                    source={require('../../../assets/images/menu.png')}
                    style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                        borderRadius: 40,
                    }}
                />
            </TouchableOpacity>


            <TouchableOpacity onPress={() => {
                // setBottomStep(1)
                panelRef2.current.togglePanel()
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
                    display: online ? 'flex' : 'none',
                }} >
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                }}>New Orders</Text>

                <Text style={{
                    color: colors[colorScheme].primary,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                    backgroundColor: colors[colorScheme].white,
                    position: 'absolute',
                    right: -1,
                    top: -7,
                    borderRadius: 10,
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                }}>{newOrders}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (bottomStep === 2) {
                    setIsDispatch(false)
                    panelRef.current.togglePanel()
                }
                setBottomStep(bottomStep - 1)
            }}
                style={{
                    backgroundColor: colors[colorScheme].primary,
                    padding: 14,
                    borderRadius: 10,
                    position: 'absolute',
                    bottom: bottomStep === 1 ? 320 : 380,
                    left: 20,
                    zIndex: 100,
                    elevation: 10,
                    display: bottomStep > 0 && !isOpen ? 'flex' : 'none',
                }}>
                <Image
                    source={require('../../../assets/images/down.png')}
                    style={{
                        width: 12,
                        height: 12,
                        resizeMode: "contain",
                        transform: [{ rotate: '90deg' }]
                    }}
                />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                dispatchItem && setBottomStep(1)
            }}
                style={{
                    position: 'absolute',
                    bottom: bottomStep > 0 ? 320 : 170,
                    left: 20,
                    zIndex: 100,
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 40,
                    padding: 6,
                    elevation: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    display: bottomStep === 0 && !isDispatch && !isOpen ? 'flex' : 'none',
                }} >
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                }}>Dispatch Orders</Text>
                <Text style={{
                    color: colors[colorScheme].primary,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                    backgroundColor: colors[colorScheme].white,
                    position: 'absolute',
                    right: -1,
                    top: -7,
                    borderRadius: 10,
                    height: 20,
                    width: 20,
                    textAlign: 'center',
                }}>{myOrders.length}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                if (isDispatch || dispatchItem.order_status === 'pickup') {
                    openDirection(
                        parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                        parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                    )
                } else {
                    dispatchItem && openDirection(
                        parseFloat(dispatchItem?.sendercordinate?.senderlat),
                        parseFloat(dispatchItem?.sendercordinate?.senderlong),
                    )
                }
            }}
                style={{
                    position: 'absolute',
                    bottom: bottomStep === 1 ? 320 : 380,
                    right: 80,
                    zIndex: 100,
                    backgroundColor: colors[colorScheme].primary,
                    borderRadius: 40,
                    padding: 6,
                    elevation: 10,
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    display: bottomStep > 0 && !isOpen ? 'flex' : 'none',
                }} >
                <Text style={{
                    color: colors[colorScheme].white,
                    fontSize: 16,
                    fontFamily: 'Inter-Bold',
                }}>Directions</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                this.mapView.animateToRegion({
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                });
            }}
                style={{
                    position: 'absolute',
                    bottom: bottomStep > 0 ? 320 : 170,
                    right: 20,
                    zIndex: 100,
                    backgroundColor: colors[colorScheme].white,
                    borderRadius: 40,
                    padding: 6,
                    elevation: 10,
                    display: (!isDispatch && !isOpen) ? 'flex' : 'none',
                }} >
                <Image
                    source={require('../../../assets/images/location.png')}
                    style={{
                        width: 30,
                        height: 30,
                        resizeMode: "contain",
                        borderRadius: 40,
                    }}
                />
            </TouchableOpacity>
            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 100,
                elevation: 10,
                width: '100%',
                display: bottomStep === 0 && !isOpen ? 'flex' : 'none',
            }}>
                <View style={{
                    backgroundColor: online ? colors[colorScheme].lightBg2 : colors[colorScheme].lightBg,
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <View>
                        <Text style={{
                            color: colors[colorScheme].black,
                            fontSize: 16,
                            fontFamily: 'Inter-Medium',
                        }}>You are currently <Text style={{
                            color: online ? '#B2FF65' : colors[colorScheme].primary,
                            fontFamily: 'Inter-Bold',
                        }}>{!online ? 'OFFLINE' : 'ONLINE'}</Text></Text>
                        <View style={{
                            marginTop: 2,
                            flexDirection: 'row',
                            alignItems: 'center',
                            display: online ? 'flex' : 'none',
                        }}>
                            <View style={{
                                backgroundColor: '#B2FF65',
                                borderRadius: 5,
                                width: 10,
                                height: 10,
                            }} />

                            <Text style={{
                                color: colors[colorScheme].black,
                                fontSize: 12,
                                fontFamily: 'Inter-Medium',
                                marginLeft: 5,
                            }}>Receiving Dispatch Requests</Text>
                        </View>
                    </View>
                    <Button title={online ? 'GO OFFLINE' : 'GO ONLINE'}
                        onPress={() => {
                            updateStatus()
                        }}
                        buttonStyle={{
                            borderRadius: 20,
                            height: 36,
                            width: 110,
                        }}
                        fontSize={16}
                        loading={processing}
                        enabled={!processing}
                    />
                </View>
                <View style={{
                    backgroundColor: colors[colorScheme].halfWhite,
                    width: '100%',
                    paddingHorizontal: 20,
                    paddingVertical: 15,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Image
                        source={require('../../../assets/images/point.png')}
                        style={{
                            width: 20,
                            height: 20,
                            resizeMode: "contain",
                        }}
                    />
                    <Text style={{
                        color: colors[colorScheme].black,
                        fontSize: 14,
                        fontFamily: 'Inter-Bold',
                        marginLeft: 5,
                    }}>Rider’s Location: <Text style={{
                        fontFamily: 'Inter-Medium',
                    }}>{address?.formatted_address}</Text></Text>
                </View>
            </View>

            <View style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                zIndex: 100,
                elevation: 10,
                width: '100%',
                display: (bottomStep === 1 && !isDispatch && !isOpen) ? 'flex' : 'none',
                backgroundColor: colors[colorScheme].background,
                borderRadius: 20,
            }}>
                <Dispatch items={myOrders}
                    navigation={navigation}
                    onDispatch={(item) => {
                        setBottomStep(2)
                        startDispatch(item._id)
                    }}
                    onContinue={(item) => {
                        setIsDispatch(true)
                        setDispatchItem(item)
                        setBottomStep(2)
                        panelRef.current.togglePanel()
                    }}
                    distance={distance}
                    duration={duration}
                    processing={processing}
                    onIndexChanged={(index, item) => {
                        setDispatchItem(item)
                        console.log('item', item)
                    }} />
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
                followsUserLocation={true}
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
                onTouchEnd={() => {
                    // console.log('onTouchEnd')
                    updateControl(true);
                }}
                onTouchStart={() => {
                    // console.log('onTouchStart')
                    updateControl(false);
                }}
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
                {(isDispatch && bottomStep > 0) &&
                    <Marker
                        coordinate={{
                            latitude: parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                            longitude: parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                        }}
                        title={"Delivery"}
                        description={dispatchItem?.receiveraddress}
                        pinColor={colors[colorScheme].primary}

                    />
                }

                {(!isDispatch && bottomStep > 0 && dispatchItem) &&
                    <>
                        <Marker
                            coordinate={{
                                latitude: parseFloat(dispatchItem?.sendercordinate?.senderlat),
                                longitude: parseFloat(dispatchItem?.sendercordinate?.senderlong),
                            }}
                            title={"Pickup"}
                            description={dispatchItem?.senderaddress}
                            pinColor={colors[colorScheme].primary}
                        />

                        <Marker
                            coordinate={{
                                latitude: parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                                longitude: parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                            }}
                            title={"Delivery"}
                            description={dispatchItem?.receiveraddress}
                            pinColor={colors[colorScheme].primary}
                        />
                    </>
                }

                {(!isDispatch && bottomStep > 0 && dispatchItem) &&
                    <MapViewDirections
                        origin={{
                            latitude: parseFloat(dispatchItem?.sendercordinate?.senderlat),
                            longitude: parseFloat(dispatchItem?.sendercordinate?.senderlong),
                        }}
                        destination={{
                            latitude: parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                            longitude: parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                        }}
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
                            setDistance(result.distance);
                            setDuration(result.duration);
                            // setWaypoints(result.coordinates);

                            this.mapView.fitToCoordinates(result.coordinates, {
                                edgePadding: {
                                    right: (width / 20),
                                    bottom: (height / 20),
                                    left: (width / 20),
                                    top: (height / 20),
                                }
                            });
                        }}
                        onError={(errorMessage) => {
                            console.log('GOT AN ERROR', errorMessage);
                        }}
                    />}

                {(isDispatch) &&
                    <MapViewDirections
                        origin={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                        }}
                        destination={{
                            latitude: parseFloat(dispatchItem?.receivercordinate?.receiverlat),
                            longitude: parseFloat(dispatchItem?.receivercordinate?.receiverlong),
                        }}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor={colors[colorScheme].primary}
                        timePrecision="now"
                        mode='DRIVING'
                        precision="high"
                        optimizeWaypoints={true}
                        // waypoints={waypoints}
                        onStart={(params) => {
                            // console.log('params :>>', params)
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            // console.log('result :>>', result?.end_location)
                            // console.log(`Distance: ${result.distance} km`)
                            // console.log(`Duration: ${result.duration} min.`)
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
                            console.log('GOT AN ERROR');
                        }}
                    />}
                {/* <Marker coordinate={coordinates[0]} />
                    <Marker coordinate={coordinates[1]} /> */}
            </MapView>

            <BottomSheet isOpen={isDispatch}
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
                sliderMaxHeight={height - 100}
                sliderMinHeight={isDispatch ? 50 : 0}
                ref={ref => panelRef.current = ref}>
                <TouchableOpacity onPress={() => {
                    this.mapView.animateToRegion({
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    });
                }}
                    style={{
                        position: 'absolute',
                        bottom: 380,
                        right: 20,
                        zIndex: 100,
                        backgroundColor: colors[colorScheme].white,
                        borderRadius: 40,
                        padding: 6,
                        elevation: 10,
                        display: isDispatch ? 'flex' : 'none',
                    }} >
                    <Image
                        source={require('../../../assets/images/location.png')}
                        style={{
                            width: 30,
                            height: 30,
                            resizeMode: "contain",
                            borderRadius: 40,
                        }}
                    />
                </TouchableOpacity>
                <DispatchSheet
                    item={dispatchItem}
                    onEnd={() => {
                        getMyOrder()
                        setBottomStep(0)
                        setIsDispatch(false)
                        setPositioned(false)
                        panelRef.current.togglePanel()
                        // setHelpCoordinate(null)
                    }} />
                <View style={{
                    height: 20
                }} />
            </BottomSheet>


            <BottomSheet isOpen={false}
                wrapperStyle={{
                    borderTopLeftRadius: 0,
                    borderTopRightRadius: 0,
                    elevation: 10,
                    backgroundColor: colors[colorScheme].background,
                    flex: 1,
                }}
                sliderMaxHeight={height * 0.8}
                outerContentStyle={{
                    width: width,
                    left: -20.5,
                }}
                lineContainerStyle={{
                    // display: 'none'
                }}
                sliderMinHeight={0}
                onOpen={() => {
                    setIsOpen(true)
                }}
                onClose={() => {
                    setIsOpen(false)
                }}
                ref={ref => panelRef2.current = ref}>
                {/* <View style={{
                    backgroundColor: '#E6CEF2',
                    top: -95,
                    alignSelf: 'center',
                    borderRadius: 30,
                    position: 'absolute',
                    paddingHorizontal: 20,
                    paddingVertical: 6,
                    display: isOpen ? 'flex' : 'none'
                }}>
                    <Text style={{
                        color: colors[colorScheme].black,
                        fontSize: 16,
                        fontFamily: 'Inter-SemiBold',
                    }}>Pending  Orders</Text>
                </View> */}
                <PendingOrder
                    onClose={() => {
                        panelRef2.current?.togglePanel()
                    }}
                    onNewOrderChange={(it) => {
                        setNewOrders(it)
                    }}
                    navigation={navigation} />
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