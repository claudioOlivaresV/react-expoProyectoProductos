import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // 🔐 Borrar token seguro
      await SecureStore.deleteItemAsync("accessToken");

      // Redirigir al login
      router.replace("/");
    } catch (error) {
      console.log("Error cerrando sesión:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home 🎉</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} />
      <Button
        title="Ir a Categorías"
        onPress={() => router.push("/categorias/categoria")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F3FF",
  },
  title: { fontSize: 24, marginBottom: 20 },
});
