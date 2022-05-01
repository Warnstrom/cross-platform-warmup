import { TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export const DeleteButton = ({ submit }) => (
  <TouchableOpacity onPress={submit}>
    <Icon name="trash" size={25} color="#C62828" />
  </TouchableOpacity>
);
