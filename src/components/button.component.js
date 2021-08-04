import React from "react";
import { Button } from "react-native-elements";

const ButtonApp = ({ onPress = () => {}, title = "SUBMIT" }) => (
  <Button
    title={title}
    onPress={onPress}
    buttonStyle={{
      paddingVertical: 10,
      backgroundColor: "red",
    }}
    containerStyle={{
      width: "100%",
      paddingHorizontal: 10,
    }}
  />
);

export default ButtonApp;
