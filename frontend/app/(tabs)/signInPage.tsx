import { View, Button } from "react-native";
import auth from "@react-native-firebase/auth";

const home = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Button title="Sign out" onPress={() => auth().signOut()} />
    </View>
  );
};

export default home;
