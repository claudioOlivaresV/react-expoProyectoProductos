import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Product } from "../interfaces/Producto.interface";

export default function ProductoDetalle() {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error cargando producto", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>No se encontró el producto</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Imagen principal */}
      <Image source={{ uri: product.images[0] }} style={styles.image} />

      {/* Card detalle */}
      <Card style={styles.card} mode="elevated">
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>
            {product.title}
          </Text>

          <Text style={styles.brand}>
            {product.brand} • {product.category}
          </Text>

          <Text style={styles.rating}>⭐ {product.rating}</Text>

          <Text variant="bodyMedium" style={styles.description}>
            {product.description}
          </Text>

          <Text style={styles.price}>${product.price}</Text>

          <Button
            mode="contained"
            style={styles.button}
            onPress={() => console.log("Agregar al carrito")}
          >
            Agregar al carrito
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 280,
    resizeMode: "cover",
  },
  card: {
    margin: 16,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  brand: {
    opacity: 0.6,
    marginBottom: 6,
  },
  rating: {
    marginBottom: 10,
  },
  description: {
    marginBottom: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  button: {
    borderRadius: 12,
  },
  previewSection: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginBottom: 12,
    fontWeight: "600",
  },
});
