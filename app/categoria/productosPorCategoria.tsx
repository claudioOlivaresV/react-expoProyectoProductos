import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
} from "react-native";
import { Card, Text } from "react-native-paper";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

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
        <Card style={styles.card} mode="elevated">
          <Card.Cover source={{ uri: item.thumbnail }} />

          <Card.Content style={styles.content}>
            <Text variant="titleMedium" style={styles.title}>
              {item.title}
            </Text>

            <Text
              variant="bodySmall"
              numberOfLines={2}
              style={styles.description}
            >
              {item.description}
            </Text>

            <Text style={styles.price}>${item.price}</Text>
          </Card.Content>
        </Card>
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
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
  },
  content: {
    paddingTop: 12,
  },
  title: {
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    opacity: 0.6,
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
