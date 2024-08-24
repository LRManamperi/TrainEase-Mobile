import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";

export default function ElevatedButton({ text, handlerFunc }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlerFunc} style={styles.btn}>
        <Text style={styles.btnText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "black",
    paddingVertical: 17,
    paddingHorizontal: 32,
    borderRadius: 10,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});