import { useRouter } from "expo-router";
import { Button, StyleSheet, Text, View } from "react-native";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home 🎉</Text>
      <Button title="Cerrar sesión" onPress={() => router.replace("/")} />
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
