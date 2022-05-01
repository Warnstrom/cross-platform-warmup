import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert, Keyboard } from "react-native";
import { createRef, useState } from "react";
import { toast } from "../Utils/helpers";
import Icon from "react-native-vector-icons/FontAwesome";

import { CommonStyles } from "../styles/CommonStyles";
import { DeleteButton } from "./DeleteButton";
import { EditButton } from "./EditButton";

export const CountableRow = ({ countable, changeCounts, removeCountable, changeCountableName, index }) => {
  const myTextInput = createRef();
  const [name, setName] = useState("");
  const [showChangeInput, setChangeInput] = useState(false);

  return (
    <View style={styles.itemRow}>
      <View style={styles.nameColumn}>
        <Text style={{ fontSize: 20, display: showChangeInput === false ? "flex" : "none" }}>{countable.name}</Text>
        <View style={{ flexDirection: "row", display: showChangeInput === true ? "flex" : "none" }}>
          <TextInput ref={myTextInput} clearButtonMode="always" style={styles.inputText} placeholder="Enter new title" onChangeText={setName} />
          <TouchableOpacity
            style={styles.changeTitleIcon}
            onPress={() => {
              if (name.length != 0) {
                changeCountableName(countable, name);
                myTextInput.current.clear();
                Keyboard.dismiss();
                setChangeInput(false);
              } else {
                toast("You need to write something before changing title")
              }
            }}
          >
            <Icon name="check" size={15} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={CommonStyles.textItem}>{countable.count}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.modifyRow}>
          <EditButton
            submit={() => {
              setChangeInput(true);
            }}
          />
          <DeleteButton
            submit={() => {
              Alert.alert("Are you sure you want to delete this?", "", [
                {
                  text: "No",
                  style: "cancel",
                },
                { text: "Yes", onPress: () => removeCountable(countable) },
              ]);
            }}
          />
        </View>
        <View style={styles.buttonColumn}>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => {
              changeCounts(1, index);
            }}
          >
            <Icon name="angle-up" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addIcon}
            onPress={() => {
              if (countable.count != 0) {
                changeCounts(-1, index);
              } else {
                toast("Can't decrease the value if it's 0");
              }
            }}
          >
            <Icon name="angle-down" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputText: {
    borderColor: "#3F51B5",
    borderWidth: 1,
    borderRadius: 10,
    paddingEnd: 10,
    paddingStart: 10,
    marginEnd: 10,
  },
  changeTitleIcon: {
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#3F51B5",
  },
  addIcon: {
    padding: 12,
    paddingStart: 14,
    paddingEnd: 14,
    borderRadius: 8,
    backgroundColor: "#3F51B5",
  },
  buttonColumn: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "column",
  },
  modifyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#3F51B5",
    borderWidth: 1,
    borderRadius: 10,
    margin: 12,
    padding: 20,
  },
});
