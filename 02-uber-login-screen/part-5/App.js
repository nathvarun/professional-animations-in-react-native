import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from "react-native";
import { AppLoading } from "expo";
// import Card from "./components/Card";
import SkeletonComp from "./components/Card";

const { width } = Dimensions.get("window");
export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let timer1 = setTimeout(() => setIsReady(true), 2000);
    return () => {
      clearTimeout(timer1);
    };
  }, []);

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ backgroundColor: "#5f5f5f" }} />
      {isReady ? (
        <View
          style={{ height: 200, width: width, backgroundColor: "grey" }}
        ></View>
      ) : (
        <SkeletonComp
          height={200}
          width={width}
          style={{ marginVertical: 20 }}
        ></SkeletonComp>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
