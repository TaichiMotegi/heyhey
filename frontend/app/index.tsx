import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { FirebaseError } from "firebase/app";
import { ActivityIndicator, Button, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      alert("check your email");
    } catch (e: any) {
      const err = e as FirebaseError;
      alert("registration failed:" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center px-6">
        <View className="w-full max-w-sm bg-white rounded-2xl p-6 shadow-lg">
          <TextInput
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email"
            className="w-full h-12 px-4 mb-4 border border-gray-300 rounded-lg text-base"
          />

          <TextInput
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            keyboardType="email-address"
            placeholder="Password"
            className="w-full h-12 px-4 mb-6 border border-gray-300 rounded-lg text-base"
          />

          {loading ? (
            <ActivityIndicator size="small" className="py-3" />
          ) : (
            <View className="space-y-3">
              <View className="bg-blue-500 rounded-lg">
                <Button onPress={signIn} title="Login" color="white" />
              </View>

              <View className="bg-gray-100 rounded-lg">
                <Button
                  onPress={signUp}
                  title="Create account"
                  color="#374151"
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}
