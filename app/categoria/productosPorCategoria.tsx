import axios from "axios";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Product } from "../interfaces/Producto.interface";
import Producto from "../productos/producto";

export default function ProductosPorCategoria() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(slug);
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error cargando productos", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, [slug]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, [slug]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.listContainer}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    padding: 16,
  },
});
