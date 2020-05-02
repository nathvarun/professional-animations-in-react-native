import React from "react";
import Animated from "react-native-reanimated";
import { View, Text, StyleSheet } from "react-native";

const Logo = ({ scale }) => (
  <Animated.View style={{ ...styles.logo, transform: [{ scale }] }}>
    <Text style={{ fontWeight: "400", fontSize: 36 }}>Uber</Text>
  </Animated.View>
);
export default Logo;

const styles = StyleSheet.create({
  logo: {
    backgroundColor: "white",
    height: 120,
    width: 120,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
