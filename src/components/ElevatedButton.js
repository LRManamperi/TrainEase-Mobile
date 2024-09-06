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
    paddingVertical: 5,
    paddingHorizontal: 140,
    borderRadius: 10, 
    marginTop: 10,
    paddingBottom: 10
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontSize: 18,
  },
});