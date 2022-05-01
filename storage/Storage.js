import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveCountables = async (countables) => {
  const jsonCountables = JSON.stringify(countables);
  try {
    await AsyncStorage.setItem("countables", jsonCountables);
  } catch (error) {
    console.error(error);
  }
};

export const loadCountables = async () => {
  AsyncStorage.clear();
  const result = await AsyncStorage.getItem("countables");
  if (result) {
    return JSON.parse(result);
  } else {
    return [];
  }
};
