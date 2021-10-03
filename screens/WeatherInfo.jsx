import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "../utils/index";
const { PRIMARY_COLOR, SECONADRY_COLOR } = colors;

const WeatherInfo = ({ currentWeather }) => {
  const {
    main: { temp },
    weather: [details],
    name,
  } = currentWeather;
  const { icon, description, main } = details;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;
  return (
    <View style={styles.weatherInfo}>
      <Text style={styles.header}>{name}</Text>
      <Image style={styles.weatherIcon} source={{ uri: iconUrl }} />
      <Text style={styles.textPrimary}>{temp}°</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.textSecondary}>{main}</Text>
    </View>
  );
};
export default WeatherInfo;

const styles = StyleSheet.create({
  weatherInfo: {
    alignItems: "center",
    flex: 0.5,
  },
  weatherIcon: {
    width: 100,
    height: 100,
  },
  textPrimary: {
    fontSize: 48,
    color: PRIMARY_COLOR,
  },
  textSecondary: {
    fontSize: 20,
    color: SECONADRY_COLOR,
    fontWeight: "500",
    marginTop: 10,
  },
  header: {
    color: "#fff",
    fontSize: 15,
  },
  description: {
    textTransform: "capitalize",
    color: "#fff",
  },
});
