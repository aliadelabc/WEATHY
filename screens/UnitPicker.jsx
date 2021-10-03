import React from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";

const UnitPicker = ({ unitSystem, setUnitSystem }) => {
  return (
    <View style={styles.unitSystem}>
      <Text style={{ color: "#fff" }}>Choose Unit </Text>
      <Picker
        selectedValue={unitSystem}
        onValueChange={(value) => setUnitSystem(value)}
        mode="dropdown"
        style={{ color: "#fff" }}
        dropdownIconRippleColor="#fff"
        dropdownIconColor="#fff"
        itemStyle={{ fontSize: 12 }}
      >
        <Picker.Item label="°C" value="metric" />
        <Picker.Item label="°F" value="imperial" />
      </Picker>
    </View>
  );
};
export default UnitPicker;
const styles = StyleSheet.create({
  unitSystem: {
    justifyContent: "center",
    position: "absolute",
    ...Platform.select({
      ios: {
        top: -10,
      },
      android: {
        top: 10,
      },
    }),
    left: 20,
    height: 50,
    width: 100,
  },
});
