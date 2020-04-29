import React, { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import Logo from "./components/Logo";
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
} from "react-native-reanimated";
import { withTimingTransition } from "react-native-redash";
import { SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT } from "./Constants";
export default function App() {
  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current);

  // const translateY = interpolate(scaleAnimation, {
  //   inputRange: [0, 1],
  //   outputRange: [SCREEN_HEIGHT, SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT],
  // });

  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });

  useCode(() => cond(eq(scale.current, 0), set(scale.current, 1)), []);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.logoContainer }}>
        <Logo scale={scaleAnimation} />
      </View>
      <Animated.View
        style={{
          backgroundColor: "white",
          ...StyleSheet.absoluteFill,
          transform: [{ translateY: SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT }],
        }}
      >
        <Animated.View
          style={{
            height: LOGIN_VIEW_HEIGHT,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#2289d6",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            borderWidth: 1,
          }}
        >
          <Text>Overlay Bg</Text>
        </Animated.View>
        <Animated.View>
          <Animated.View
            style={{
              height: LOGIN_VIEW_HEIGHT,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
              borderWidth: 1,
              transform: [{ translateY: innerLoginY }],
            }}
          >
            <Text>Login View</Text>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2289d6",
  },
  logoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
