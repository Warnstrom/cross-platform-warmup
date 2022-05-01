import { useState, createRef } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { toast } from "../Utils/helpers";
import Icon from "react-native-vector-icons/FontAwesome";

export const AddRow = ({ addNewCountable }) => {
  const [name, setName] = useState("");
  const myTextInput = createRef();
  // Apparently clearButtonMode="always" is needed for iOS to clear the TextInput field
  return (
    <View style={styles.input}>
      <TextInput ref={myTextInput} clearButtonMode="always" style={styles.inputText} placeholder="Enter name" onChangeText={setName} />
      <TouchableOpacity
        style={styles.addIcon}
        onPress={() => {
          Keyboard.dismiss();
          if (name.length != 0) {
            addNewCountable(name);
            myTextInput.current.clear();
          } else {
            toast("You need to write something first");
          }
        }}
      >
        <Icon name="angle-right" size={25} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addIcon: {
    padding: 16,
    paddingEnd: 25,
    paddingStart: 25,
    backgroundColor: "#3F51B5",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#3F51B5",
    borderWidth: 3,
    borderRadius: 10,
    paddingStart: 15,
    margin: 16,
  },
  inputText: {
    fontSize: 16,
    paddingEnd: 200,
    fontWeight: "bold",
  },
});
