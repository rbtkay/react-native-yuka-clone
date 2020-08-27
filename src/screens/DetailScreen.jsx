import React, { useEffect, useState } from "react";
import { View, Image } from "react-native";

import styles from "../../assets/styles/style";
import {
    Container,
    H1,
    Text,
    Card,
    CardItem,
    Body,
    Left,
    Right,
    Thumbnail,
    Button,
    Icon,
    H3,
} from "native-base";
import CustomHeader from "../components/CustomHeader";

const DetailScreen = ({ route }) => {
    const { product_id } = route.params;

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [grade, setGrade] = useState("");
    const [product_ingredients, setIngredients] = useState([]);

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
                setIngredients(ingredients);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <CustomHeader screen={"Details"} />
            <Card style={{ flex: 0 }}>
                <CardItem>
                    <Left>
                        <Thumbnail source={{ uri: image }} />
                        <Body>
                            <Text>{name}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem>
                    <Body>
                        <H3>Origin</H3>
                        {origin ? (
                            <Text>{origin}</Text>
                        ) : (
                            <Text>
                                the origins of this product are not known
                            </Text>
                        )}
                        <Text>{"\n"}</Text>
                        <H3>Nutriscore</H3>
                        {grade ? (
                            <Text>{grade.toUpperCase()}</Text>
                        ) : (
                            <Text>No nutriscore assign to this product</Text>
                        )}
                        <Text>{"\n"}</Text>
                        <H3>Ingredients</H3>
                        {product_ingredients &&
                        product_ingredients.length > 0 ? (
                            <>
                                {product_ingredients.map((ing, index) => {
                                    return <Text key={index}>{ing.text}</Text>;
                                })}
                            </>
                        ) : (
                            <Text>
                                No ingredient mentionned for this product
                            </Text>
                        )}
                        <Text>{"\n"}</Text>
                    </Body>
                </CardItem>
            </Card>
        </Container>
    );
};

export default DetailScreen;
