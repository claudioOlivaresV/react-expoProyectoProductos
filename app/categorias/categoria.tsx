// app/home/categorias/index.tsx
import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Categorias() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categorías</Text>
      <Button
        title="Ir a Producto"
        onPress={() => router.push("/productos/producto")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
