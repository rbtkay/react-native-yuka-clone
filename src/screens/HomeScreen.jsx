import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import { Button, Text, Container, Picker, Icon } from "native-base";

import styles from "../../assets/styles/style";
import Product from "../components/Product";

import { findProductsByUser } from "../../api/products";
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";

const HomeScreen = ({ navigation, user, logout }) => {
    const [products, setProducts] = useState([]);
    const user_id = user.id;

    const [pickerValue, setPickerValue] = useState("key1");

    const isFocused = useIsFocused();

    const openMenu = () => {
        console.log("Menu opening");
    };

    useEffect(() => {
        findProductsByUser(user_id).then((result) => {
            setProducts(result);
        });
    }, [isFocused]);

    // const myIcon = <Icon name="rocket" size={30} color="#900" />;
    return (
        <Container>
            <CustomHeader screen={"Home"} logout={logout} />
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <Product product={item} navigation={navigation} />
                )}
                keyExtractor={({ id }, index) => id}
            />

            <View style={styles.cameraBtn}>
                <Button rounded onPress={() => navigation.navigate("Scanner")}>
                    <Icon name="camera" />
                </Button>
            </View>
        </Container>
    );
};

export default HomeScreen;
