import React, { useEffect, useState, useRef } from "react";
import { View, Image } from "react-native";

import styles from "../../assets/styles/style";
import {
    Container,
    Text,
    Card,
    CardItem,
    Body,
    Left,
    Icon,
    H3,
    H2,
    Badge,
    Spinner,
    Right,
} from "native-base";
import CustomHeader from "../components/CustomHeader";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

import {
    addProductToFavorite,
    removeProductFromFavorites,
    findOneFavorite,
} from "../../api/favorites";

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

const star_status = {
    empty: "ios-star-outline",
    full: "ios-star",
};

const DetailScreen = ({ route, user }) => {
    const { product_id } = route.params;
    const currentStar = useRef();

    const [name, setName] = useState(null);
    const [image, setImage] = useState(null);
    const [origin, setOrigin] = useState(null);
    const [grade, setGrade] = useState("");
    const [product_ingredients, setIngredients] = useState([]);
    const [nutrients, setNutrients] = useState([]);

    const [star, setStar] = useState(star_status.empty);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        findOneFavorite(user.id, product_id).then((status) => {
            currentStar.current = status ? star_status.full : star_status.empty;
            setStar(currentStar.current);
        });

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
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    const toggleFavorite = () => {
        if (star === star_status.full) {
            currentStar.current = star_status.empty;
            removeProductFromFavorites(user.id, product_id);
        } else {
            currentStar.current = star_status.full;
            addProductToFavorite(user.id, product_id);
        }

        setStar(currentStar.current);
    };

    return (
        <Container>
            <CustomHeader screen={"Details"} />
            {!isLoading ? (
                <View>
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
                                        <View>
                                            <View
                                                style={{ flexDirection: "row" }}
                                            >
                                                <Badge
                                                    style={{
                                                        backgroundColor:
                                                            badge_colors[
                                                                grade.toUpperCase()
                                                            ],
                                                    }}
                                                >
                                                    <Text>
                                                        {grade.toUpperCase()}
                                                    </Text>
                                                </Badge>
                                                <Text> nutriscore</Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    alignContent: "center",
                                                    paddingLeft: 50,
                                                }}
                                            ></View>
                                        </View>
                                    ) : (
                                        <View />
                                    )}
                                </Body>
                                <TouchableOpacity
                                    onPress={() => toggleFavorite()}
                                >
                                    <Icon
                                        style={{
                                            color: "#DAA520",
                                        }}
                                        name={star}
                                    />
                                </TouchableOpacity>
                            </Left>
                        </CardItem>
                    </Card>
                    <ScrollView style={styles.detailContent}>
                        <View>
                            <H3>Origin</H3>
                            {origin ? (
                                <Text>{origin}</Text>
                            ) : (
                                <Text>
                                    the origins of this product are not known
                                </Text>
                            )}
                            <Text>{"\n"}</Text>
                        </View>
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
                        <H3>Nutrient Level</H3>
                        <View>
                            {Object.entries(nutrients).length > 0 ? (
                                <>
                                    {Object.entries(nutrients).map(
                                        (nutrient, index) => {
                                            return (
                                                <View
                                                    key={index}
                                                    style={{
                                                        flexDirection: "row",
                                                    }}
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
                                                            borderRadius: 5,
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
                                    Nutrient level are not specified for this
                                    product
                                </Text>
                            )}
                        </View>
                    </ScrollView>
                </View>
            ) : (
                <Spinner />
            )}
        </Container>
    );
};

export default DetailScreen;
