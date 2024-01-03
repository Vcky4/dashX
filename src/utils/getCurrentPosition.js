import React, {useEffect, useState, useContext, useRef} from 'react';
import {

  Platform,
  PermissionsAndroid,
  
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

async function requestLocationPermission() {
  if (Platform.OS === 'ios') {
    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
    });

    Geolocation.requestAuthorization();
    // IOS permission request does not offer a callback :/
    return null;
  } else if (Platform.OS === 'android') {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err.message);
      return false;
    }
  }
}

async function getCurrentPosition(callback) {
  const hasLocationPermission = await requestLocationPermission();
  /* This will only be fired on Android. On Apple we can not detect when/if a
   * location permission has been granted or denied. For that reason after a
   * predefined period we just timeout.
   */

  if (hasLocationPermission === false) {
    callback({
      locationAvailable: false,
      error: 'Can not obtain location permission',
    });
    return;
  }

  Geolocation.getCurrentPosition(
    position => {
      callback({
        locationAvailable: true,
        position,
      });
    },
    error => {
      callback({
        locationAvailable: false,
        error: error.message,
        errorCode: error.code,
      });
    },
    {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000},
  );
}

export default getCurrentPosition;
