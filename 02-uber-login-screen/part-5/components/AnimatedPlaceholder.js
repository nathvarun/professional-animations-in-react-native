import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, { interpolate } from "react-native-reanimated";

const AnimatedPlaceholder = ({ isOpenAnimation }) => {
  const translateX = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [80, 0],
  });

  const translateY = interpolate(isOpenAnimation, {
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0, -60],
  });

  const opacity = interpolate(translateY, {
    inputRange: [-60, 0],
    outputRange: [1, 0],
  });

  return (
    <Animated.Text
      style={{
        ...styles.placeholder,
        transform: [
          {
            translateY,
            translateX,
          },
        ],
        opacity,
      }}
    >
      Enter your mobile Number
    </Animated.Text>
  );
};
export default AnimatedPlaceholder;

const styles = StyleSheet.create({
  placeholder: {
    fontSize: 24,
    position: "absolute",
  },
});
