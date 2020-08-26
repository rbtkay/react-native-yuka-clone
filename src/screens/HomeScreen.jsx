import React, { useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView, FlatList } from "react-native";

import styles from "../../assets/styles/style";
import Product from "../components/Product";

import { findProductsByUser } from "../../api/products";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({ navigation, user }) => {
    const [products, setProducts] = useState([]);
    const user_id = user.id;

    const isFocused = useIsFocused();
    
    useEffect(() => {
        findProductsByUser(user_id).then((result) => {
            setProducts(result);
        });
    }, [isFocused]);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{ flex: 1, paddingTop: 20 }}>
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <Product product={item} navigation={navigation} />
                    )}
                    keyExtractor={({ id }, index) => id}
                />
            </SafeAreaView>
            <Button
                onPress={() => navigation.navigate("Scanner")}
                title="Scan new Product"
            />
        </View>
    );
};

export default HomeScreen;
