import {
  CameraView,
  useCameraPermissions,
  BarcodeScanningResult,
} from "expo-camera";
import QRCode from "react-native-qrcode-svg";
import { Button, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View className="flex-1 justify-center">
        <Text className="text-center mb-2">
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = ({ type, data }: BarcodeScanningResult) => {
    console.log("Type: " + type + "\nData: " + data);
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text className="text-lg font-bold mb-4">QRコード</Text>
        <QRCode value="アヒル" size={200} />
      </View>
      <CameraView
        onBarcodeScanned={handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        className="w-full h-2/5"
        facing="front"
      />
    </SafeAreaView>
  );
}
