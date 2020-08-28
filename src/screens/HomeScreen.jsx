import React, { useEffect, useState } from "react";
import { View, SafeAreaView, FlatList } from "react-native";
import {
    Button,
    Text,
    Container,
    Picker,
    Icon,
    List,
    ListItem,
    Spinner,
} from "native-base";

import styles from "../../assets/styles/style";
import Product from "../components/Product";

import { findProductsByUser } from "../../api/products";
import { useIsFocused } from "@react-navigation/native";
import CustomHeader from "../components/CustomHeader";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation, user, logout }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const user_id = user.id;

    const isFocused = useIsFocused();

    useEffect(() => {
        setLoading(true);
        findProductsByUser(user_id).then((result) => {
            setProducts(result);
            setLoading(false);
        });
    }, [isFocused]);

    const onProductPress = (product_id) => {
        navigation.navigate("Details", {
            product_id,
        });
    };

    return (
        <Container>
            <CustomHeader screen={"History"} logout={logout} />
            <ScrollView>
                <View style={{ flex: 3 }}>
                    {!isLoading ? (
                        <View style={{ flex: 2 }}>
                            {products.length > 0 ? (
                                <List>
                                    {products.map((product, index) => {
                                        return (
                                            <TouchableOpacity
                                                key={index}
                                                onPress={() =>
                                                    onProductPress(product.id)
                                                }
                                            >
                                                <ListItem>
                                                    <Product
                                                        product={product}
                                                        navigation={navigation}
                                                    />
                                                </ListItem>
                                            </TouchableOpacity>
                                        );
                                    })}
                                </List>
                            ) : (
                                <Text
                                    style={styles.notFound}
                                >
                                    No scanned products for now
                                </Text>
                            )}
                        </View>
                    ) : (
                        <Spinner style={{ flex: 2 }} />
                    )}
                    <View style={{ flex: 1 }}>
                        <View style={styles.cameraBtn}>
                            <Button
                                rounded
                                onPress={() => navigation.navigate("Scanner")}
                            >
                                <Icon name="camera" />
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </Container>
    );
};

export default HomeScreen;
