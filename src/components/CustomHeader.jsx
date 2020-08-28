import React, { useState } from "react";
import { Platform } from "react-native";
import * as Font from "expo-font";
import { Header, Left, Body, Right, Title, Icon, View, H1 } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OptionsMenu from "react-native-option-menu";

const CustomHeader = ({ screen, logout }) => {
    const navigation = useNavigation();

    const goBack = () => navigation.goBack();

    const getProfile = () => {
        navigation.navigate("Profile");
    };

    const signout = () => {
        logout();
    };

    const gotoFavorites = () => {
        navigation.navigate("Favorites");
    };

    const textColor = Platform.OS === "ios" ? "#000000" : "#ffffff";

    return (
        <Header>
            {screen === "Scanner" ||
            screen === "Details" ||
            screen === "Favorites" ||
            screen === "Profile" ? (
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon style={{ color: textColor }} name="arrow-back" />
                    </TouchableOpacity>
                </Left>
            ) : (
                <Left />
            )}
            <Body>
                <Title>
                    <H1 style={{ color: textColor }}>{screen}</H1>
                </Title>
            </Body>
            <Right>
                {screen === "History" ? (
                    <OptionsMenu
                        customButton={
                            <Icon style={{ color: textColor }} name="menu" />
                        }
                        buttonStyle={{
                            width: 32,
                            height: 50,
                            margin: 0,
                            resizeMode: "contain",
                        }}
                        destructiveIndex={2}
                        options={["Favorites", "Profile", "Logout", "Cancel"]}
                        actions={[gotoFavorites, getProfile, signout]}
                    />
                ) : (
                    <View />
                )}
            </Right>
        </Header>
    );
};

export default CustomHeader;
