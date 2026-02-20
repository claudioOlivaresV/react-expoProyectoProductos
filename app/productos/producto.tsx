import React from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Card, Text } from "react-native-paper";
import { Product } from "../interfaces/Producto.interface";

type Props = {
  producto: Product;
  onPress?: () => void;
};

export default function Producto({ producto, onPress }: Props) {
  return (
    <Card style={styles.card} mode="elevated" onPress={onPress}>
      <Card.Cover source={{ uri: producto.thumbnail }} />
      <Card.Content style={styles.content}>
        <Text variant="titleMedium" style={styles.title}>
          {producto.title}
        </Text>

        <Text variant="bodySmall" numberOfLines={2} style={styles.description}>
          {producto.description}
        </Text>

        <View style={styles.row}>
          <Text style={styles.price}>${producto.price}</Text>

          <View style={styles.right}>
            <Avatar.Icon size={24} icon="star" />
            <Text style={styles.rating}>{producto.rating}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  right: {
    alignItems: "flex-end",
  },
  rating: {
    marginTop: 4,
  },
});
