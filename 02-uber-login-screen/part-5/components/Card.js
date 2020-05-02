import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  Easing,
} from "react-native";
const { width } = Dimensions.get("window");
import { LinearGradient } from "expo-linear-gradient";
import PropTypes from "prop-types";

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

const SkeletonComp = ({ height, width, style, children }) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear.inOut,
        useNativeDriver: true,
      }),
    ).start();
  });

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View
      style={{
        // height: height,
        // width: width,
        // flex: 1,
        backgroundColor: "#cecece",
        overflow: "hidden",
        height: height,
        width: width,
        ...style,
      }}
    >
      <AnimatedLG
        colors={["#cecece", "#e1e1e1", "#e1e1e1", "#cecece"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          flex: 1,
          transform: [{ translateX: translateX }],
        }}
      />
      {children}
    </View>
  );
};
export default SkeletonComp;

SkeletonComp.propTypes = {
  style: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
};

SkeletonComp.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
