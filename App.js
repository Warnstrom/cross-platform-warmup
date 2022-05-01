import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { StyleSheet, ScrollView, KeyboardAvoidingView, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { AddRow } from "./components/AddRow";
import { CountableRow } from "./components/CountableRow";
import { loadCountables, saveCountables } from "./storage/Storage";
import { toast } from "./Utils/helpers";

const intialCountables = [];

export default function App() {
  const [countables, setCountables] = useState(intialCountables);

  useEffect(() => {
    loadCountables().then((result) => setCountables(result));
  }, []);

  const changeCounts = (amount, index) => {
    const newState = [...countables];
    newState[index].count += amount;
    setCountables(newState);
    saveCountables(newState);
  };

  const changeCountableName = (oldName, newName) => {
    if (!countables.some((itemName) => itemName.name === newName)) {
      let object = countables.find((obj) => obj.name === oldName.name);
      object.name = newName;
      const newState = [...countables];
      newState.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setCountables(newState);
      saveCountables(newState);
    } else {
      toast("There's an item with the same existing name");
    }
  };

  const addNewCountable = (name) => {
    if (!countables.some((itemName) => itemName.name === name)) {
      const newState = [...countables, { name, count: 0 }];
      newState.sort((a, b) => {
        return a.name.localeCompare(b.name);
      });
      setCountables(newState);
      saveCountables(newState);
    } else {
      toast("There's an item with the same existing name");
    }
  };

  // The proper way would be to use removeItem() in AsyncStorage but this will have to work for now
  const removeCountable = (item) => {
    for (const index in countables) {
      if (countables[index].name === item.name) {
        countables.splice(index, 1);
      }
    }
    const newState = [...countables];
    setCountables(newState);
    saveCountables(newState);
  };

  // https://medium.com/@nickyang0501/keyboardavoidingview-not-working-properly-c413c0a200d4
  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: "center", display: countables.length === 0 ? "flex" : "none" }}>
          <Text style={styles.textBox}>No content to show.</Text>
        </View>
        <ScrollView>
          {countables.map((countable, index) => (
            <CountableRow
              countable={countable}
              key={countable.name}
              changeCounts={changeCounts}
              removeCountable={removeCountable}
              changeCountableName={changeCountableName}
              index={index}
            />
          ))}
          <View style={{ flex: 1 }} />
        </ScrollView>
        <AddRow addNewCountable={addNewCountable} />
        <StatusBar style="auto" />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  textBox: {
    marginTop: 100,
    fontSize: 25,
    color: "gray",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-end",
  },
});
