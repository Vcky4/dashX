import React, { useEffect, useState, useContext, useRef } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, PermissionsAndroid, Platform, Dimensions, Linking } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';

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
    const [online, setOnline] = useState(false);
    const [updateCount, setUpdateCount] = useState(0);
    const [dispatchItem, setDispatchItem] = useState(null)
    const [coordinate, setCoordinates] = useState({
        latitude: 0,
        longitude: 0,
    });



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
                // setBottomStep(1)
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
                }}>Refresh</Text>

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
                <Image
                    source={user.photo.length > 0 ? { uri: user.photo } : require('../../../../assets/images/user.png')}
                    style={{
                        width: 40,
                        height: 40,
                        alignSelf: 'center',
                        resizeMode: 'cover',
                        borderRadius: 25,
                    }}
                />

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

                {(false) &&
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

                {(false) &&
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
                            // setDistance(result.distance);
                            // setDuration(result.duration);
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

            </MapView>
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