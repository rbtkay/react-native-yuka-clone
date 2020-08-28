import React, { useState } from "react";
// import { Header } from "react-native-elements";
import * as Font from "expo-font";
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Button,
    Icon,
    Text,
    View,
    H1,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OptionsMenu from "react-native-option-menu";

const CustomHeader = ({ screen, logout }) => {
    const navigation = useNavigation();

    const goBack = () => navigation.navigate("Home");

    const getProfile = () => {
        navigation.navigate("Profile");
    };

    const signout = () => {
        logout();
    };

    const menuIcon = <Icon name="menu" />;

    return (
        <Header>
            {screen === "Scanner" ||
            screen === "Details" ||
            screen === "Profile" ? (
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon style={{ color: "white" }} name="arrow-back" />
                    </TouchableOpacity>
                </Left>
            ) : (
                <Left />
            )}
            <Body>
                <Title>
                    <H1 style={{ color: "#ffffff" }}>{screen}</H1>
                </Title>
            </Body>
            <Right>
                {screen === "History" ? (
                    <OptionsMenu
                        customButton={
                            <Icon style={{ color: "white" }} name="menu" />
                        }
                        buttonStyle={{
                            width: 32,
                            height: 50,
                            margin: 0,
                            resizeMode: "contain",
                        }}
                        destructiveIndex={2}
                        options={["Profile", "Logout", "Cancel"]}
                        actions={[getProfile, signout]}
                    />
                ) : (
                    <View />
                )}
            </Right>
        </Header>
    );
};

export default CustomHeader;
