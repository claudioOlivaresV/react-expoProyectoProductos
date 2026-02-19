import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { Formik } from "formik";
import { StyleSheet, View } from "react-native";
import { Button, HelperText, Text, TextInput } from "react-native-paper";
import * as Yup from "yup";
import { login } from "./api/auth/authApi";

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres")
    .matches(/^[a-zA-Z0-9_]+$/, "Solo letras, números y guion bajo")
    .required("Usuario es requerido"),

  password: Yup.string()
    .min(6, "Mínimo 6 caracteres")
    .max(50, "Máximo 50 caracteres")
    // Solo evitar caracteres invisibles o de control
    .matches(/^[\x20-\x7E]+$/, "Caracteres inválidos en la contraseña")
    .required("Password es requerido"),
});

export default function Login() {
  const router = useRouter();

  const handleLogin = async (
    values: any,
    { setSubmitting, setFieldError }: any,
  ) => {
    try {
      const { data } = await login(values.username.trim(), values.password);

      // 🔐 Guardar token seguro
      await SecureStore.setItemAsync("accessToken", data.accessToken);

      values.password = "";

      router.replace("/home/home");
    } catch (error: any) {
      // No exponer detalles técnicos al usuario
      if (error.response?.status === 400) {
        setFieldError("password", "Credenciales inválidas");
      } else {
        setFieldError("password", "Error de conexión");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Iniciar Sesión
      </Text>

      <Formik
        initialValues={{ username: "emilys", password: "emilyspass" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isSubmitting,
        }) => (
          <>
            <TextInput
              label="Usuario"
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              value={values.username}
              error={!!errors.username && touched.username}
            />
            <HelperText
              type="error"
              visible={!!errors.username && touched.username}
            >
              {errors.username}
            </HelperText>

            <TextInput
              label="Password"
              secureTextEntry
              mode="outlined"
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              error={!!errors.password && touched.password}
            />
            <HelperText
              type="error"
              visible={!!errors.password && touched.password}
            >
              {errors.password}
            </HelperText>

            <Button
              mode="contained"
              loading={isSubmitting}
              disabled={isSubmitting}
              onPress={() => handleSubmit()}
            >
              Ingresar
            </Button>
          </>
        )}
      </Formik>
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
    marginBottom: 5,
  },
});
