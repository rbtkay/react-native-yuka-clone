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
} from "native-base";
import { Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import OptionsMenu from "react-native-option-menu";

import { firebase } from "../../api/firebaseConfig";
import { auth } from "firebase";

const icon = require("../../assets/icon.png");

const CustomHeader = ({ screen, logout }) => {
    const navigation = useNavigation();
    const [pickerValue, setPickerValue] = useState("key0");

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
            {screen === "Scanner" || screen === "Details" ? (
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Icon style={{ color: "white" }} name="arrow-back" />
                    </TouchableOpacity>
                </Left>
            ) : (
                <Left />
            )}
            <Body>
                <Title>{screen}</Title>
            </Body>
            <Right>
                {screen === "Home" ? (
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
