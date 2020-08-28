import React from "react";
import { View } from "react-native";
import { Text, Thumbnail } from "native-base";

const Product = ({ product }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            <Thumbnail
                style={{ marginRight: 10 }}
                source={{ uri: product.image_thumb_url }}
            />
            <Text style={{ flexShrink: 1 }}>{product.product_name}</Text>
        </View>
    );
};

export default Product;
