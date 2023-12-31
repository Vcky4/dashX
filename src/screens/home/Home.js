import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform, Dimensions, TextInput, Animated } from "react-native";
import MapView, { PROVIDER_GOOGLE, Circle, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import BottomSheet from 'react-native-simple-bottom-sheet';
import NetInfo from "@react-native-community/netinfo";
import io from 'socket.io-client';

import colors from "../../../assets/colors/colors";
import endpoints from "../../../assets/endpoints/endpoints";
// import dings from '../../../assets/sounds/trilla.mp3'
import mainRouts from "../../navigation/routs/mainRouts";
import { AuthContext } from "../../../context/AuthContext";

var Sound = require('react-native-sound');


// Sound.setCategory('Playback');
// var ding = new Sound(dings, error => {
//     if (error) {
//         console.log('failed to load the sound', error);
//         return;
//     }
//     // if loaded successfully
//     console.log('duration in seconds: ' + ding.getDuration() + 'number of channels: ' + ding.getNumberOfChannels());
// });

export default Home = ({ navigation }) => {
    const [helpCoordinates, setHelpCoordinate] = useState(null);
    const { width, height } = Dimensions.get('window');
    const GOOGLE_API_KEY = endpoints.gg;
    const { user, token, saveUser, notification, updateNotification } = useContext(AuthContext);
    const [autoPosition, setAutoPosition] = useState(true);
    const [accepting, setAccepting] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [arrived, setArrived] = useState(false);
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [delivered, setDelivered] = useState(false);
    const [online, setOnline] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [addComment, setAddComment] = useState(false);
    const panelRef = useRef(null);
    const [variableUser, setVariableUser] = useState({})
    const [alert, setAlert] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);
    const [forceOnline, setForceOnline] = useState(true);
    const [waypoints, setWaypoints] = useState([]);
    const [fade, setFade] = useState(0);
    const [fadeIn] = useState(new Animated.Value(0));
    const [messageTrigger, setMessageTrigger] = useState(false);
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });
    let myLocation = {
        latitude: 0,
        longitude: 0,
    }
     //setup to socket
  const socket = io(endpoints.socketUrl, {
    extraHeaders: {
      authorization: `Bearer ${token}`,
    },
  });

    //connect to socket
    useEffect(() => {
        // if (coordinate.latitude !== 0 && coordinate.longitude !== 0) {
          socket.on('connect', e => {
            console.log('connected', socket.connected);
            // setOnline(true);
            // socket.emit('updateLocation', {
            //   latitude: parseFloat(coordinate.latitude),
            //   longitude: parseFloat(coordinate.longitude),
            //   // location: callback
            // });
            // console.log(' first sent', [coordinate.longitude, coordinate.latitude]);
          });
    
          socket.on('disconnect', e => {
            setOnline(false);
            console.log('disconnected', socket.connected);
          });
        // }
        return () => {
          socket.off('connect');
          socket.off('disconnect');
          // socket.off('receiveAlerts');
        };
      }, [token]);
    useEffect(() => {
        messageTrigger && setFade(1)
        setTimeout(() => { setFade(0); setMessageTrigger(false) }, 10000)
    }, [messageTrigger]);

    useEffect(() => {
        Animated.timing(fadeIn, {
            toValue: fade,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, [fade]);

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
    //send user status to server
    const updateUserStatus = async (status) => {
        const response = await fetch(endpoints.baseUrl + endpoints.userStatus, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                is_online: status,
            }),
        });
        response.json()
            .then((responseJson) => {
                // saveUser(responseJson);
                setVariableUser(responseJson);
                // setOnline(responseJson.data.is_online == 1 && variableUser.data.latitude != 0);
                // console.log('responseJson', responseJson)
            })
            .catch((error) => {
                console.error(error);
            });

    }

    //set user status to online
    const updateUserInfo = async () => {
        const response = await fetch(endpoints.baseUrl + endpoints.updateUser, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                username: user.data.username,
                email: user.data.email,
                longitude: coordinate.longitude,
                latitude: coordinate.latitude,
            }),
        });
        response.json()
            .then((data) => {
                // saveUser(data);
                // console.log('update user info', data)
                setVariableUser(data);
                // console.log('responseJson', data)
            })
            .catch((error) => {
                console.error(error);
            });
    }


    //get request details from server
    const getRequests = async () => {
        if (notification) {
            const response = await fetch(endpoints.baseUrl + endpoints.oderDetails + `?id=${notification.id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token,
                },
            });
            response.json()
                .then((data) => {
                    if (response.ok) {
                        console.log('ride data ', data)
                        if (data.data.status == "canceled") {
                            console.log('ride canceled')
                            updateNotification(null);
                            setHelpCoordinate(null)
                            setAlert(null)
                            setAccepted(false);
                            setArrived(false);
                            setDelivered(false);
                            setAddComment(false);
                            // panelRef.current.togglePanel()
                        } else if (data.data.status == "new_ride_requested") {
                            console.log('new ride requested', {
                                latitude: data.data.start_latitude,
                                longitude: data.data.start_longitude,
                            })
                            setAlert(data.data);
                            setHelpCoordinate({
                                latitude: parseFloat(data.data.start_latitude),
                                longitude: parseFloat(data.data.start_longitude),
                            })
                            panelRef.current.togglePanel()
                        }

                    }
                })
                .catch((error) => {
                    console.log('error', error)
                });
        }
    }

    //accept request
    const acceptRequest = async () => {
        setAccepting(true);
        const response = await fetch(endpoints.baseUrl + endpoints.acceptRide, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: notification.id,
                is_accept: 1,
                driver_id: user.data.id,
            }),
        });
        response.json()
            .then((data) => {
                console.log('accept response', response)
                console.log('accept request', data)
                if (response.ok) {
                    setAccepting(false);
                    setAccepted(true);
                    // setAlert(null)
                    // panelRef.current.togglePanel()
                }
            })
            .catch((error) => {
                setAccepting(false);
                console.log('accept error', error)
            });
    }

    //accept request
    const arrivedRequest = async () => {
        setAccepting(true);
        const response = await fetch(endpoints.baseUrl + endpoints.arrive, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: notification.id,
                driver_id: user?.data?.id,
            }),
        });
        response.json()
            .then((data) => {
                console.log('arrived response', response)
                console.log('arrived request', data)
                if (response.ok) {
                    setAccepting(false);
                    setArrived(true);
                    // setAlert(null)
                    // panelRef.current.togglePanel()
                }
            })
            .catch((error) => {
                setAccepting(false);
                console.log('arrived error', error)
            });
    }


    //complete request
    const completeRequest = async () => {
        setAccepting(true);
        const response = await fetch(endpoints.baseUrl + endpoints.complete, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({
                id: notification.id,
                driver_id: user?.data?.id,
            }),
        });
        response.json()
            .then((data) => {
                console.log('complete response', response)
                console.log('complete request', data)
                if (response.ok) {
                    setAccepting(false);
                    setDelivered(true)
                    // setAlert(null)
                    // panelRef.current.togglePanel()
                }
            })
            .catch((error) => {
                setAccepting(false);
                console.log('complete response', response)
                console.log('complete error', error)
            });
    }

    //decline request 
    const declineRequest = async () => {
        setAccepting(true);
        const response = await fetch(endpoints.baseUrl + endpoints.declineRide + `/${notification.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
            },
            body: JSON.stringify({}),
        });
        response.json()
            .then((data) => {
                console.log('decline response', response)
                console.log('decline request', data)
                if (response.ok) {
                    setAccepting(false);
                    setHelpCoordinate(null);
                    setAlert(null);
                    setAccepted(false);
                    setArrived(false);
                    setDelivered(false);
                    setAddComment(false);
                    ding.stop();
                } else {
                    setAccepting(false);
                }
            })
            .catch((error) => {
                setAccepting(false);
                console.log('decline error', error)
            });
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
        if (autoPosition && !helpCoordinates || autoPosition && accepted) {
            this.mapView.setCamera({
                center: {
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                },
                pitch: accepted ? 50 : 0,
                heading: e.nativeEvent.coordinate?.heading,
                altitude: e.nativeEvent.coordinate?.altitude,
                zoom: accepted ? 60 : 17,
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

        if (requestLocationPermission() && user?.verified) {
            setTimeout(() => {
                setHelpCoordinate({
                    latitude: 5.0789,
                    longitude: 7.7918,
                })
                panelRef.current.togglePanel()
            }, 5000);
            // setTimeout(() => {
            //     setAccepted(true)
            // }, 10000);
        }
    }, [])

    useEffect(() => {
        if (helpCoordinates) {
            playPause();
        }
        if (accepted) {
            ding.stop();
        }
    }, [helpCoordinates, accepted])

    useEffect(() => {
        ding.setVolume(1);
        return () => {
            ding.release();
        };
    }, []);

    useEffect(() => {
        getRequests();
    }, [notification])

    // Subscribe to network state updates
    useEffect(() => {
        NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            updateUserStatus(state.isConnected && forceOnline);
        });
    }, [forceOnline])

    //update user location every 30 seconds
    useEffect(() => {
        if (variableUser?.data?.is_online == 1
            && (coordinate.latitude - variableUser?.data?.latitude > 0.0001
                || coordinate.longitude - variableUser?.data?.longitude > 0.0001)
        ) {
            setInterval(() => {
                updateUserInfo();
            }, 30000);
        }
    }, [online])

    useEffect(() => {
        if (variableUser != {}) {
            // console.log('variableUser', variableUser)
            setOnline(variableUser?.data?.is_online == 1 && variableUser?.data?.latitude != 0);
        }
    }, [variableUser])

    let ratings = []
    for (let i = 0; i < 5; i++) {
        ratings.push(
            <TouchableOpacity key={i}
                onPress={() => { setRating(i + 1) }}
                style={{
                    marginHorizontal: 4,
                }}>
                {/* <StarLgIcon fill={rating > i ? colors.primary : colors.inactiveBt} /> */}
            </TouchableOpacity>
        )
    }

    //check if ready
    // const ready = variableUser?.data?.longitude != 0 && variableUser?.data?.is_online == 1;
    return (

        <View style={[styles.container, {}]}>
            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: colors.white,
                zIndex: 1,
                elevation: 5,
                margin: 20,
                position: 'absolute',
                width: width - 40,
                borderRadius: 8,
            }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    {/* <MenuIcon /> */}
                </TouchableOpacity>

                <Text style={{
                    color: colors.textDark,
                    fontSize: 16,
                    marginHorizontal: 10,
                    fontFamily: "Inter-Medium",
                }}>{online ? 'Online' : 'offline'}</Text>
                <TouchableOpacity
                    onPress={() => {
                        if (user.verified) {
                            setForceOnline(!forceOnline)
                        } else {
                            setMessageTrigger(true)
                        }
                    }}
                    style={{
                        width: 42,
                        height: 20,
                        alignItems: "center",
                        elevation: 5,
                        backgroundColor: online ? colors.primary : colors.inactiveBt,
                        borderRadius: 30,
                        padding: 1
                    }}>
                    <View style={{
                        height: '100%',
                        width: 18,
                        borderRadius: 19,
                        backgroundColor: colors.white,
                        alignSelf: !online ? "flex-start" : "flex-end",
                    }} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                onPress={() => {
                    this.mapView.animateToRegion({
                        latitude: coordinate.latitude,
                        longitude: coordinate.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    });
                }}
                style={{
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: colors.white,
                    zIndex: 1,
                    elevation: 5,
                    position: 'absolute',
                    width: 50,
                    height: 50,
                    borderRadius: 25,
                    right: 20,
                    bottom: 100,
                }}>
                {/* <LocateIcon /> */}
            </TouchableOpacity>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapView}
                onPress={onMapPress}
                ref={c => this.mapView = c}
                showsMyLocationButton={false}
                showsUserLocation={true}
                showsTraffic={true}
                showsBuildings={true}
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
                onUserLocationChange={updateMyLocation}
                showsCompass={false}
                // showsIndoors={true}
                // showsIndoorLevelPicker={true}
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
                {(helpCoordinates) &&
                    <Marker
                        coordinate={helpCoordinates}
                        title={"Pickup"}
                        description={"Pickup at this location"}
                        pinColor={colors.primary}

                    />
                }


                {helpCoordinates == null && <Circle
                    key={(myLocation.latitude + myLocation.longitude).toString()}
                    center={coordinate}
                    radius={200}
                    strokeWidth={1}
                    strokeColor={colors.aliceBlue}
                    fillColor={'rgba(205,205,205,0.5)'}
                // onRegionChangeComplete = { this.onRegionChangeComplete.bind(this) }
                />}
                {(helpCoordinates) && (

                    <MapViewDirections
                        origin={{
                            latitude: coordinate.latitude,
                            longitude: coordinate.longitude,
                        }}
                        destination={helpCoordinates}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={4}
                        strokeColor={colors.primary}
                        timePrecision="now"
                        optimizeWaypoints={true}
                        waypoints={waypoints}
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
                            // console.log('GOT AN ERROR');
                        }}
                    />)}
                {/* <Marker coordinate={coordinates[0]} />
                    <Marker coordinate={coordinates[1]} /> */}
            </MapView>
       
            <BottomSheet isOpen={helpCoordinates != null}
                wrapperStyle={{
                    marginHorizontal: 10,
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                    elevation: 10,
                }}
                outerContentStyle={{
                    borderRadius: 8,
                }}
                sliderMinHeight={helpCoordinates ? 50 : 0}
                ref={ref => panelRef.current = ref}>
                {/* <View>
                    {
                        (!accepted || arrived && !delivered) &&
                        <View style={{
                            marginBottom: 20,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    borderRadius: 5,
                                    backgroundColor: colors.inactive,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: 31,
                                    height: 31,
                                }}>
                                    <PickupIcon />
                                </View>
                                <View style={{
                                    marginLeft: 20,
                                }}>
                                    <Text style={{
                                        fontSize: 12,
                                        fontFamily: 'Inter-Regular',
                                        color: colors.textLight,
                                    }}>Pickup point</Text>
                                    <Text style={{
                                        fontSize: 18,
                                        fontFamily: 'Inter-Medium',
                                        color: colors.textHash,
                                        width: width - 100,
                                    }}>{alert?.start_address}</Text>
                                </View>
                            </View>
                            {
                                accepted && <View style={{
                                    height: 20,
                                    borderStartWidth: 2,
                                    borderStartColor: colors.primary,
                                    borderStyle: 'dotted',
                                    marginStart: 14,
                                }} />
                            }
                            {
                                accepted && <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={{
                                        borderRadius: 5,
                                        backgroundColor: colors.inactive,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: 31,
                                        height: 31,
                                    }}>
                                        <DropOffIcon />
                                    </View>
                                    <View style={{
                                        marginLeft: 20,
                                    }}>
                                        <Text style={{
                                            fontSize: 12,
                                            fontFamily: 'Inter-Regular',
                                            color: colors.textLight,
                                        }}>Pickout point</Text>
                                        <Text style={{
                                            fontSize: 18,
                                            fontFamily: 'Inter-Medium',
                                            color: colors.textHash,
                                            width: width - 100,
                                        }}>{alert?.end_address}</Text>
                                    </View>
                                </View>
                            }
                        </View>
                    }
                    {(!arrived || delivered) &&
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={alert?.rider_profile_image
                                        ? { uri: alert?.rider_profile_image }
                                        : require('../../../assets/images/profile.png')
                                    }
                                    style={{
                                        width: 57,
                                        height: 57,
                                        resizeMode: "contain",
                                        borderRadius: 40,
                                    }}

                                />
                                <View style={{
                                    marginLeft: 10,
                                }}>
                                    <Text style={{
                                        color: colors.textHash,
                                        fontSize: 18,
                                        fontFamily: 'Inter-Medium',

                                    }}>{alert?.rider_name}</Text>
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                    }}>
                                        <StarIcon />
                                        <Text style={{
                                            color: colors.textHash,
                                            fontSize: 14,
                                            fontFamily: 'Inter-Medium',
                                            marginLeft: 5,
                                        }}>4.8</Text>
                                    </View>
                                </View>
                            </View>
                            {!delivered &&
                                <View style={{
                                    alignItems: 'space-between',
                                }}>
                                    <Text style={{
                                        color: colors.textHash,
                                        fontSize: 18,
                                        fontFamily: 'Inter-Medium',
                                    }}>₦{alert?.distance_charge}</Text>
                                    <Text style={{
                                        fontFamily: 'Inter-Regular',
                                        fontSize: 12,
                                        color: colors.textHash,
                                    }}>{distance}km</Text>
                                </View>}
                        </View>
                    }
                    {
                        delivered &&
                        <View style={{
                            paddingTop: 10,
                            alignItems: 'center',
                        }}>
                            {!addComment && <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                {ratings}
                            </View>}
                            {
                                (rating > 0 && !addComment) &&
                                <TouchableOpacity onPress={() => { setAddComment(true) }}>
                                    <Text style={{
                                        color: colors.textHash,
                                        fontSize: 12,
                                        fontFamily: 'Inter-Medium',
                                        marginTop: 10,
                                    }}>Add comment</Text>
                                </TouchableOpacity>
                            }
                            {
                                addComment &&
                                <View style={{
                                    backgroundColor: colors.white,
                                    borderRadius: 8,
                                    height: 70,
                                    width: '100%',
                                    borderColor: colors.inactiveBt,
                                    borderWidth: 1,
                                }}>
                                    <TextInput
                                        value={comment}
                                        onChangeText={(text) => setComment(text)}
                                        placeholder="Add comment"
                                        placeholderTextColor={colors.textLight}
                                        multiline
                                        cursorColor={colors.primary}
                                        style={{
                                            flex: 1,
                                            flexGrow: 1,
                                            padding: 10,
                                            fontSize: 14,
                                            fontFamily: 'Inter-Regular',
                                            color: colors.textHash,
                                        }} />
                                </View>
                            }
                        </View>
                    }

                    {
                        (accepted && !arrived) &&
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: 10,
                            justifyContent: 'space-between',
                            paddingHorizontal: 10,
                        }}>
                            <TouchableOpacity style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <CallIcon />
                                <Text style={{
                                    color: colors.textHash,
                                    fontSize: 14,
                                    fontFamily: 'Inter-SemiBold',
                                    marginLeft: 5,
                                }}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate(mainRouts.chat)}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <ChatIcon />
                                <Text style={{
                                    color: colors.textHash,
                                    fontSize: 14,
                                    fontFamily: 'Inter-SemiBold',
                                    marginLeft: 5,
                                }}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => declineRequest()}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <CancelIcon />
                                <Text style={{
                                    color: colors.textHash,
                                    fontSize: 14,
                                    fontFamily: 'Inter-SemiBold',
                                    marginLeft: 5,
                                }}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    }
                    <View style={{
                        marginVertical: 20,
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        {
                            !accepted &&
                            <Button title={'Decline'}
                                onPress={() => declineRequest()}
                                buttonStyle={{
                                    borderRadius: 8,
                                    height: 55,
                                    width: '48%',
                                    bordercolor: colors.black,
                                    borderWidth: 1,
                                }}
                                textColor={colors.textHash}
                                buttonColor={'transparent'}
                                loading={accepting}
                                enabled={!accepting}
                            />
                        }
                        <Button title={accepted ? arrived ? delivered ? 'Submit' : 'Confirm delivery' : 'Arrived' : 'Accept'}
                            onPress={() => {
                                if (!accepted) {
                                    acceptRequest()
                                }
                                accepted && arrivedRequest();
                                arrived && completeRequest();
                            }}
                            buttonStyle={{
                                borderRadius: 8,
                                height: 55,
                                width: accepted ? '100%' : '48%',
                            }}
                            loading={accepting}
                            enabled={!accepting}

                        />
                    </View>
                </View> */}
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