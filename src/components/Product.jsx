import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import {
    Text,
    Icon,
    Thumbnail,
    Card,
    CardItem,
    Body,
    ListItem,
} from "native-base";
import styles from "../../assets/styles/style";

const Product = ({ product }) => {
    // const onPress = (item) => {
    //     navigation.navigate("Details", {
    //         product_id: item.id,
    //     });
    // };

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
