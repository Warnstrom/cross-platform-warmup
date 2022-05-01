import { ToastAndroid, Platform, AlertIOS } from "react-native";

export const toast = (toastAnnouncement) => {
    if (Platform.OS === "android") {
        ToastAndroid.show(toastAnnouncement, ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(toastAnnouncement);
      }
}
