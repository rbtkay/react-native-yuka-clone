import React, { useEffect, useState } from "react";
import { View, Text, Image } from "react-native";

import styles from "../../assets/styles/style";
import { Container } from "native-base";
import CustomHeader from "../components/CustomHeader";

const DetailScreen = ({ route }) => {
    const { product_id } = route.params;

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [grade, setGrade] = useState(null);

    useEffect(() => {
        fetch(
            `https://world.openfoodfacts.org/api/v0/product/${product_id}.json`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                const {
                    id,
                    origins,
                    coutries_imported,
                    nutriscore_data,
                    ingredients,
                    nutrition_grades,
                    image_nutrition_thumb_url,
                    product_name,
                } = responseJson.product;

                setName(product_name);
                setImage(image_nutrition_thumb_url);
                setOrigin(origins);
                setGrade(nutrition_grades);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <CustomHeader screen={"Details"} />
            {/* <View style={styles.container}> */}
            <Text>Title {name}</Text>
            <Image style={styles.stretch} source={{ uri: image }} />
            <Text>Origin {origin}</Text>
            <Text>Nutriscore {grade}</Text>
            {/* </View> */}
        </Container>
    );
};

export default DetailScreen;
