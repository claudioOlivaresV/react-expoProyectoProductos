import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { View } from "react-native";
import { MD3LightTheme, Provider as PaperProvider } from "react-native-paper";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  if (!fontsLoaded) return <View />;

  return (
    <PaperProvider theme={MD3LightTheme}>
      <Stack screenOptions={{ headerShown: false }} />
    </PaperProvider>
  );
}
