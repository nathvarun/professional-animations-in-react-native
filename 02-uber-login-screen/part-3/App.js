import React, { useRef } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Logo from "./components/Logo";
import Animated, {
  useCode,
  cond,
  eq,
  set,
  interpolate,
} from "react-native-reanimated";
import {
  withTimingTransition,
  onGestureEvent,
  withSpringTransition,
} from "react-native-redash";
import { SCREEN_HEIGHT, LOGIN_VIEW_HEIGHT } from "./Constants";
import {
  TextInput,
  TapGestureHandler,
  State,
} from "react-native-gesture-handler";
export default function App() {
  const scale = useRef(new Animated.Value(0));
  const scaleAnimation = withTimingTransition(scale.current);

  const innerLoginY = interpolate(scaleAnimation, {
    inputRange: [0, 1],
    outputRange: [LOGIN_VIEW_HEIGHT, 0],
  });

  const gestureState = useRef(new Animated.Value(State.UNDETERMINED));
  const gestureHandler = onGestureEvent({ state: gestureState.current });

  const isOpen = useRef(new Animated.Value(0));
  const isOpenAnimation = withSpringTransition(isOpen.current);

  const outerLoginY = interpolate(isOpenAnimation, {
    inputRange: [0, 1],
    outputRange: [SCREEN_HEIGHT - LOGIN_VIEW_HEIGHT, 0],
  });

  useCode(() =>
    cond(eq(gestureState.current, State.END), [
      cond(eq(isOpen.current, 0), set(isOpen.current, 1)),
    ]),
  );
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
          transform: [{ translateY: outerLoginY }],
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

              backgroundColor: "white",
              borderWidth: 1,
              transform: [{ translateY: innerLoginY }],
            }}
          >
            <Animated.View style={{ ...styles.heading }}>
              <Text style={{ fontSize: 24 }}>Get moving with Uber</Text>
            </Animated.View>

            <TapGestureHandler {...gestureHandler}>
              <Animated.View>
                <Animated.View
                  pointerEvents="none"
                  style={{ ...styles.textInputContainer }}
                >
                  <Image
                    source={require("./assets/india.png")}
                    style={{ ...styles.image }}
                  />
                  <Text style={{ ...styles.prefix }}>+91</Text>
                  <TextInput
                    keyboardType="number-pad"
                    style={{ ...styles.textInput }}
                    placeholder="Enter your mobile number"
                  />
                </Animated.View>
              </Animated.View>
            </TapGestureHandler>
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
  heading: {
    alignItems: "flex-start",
    marginHorizontal: 25,
    marginTop: 50,
  },
  image: {
    height: 24,
    width: 24,
    resizeMode: "contain",
  },
  prefix: {
    fontSize: 20,
    paddingHorizontal: 10,
  },
  textInput: {
    flex: 1,
    fontSize: 20,
  },
  textInputContainer: {
    flexDirection: "row",
    margin: 25,
  },
});
