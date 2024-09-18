import { View, Text, StyleSheet } from "react-native";
import { TextInput, HelperText } from "react-native-paper";
import React, { useState } from "react";

export default function CustomInput({
  placeholder,
  onChange,
  secureTextEntry,
  label,
  isRequired,
  testID
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (text) => {
    setValue(text);
    onChange(text);
    if (isRequired && text === "") {
      setError(true);
    } else {
      setError(false);
    }
  };

  return (
    <View>
      <TextInput
        label={label}
        placeholderTextColor="black"
        style={styles.customInput}
        selectionColor="black"
        onChangeText={handleChange}
        mode="outlined"
        secureTextEntry={secureTextEntry}
        outlineColor={error ? "red" : "#C9D7DD"}
        activeOutlineColor={error ? "red" : "lightblue"}
        testID={testID}
      />
      {error && (
        <HelperText type="error" visible={error}>
          This field is required.
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  customInput: {
    backgroundColor: "#f4f6f6",
    marginHorizontal: 10,
    borderRadius: 15,
    marginBottom: 20,
    height: 50,
  },
});