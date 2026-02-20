// app/home/categorias/index.tsx
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { Divider, List } from "react-native-paper";
import { getCategorias } from "../api/producto/productoApi";
import { Category } from "../interfaces/Category.interface";
import { categoryIconMap } from "../utils/Icons.mapper";

export default function Categorias() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getCategoryIcon = (slug: string) => {
    return categoryIconMap[slug] ?? "shape-outline";
  };
  const getCategories = async () => {
    try {
      const response = await getCategorias();

      setCategories(response);
    } catch (error: any) {
      // No exponer detalles técnicos al usuario
      if (error.response?.status === 400) {
        // setFieldError("password", "Credenciales inválidas");
      } else {
        // setFieldError("password", "Error de conexión");
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 20 }} />;
  }

  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.slug}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={item.slug}
          onPress={() =>
            router.push({
              pathname: "/categoria/productosPorCategoria",
              params: { slug: item.url },
            })
          }
          left={(props) => (
            <List.Icon {...props} icon={getCategoryIcon(item.slug)} />
          )}
        />
      )}
      ItemSeparatorComponent={() => <Divider />}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
});
