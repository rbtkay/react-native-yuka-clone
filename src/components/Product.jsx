import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Text, Icon, Thumbnail, Card, CardItem, Body } from "native-base";
import styles from "../../assets/styles/style";

const Product = ({ navigation, product }) => {
    const onPress = (item) => {
        navigation.navigate("Details", {
            product_id: item.id,
        });
    };

    return (
        <TouchableOpacity onPress={() => onPress(product)}>
            <Thumbnail source={{ uri: product.image_thumb_url }} />
            <Text>{product.product_name}</Text>
        </TouchableOpacity>
    );
};

export default Product;
