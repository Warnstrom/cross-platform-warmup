import { TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export const EditButton = ({  submit }) => (
  <TouchableOpacity onPress={submit}>
    <Icon name="edit" size={25} color="#455A64" />
  </TouchableOpacity>
);
