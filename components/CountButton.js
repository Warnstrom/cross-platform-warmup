import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const CountButton = ({ text, submit }) => (
  <TouchableOpacity style={styles.button} onPress={submit}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    paddingTop: 16,
    paddingBottom: 16,
    paddingStart: 26,
    paddingEnd: 26,
    borderRadius: 8,
    backgroundColor: "#3F51B5",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
  }
});
