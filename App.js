import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, ActivityIndicator, View } from "react-native";
import * as location from "expo-location";
import axios from "axios";
//Screens
import WeatherInfo from "./screens/WeatherInfo";
import WeatherDetails from "./screens/WeatherDetails";
import UnitPicker from "./screens/UnitPicker";
import ReloadIcon from "./screens/ReloadIcon";
//colors
import { colors } from "./utils";
const { PRIMARY_COLOR } = colors;
const WEATHER_API_KEY = "c1ec4b3d3d0b5c84b823387b63942189";
const BASE_WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather?";
export default function App() {
  const [currentWeather, setCurrentWeather] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [unitSystem, setUnitSystem] = useState("metric");
  const load = async () => {
    setCurrentWeather();
    setErrorMessage();
    try {
      let { status } = await location.requestBackgroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMessage("Access to loaction is a must");
        return;
      }
      const loc = await location.getCurrentPositionAsync();
      const { latitude, longitude } = loc.coords;
      const weatherUrl = `${BASE_WEATHER_URL}lat=${latitude}&units=${unitSystem}&lon=${longitude}&appid=${WEATHER_API_KEY}`;
      const response = await axios.get(weatherUrl);
      const data = response.data;
      if (response.status === 200) {
        setCurrentWeather(data);
      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };
  useEffect(() => {
    load();
  }, [unitSystem]);
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <UnitPicker setUnitSystem={setUnitSystem} unitSystem={unitSystem} />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          unitSystem={unitSystem}
          currentWeather={currentWeather}
        />
      </View>
    );
  } else if (errorMessage) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />

        <Text style={{ ...styles.text, textAlign: "center" }}>
          {errorMessage}
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={PRIMARY_COLOR} size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(22,30,30)",
  },
  text: {
    color: "#fff",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
});
