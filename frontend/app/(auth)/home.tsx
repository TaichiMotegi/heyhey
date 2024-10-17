import { View, Button } from "react-native";
import auth from "@react-native-firebase/auth";

const home = () => {
  return (
    <View>
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
};

export default home;
