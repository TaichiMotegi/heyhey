import QRCode from "react-native-qrcode-svg";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Button } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Tab() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanned, setIsScanned] = useState(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    console.log("Type: " + type + "\nData: " + data);
    setScannedData(data);
    setIsScanned(true);
  };

  const handleButtonPressed = () => {
    setIsCameraActive(true);
    setIsScanned(false);
  };

  const handleCloseCamera = () => {
    setIsCameraActive(false);
    setIsScanned(false);
    setScannedData(null);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {isCameraActive ? (
        <>
          <View className="flex-1 items-center justify-center">
            <Text className="text-lg font-bold mb-4">Let's HeyHey</Text>
            <QRCode
              logo={require("../../assets/images/HeyHey.png")}
              value="アヒル"
              size={200}
            />
          </View>
          {!isScanned ? (
            <View className="w-full h-1/2 relative">
              <CameraView
                className="w-full h-full"
                facing="front"
                onBarcodeScanned={handleBarcodeScanned}
                barcodeScannerSettings={{
                  barcodeTypes: ["qr"],
                }}
              />
              <TouchableOpacity
                className="absolute bottom-4 left-28 right-28  bg-white py-1 rounded-full items-center"
                onPress={handleCloseCamera}
              >
                <Text className="text-blue-500 font-bold text-base">
                  閉じる
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View className="w-full h-1/2 bg-gray-200 items-center justify-center">
              <Text className="text-lg mb-4">スキャン完了: {scannedData}</Text>
              <Button
                onPress={() => setIsScanned(false)}
                title="再スキャン"
                color="#841584"
              />
            </View>
          )}
        </>
      ) : (
        <View className="flex-1 items-center justify-center">
          <TouchableOpacity onPress={handleButtonPressed}>
            <Text className="text-blue-500 font-bold text-4xl">
              Let's HeyHey
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
