import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { useRouter, useSegments } from "expo-router";
import { Stack } from "expo-router/stack";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();
  const router = useRouter();
  const segments = useSegments();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("onAuthStateChanged", user);
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === "(tabs)";

    if (user && !inAuthGroup) {
      router.replace("/(tabs)/home");
    } else if (!user && inAuthGroup) {
      router.replace("/");
    }
  }, [user, initializing]);

  if (initializing)
    return (
      <View>
        <ActivityIndicator />
      </View>
    );

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: true }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
