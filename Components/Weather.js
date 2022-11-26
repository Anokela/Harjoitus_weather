import { Image, Text, StyleSheet } from 'react-native'
import React, {useState, useEffect} from 'react'

const API_URL = 'http://api.openweathermap.org/data/2.5/weather?'
const API_KEY = 'f6e0ce64cde2222e996a2d7cd024cff3';
const ICON_URL = 'http://openweathermap.org/img/wn/';

export default function Weather(props) {
  const [temp, setTemp] = useState(0);
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('');
  const [location, setLocation] = useState('');
  const [wind, setWind] = useState('');
  const [direction, setDirection] = useState('');

  useEffect(() => {
    const url = API_URL +
      'lat=' + props.latitude + 
      '&lon=' + props.longitude + 
      '&units=metric' + 
      '&appid=' + API_KEY;
    fetch(url)
      .then(res => res.json())
      .then(
        (result) => {
          setTemp(result.main.temp);
          setDescription(result.weather[0].description);
          setLocation(result.name);
          setWind(result.wind.speed)
          setDirection(result.wind.deg)
          setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
        },
        (error) => {
          alert(error);
        }
      )
  }, [])
  
  return (
    <>
      <Text style={styles.label}>Town</Text>
      <Text>{location}</Text>
      <Text style={styles.label}>Temperature</Text>
      <Text>{temp.toFixed(0)}</Text>
      <Text style={styles.label}>Wind</Text>
      <Text>{wind} m/s</Text>
      <Text style={styles.label}>Direction</Text>
      <Text>{direction} degrees</Text>
      <Text style={styles.label}>Description</Text>
      <Text>{description}</Text>
      <Image source={{uri: icon === '' ? 'placeholder' : icon}} style={{width: 100, height: 100}}></Image>
    </>
  )
}

const styles = StyleSheet.create({
  label: {
    fontWeight: 'bold',
    marginTop: 10,
  },
});