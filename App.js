import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

export default function App() {
  const API_KEY = "b0da464d55a6b03e58104d6be70710cf";

  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);
  const [cityName, setCityName] = useState("");

  async function fetchWeatherData() {
    try {
      setLoaded(false);
      const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
      const response = await fetch(API);
      const jsonResponse = await response.json();
      if (jsonResponse.cod === 200) {
        setWeatherData(jsonResponse);
      } else {
        setWeatherData(null);
      }
      setLoaded(true);
    } catch (error) {
      console.error(error);
      setLoaded(true);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />
      {!loaded ? (
        <Text>Loading...</Text>
      ) : weatherData ? (
        <View>
          <Text>City: {weatherData.name}</Text>
          <Text>Temperature: {(weatherData.main.temp - 273.15).toFixed(2)}°C</Text>
          <Text>Weather: {weatherData.weather[0].description}</Text>
        </View>
      ) : (
        <Text>No data found</Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "80%",
  },
});