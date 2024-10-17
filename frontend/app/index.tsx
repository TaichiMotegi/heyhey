import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";

export default function Index() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      alert("check your email");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("registration failed:" + err.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = () => {};

  return (
    <View>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholder="Email"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          keyboardType="email-address"
          placeholder="Password"
        />
        {loading ? (
          <ActivityIndicator size={"small"} />
        ) : (
          <>
            <Button onPress={signUp} title="Sign Up" />
            <Button onPress={signIn} title="Sign In" />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
}
