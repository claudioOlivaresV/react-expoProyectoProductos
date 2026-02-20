import { useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { ActivityIndicator, Button, Searchbar, Text } from "react-native-paper";
import { getSortProducts, searchProducts } from "../api/producto/productoApi";
import { Product } from "../interfaces/Producto.interface";
import Producto from "../productos/producto";

export default function Home() {
  const router = useRouter();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false); // 🔥 nuevo estado

  const getProductos = async (isRefresh = false) => {
    try {
      const response = await getSortProducts();
      setProducts(response);
    } catch (error) {
      console.log("Error cargando productos:", error);
    } finally {
      if (isRefresh) {
        setRefreshing(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    getProductos();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getProductos(true);
  }, []);

  const onChangeSearch = (query: string) => {
    setSearchQuery(query);
  };

  // 🔥 Debounce con spinner
  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchQuery.trim() === "") {
        getProductos();
        return;
      }

      try {
        setSearching(true); // 🔥 activa spinner

        const result = await searchProducts(searchQuery);
        setProducts(result);
      } catch (error) {
        console.log("Error buscando productos:", error);
      } finally {
        setSearching(false); // 🔥 desactiva spinner
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 60 }} size="large" />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={{ padding: 16 }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="Buscar productos..."
            onChangeText={onChangeSearch}
            value={searchQuery}
            loading={searching} // 🔥 aquí está el spinner
            style={styles.search}
          />

          <Button
            mode="contained"
            icon="shape-outline"
            style={styles.categoryButton}
            onPress={() => router.push("/categorias/categoria")}
          >
            Ir a Categorías
          </Button>

          <Text variant="headlineMedium" style={styles.header}>
            Productos Destacados
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <Producto
          producto={item}
          onPress={() =>
            router.push({
              pathname: "/productos/productoDetalle",
              params: { id: item.id.toString() },
            })
          }
        />
      )}
      ListEmptyComponent={
        <Text style={{ textAlign: "center", marginTop: 40 }}>
          No se encontraron productos
        </Text>
      }
    />
  );
}

const styles = StyleSheet.create({
  search: {
    marginBottom: 12,
    borderRadius: 12,
  },
  categoryButton: {
    marginBottom: 20,
    borderRadius: 12,
  },
  header: {
    marginBottom: 20,
    fontWeight: "bold",
  },
});
