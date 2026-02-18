import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Loginnnnnnr
      </Text>

      <TextInput label="Email" mode="outlined" style={styles.input} />

      <TextInput
        label="Password"
        secureTextEntry
        mode="outlined"
        style={styles.input}
      />

      <Button mode="contained" onPress={() => router.replace("/home")}>
        Ingresar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    marginBottom: 15,
  },
});
