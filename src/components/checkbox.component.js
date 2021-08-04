import React from "react";
import { CheckBox } from "react-native-elements";

const CheckBoxApp = ({ 
    title = title ? title : '',
    checked = false,
    onPress = () => {}
 }) => (
  <CheckBox
    left
    title={title}
    checkedIcon="dot-circle-o"
    uncheckedIcon="circle-o"
    checkedColor={"red"}
    activeOpacity={0.9}
    checked={checked}
    onPress={onPress}
    textStyle={{
      fontSize: 17,
      fontWeight: "normal",
    }}
    containerStyle={{
      backgroundColor: "transparent",
      borderColor: "transparent",
      borderRadius: 0,
      margin: 0,
      paddingVertical: 5,
      paddingHorizontal: 0,
    }}
  />
);

export default CheckBoxApp;
