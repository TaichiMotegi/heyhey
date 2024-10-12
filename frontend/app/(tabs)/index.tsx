import QRCode from "react-native-qrcode-svg";
import React, { useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { CameraView, BarcodeScanningResult } from "expo-camera";

export default function Tab() {
  const [isCameraActive, setIsCameraActive] = useState(true);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    console.log("Type: " + type + "\nData: " + data);
    setScannedData(data);
    setIsCameraActive(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold mb-4">Let's HeyHey</Text>
        <QRCode
          logo={require("../../assets/images/HeyHey.png")}
          value="アヒル"
          size={200}
        />
      </View>
      {isCameraActive ? (
        <CameraView
          className="w-full h-1/2"
          facing="front"
          onBarcodeScanned={handleBarcodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />
      ) : (
        <View className="w-full h-1/2 bg-gray-200 items-center justify-center">
          <Text className="text-lg">スキャン完了: {scannedData}</Text>
        </View>
      )}
    </SafeAreaView>
  );
}
