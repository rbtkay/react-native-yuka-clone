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
    H2,
    Badge,
} from "native-base";
import CustomHeader from "../components/CustomHeader";
import { ScrollView } from "react-native-gesture-handler";

const badge_colors = {
    A: "#006600",
    B: "#33cc33",
    C: "#cccc00",
    D: "#ff9900",
    E: "#cc0000",
};

const DetailScreen = ({ route }) => {
    const { product_id } = route.params;
    const color = "primary";

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
                        <Image
                            source={image ? { uri: image } : null}
                            style={{ width: 150, height: 150 }}
                        />
                        <Body>
                            <H2>{name}</H2>
                            {grade ? (
                                <View style={{ flexDirection: "row" }}>
                                    <Badge
                                        style={{
                                            backgroundColor:
                                                badge_colors[
                                                    grade.toUpperCase()
                                                ],
                                        }}
                                    >
                                        <Text>{grade.toUpperCase()}</Text>
                                    </Badge>
                                    <Text> nutriscore</Text>
                                </View>
                            ) : (
                                <View />
                            )}
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
                        <H3>Ingredients</H3>
                        {product_ingredients &&
                        product_ingredients.length > 0 ? (
                            <>
                                <ScrollView>
                                    {product_ingredients.map((ing, index) => {
                                        return (
                                            <Text key={index}>{ing.text}</Text>
                                        );
                                    })}
                                </ScrollView>
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
