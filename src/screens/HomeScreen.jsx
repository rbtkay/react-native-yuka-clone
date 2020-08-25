import React, { useEffect, useState } from "react";
import { View, Text, Button, SafeAreaView, FlatList } from "react-native";

import styles from "../../assets/styles/style";
import Product from "../components/Product";

const HomeScreen = ({navigation}) => {

    const [products, setProducts] = useState([]); 

    useEffect(() => {
        fetch("https://fr-en.openfoodfacts.org/category/pizzas/1.json")
            .then((response) => response.json())
            .then((responseJson) => {
                setProducts(responseJson.products);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <View style={styles.container}>
            <SafeAreaView style={{flex: 1, paddingTop:20}}>
                    <FlatList
                        data={products}
                        renderItem={({item}) => <Product product={item} navigation={navigation}  />}
                        keyExtractor={({id}, index) => id}
                    />
                </SafeAreaView>
            <Button
                onPress={() =>
                    navigation.navigate("Scanner")
                }
                title="Scan new Product"
            />
        </View>
    );
};

export default HomeScreen;