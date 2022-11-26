import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect} from 'react';
import * as Location from 'expo-location';
import Weather from './Weather';

export default function Position() {
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      (async () => {
        let {status} = await Location.requestForegroundPermissionsAsync();
        try {
          if (status !== 'granted') {
            return;
          }
          const location = await Location.getLastKnownPositionAsync({accuracy: 6});
          setLatitude(location.coords.latitude);
          setLongitude(location.coords.longitude);
          setIsLoading(false);
        } catch (error) {
          alert(error);
          setIsLoading(false);          
        }
      }) ();
    }, [])
    
    if (isLoading) {
      return <View style={styles.container}><Text>Loading...</Text></View>
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.label}>Your location:</Text>
          <Text>Latitude: {latitude.toFixed(3)} , Longitude: {longitude.toFixed(3)}</Text>
          <Weather latitude={latitude} longitude={longitude} />
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      fontWeight: 'bold',
      marginTop: 10,
    }
  });