import React, { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import FirebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const auth = FirebaseAuth();

// Google サインインに必須
GoogleSignin.configure({
  // 自身の Web Client ID に置き換える
  webClientId:
    "344111805124-2m5u77r4sh7o1v8ibhb64frgpra1pb1g.apps.googleusercontent.com",
});

export default function SignInWithGoogle() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      if (auth.currentUser) {
        setEmail(auth.currentUser.email);
      }
    });

    return () => unsubscribe();
  }, []);

  const signIn = async () => {
    try {
      // Google のログイン画面を表示して認証情報を取得する
      const user = await GoogleSignin.signIn();

      // ID トークンを取得
      const { idToken } = await GoogleSignin.getTokens();

      if (!idToken) {
        console.log("Failed to get ID token");
        return;
      }

      // 取得した認証情報 (ID トークン) を元にサインインする
      const credential = FirebaseAuth.GoogleAuthProvider.credential(idToken);
      await auth.signInWithCredential(credential);
    } catch (error) {
      console.error("Sign-in error:", error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setEmail(null);
    } catch (error) {
      console.error("Sign-out error:", error);
    }
  };

  return (
    <View>
      {email ? (
        <>
          <Text>{`${email} でサインインしています`}</Text>
          <Pressable onPress={signOut}>
            <Text>サインアウト</Text>
          </Pressable>
        </>
      ) : (
        <Pressable onPress={signIn}>
          <Text>Google でサインイン</Text>
        </Pressable>
      )}
    </View>
  );
}
