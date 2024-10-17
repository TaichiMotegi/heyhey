import React, { useState } from "react";
import { View, TextInput, Text, Pressable } from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    console.log("Submitted:", { name, email });
    // ここでフォームデータを処理します（例：APIに送信するなど）
  };

  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <StatusBar style="auto" />
      <View className="w-full max-w-sm">
        <Text className="text-2xl font-bold mb-6 text-center">アヒル</Text>
        <Pressable
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onPress={handleSubmit}
        >
          <Text className="text-center text-white font-bold">
            プロフィールを編集
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
