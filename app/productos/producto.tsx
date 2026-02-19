// app/home/categorias/producto.tsx
import { StyleSheet, Text, View } from "react-native";

export default function Producto() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalle del Producto</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24 },
});
