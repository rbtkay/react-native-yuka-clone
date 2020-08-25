import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "../../assets/styles/style";

const Product =  ({ navigation, product }) => {
    const onPress = (item) => {
        console.log("item", item.id);
        navigation.navigate("Details", {
            product_id: item.id,
        });
    };

    return (
        <View style={styles.lineContainer}>
            <TouchableOpacity onPress={() => onPress(product)}>
                <Text>{product.product_name}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Product;
