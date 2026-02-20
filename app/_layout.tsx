import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { useFonts } from "expo-font";
import { Slot, usePathname, useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { StyleSheet, View } from "react-native";
import {
  Appbar,
  MD3LightTheme,
  Provider as PaperProvider,
} from "react-native-paper";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  const router = useRouter();
  const pathname = usePathname();

  if (!fontsLoaded) return <View />;

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("accessToken");
      router.replace("/"); // ir al login
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }
  };

  // 🔹 Ocultar header en login
  const hideHeader = pathname === "/";

  return (
    <PaperProvider theme={MD3LightTheme}>
      <View style={styles.container}>
        {!hideHeader && (
          <Appbar.Header>
            {pathname !== "/home" && (
              <Appbar.BackAction onPress={() => router.back()} />
            )}
            <Appbar.Content title="Tienda" />

            <Appbar.Action icon="logout" onPress={handleLogout} />
          </Appbar.Header>
        )}

        {/* Aquí se renderiza la pantalla actual */}
        <View style={styles.content}>
          <Slot />
        </View>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
});
