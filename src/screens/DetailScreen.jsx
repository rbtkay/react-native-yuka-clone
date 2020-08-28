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

const nutrient_colors = {
    low: "#006600",
    moderate: "#cccc00",
    high: "#cc0000",
};

const DetailScreen = ({ route }) => {
    const { product_id } = route.params;

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [grade, setGrade] = useState("");
    const [product_ingredients, setIngredients] = useState([]);
    const [nutrients, setNutrients] = useState([]);

    useEffect(() => {
        fetch(
            `https://world.openfoodfacts.org/api/v0/product/${product_id}.json`
        )
            .then((response) => response.json())
            .then((responseJson) => {
                const {
                    origins,
                    ingredients,
                    nutrition_grades,
                    image_nutrition_thumb_url,
                    product_name,
                    nutrient_levels,
                } = responseJson.product;

                setName(product_name);
                setImage(image_nutrition_thumb_url);
                setOrigin(origins);
                setGrade(nutrition_grades);
                setIngredients(ingredients);
                setNutrients(nutrient_levels);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <Container>
            <CustomHeader screen={"Details"} />
            <Card>
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
            </Card>
            <ScrollView style={styles.detailContent}>
                <View>
                    <H3>Origin</H3>
                    {origin ? (
                        <Text>{origin}</Text>
                    ) : (
                        <Text>the origins of this product are not known</Text>
                    )}
                    <Text>{"\n"}</Text>
                </View>
                <H3>Ingredients</H3>
                {product_ingredients && product_ingredients.length > 0 ? (
                    <>
                        {product_ingredients.map((ing, index) => {
                            return <Text key={index}>{ing.text}</Text>;
                        })}
                    </>
                ) : (
                    <Text>No ingredient mentionned for this product</Text>
                )}
                <Text>{"\n"}</Text>
                <H3>Nutrient Level</H3>
                <View>
                    {nutrients ? (
                        <>
                            {Object.entries(nutrients).map(
                                (nutrient, index) => {
                                    return (
                                        <View
                                            key={index}
                                            style={{ flexDirection: "row" }}
                                        >
                                            <Text key={index}>
                                                {nutrient[0]}:{" "}
                                            </Text>
                                            <Text
                                                style={{
                                                    backgroundColor:
                                                        nutrient_colors[
                                                            nutrient[1]
                                                        ],
                                                    paddingLeft: 2,
                                                    paddingRight: 2,
                                                    paddingBottom: 2,
                                                    paddingTop: 2,
                                                    color: "#ffffff",
                                                }}
                                            >
                                                {nutrient[1]}
                                            </Text>
                                        </View>
                                    );
                                }
                            )}
                        </>
                    ) : (
                        <Text>
                            Nutrient level are not specified for this product
                        </Text>
                    )}
                </View>
            </ScrollView>
        </Container>
    );
};

export default DetailScreen;
