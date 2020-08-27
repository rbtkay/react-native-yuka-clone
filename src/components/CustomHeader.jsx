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
} from "native-base";
import { Picker } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

const CustomHeader = ({ screen }) => {
    const navigation = useNavigation();
    const [pickerValue, setPickerValue] = useState("key0");

    const goBack = () => navigation.navigate("Home");

    return (
        <Header>
            {screen === "Scanner" || screen === "Details" ? (
                <Left>
                    {/* <TouchableOpacity onPress={() => goBack()}> */}
                    <Button onPress={() => goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                    {/* </TouchableOpacity> */}
                </Left>
            ) : (
                <Left>
                    <TouchableOpacity onPress={() => goBack()}>
                        <Button>
                            <Icon name="menu" />
                        </Button>
                    </TouchableOpacity>
                </Left>
            )}
            <Body>
                <Title>{screen}</Title>
            </Body>
            <Right>
                {/* <Picker
                
                    selectedValue={pickerValue}
                    style={{ height: 50, width: 300 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setPickerValue(itemValue)
                    }
                >
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="menu" />}
                    style={{ width: undefined }}
                    placeholder=""
                    placeholderStyle={{ color: "#ffffff" }}
                    placeholderIconColor="#ffffff"
                    textStyle={{color: '#ffffff'}}
                    selectedValue={pickerValue}
                    onValueChange={(e) => {
                        navigation.navigate(e)
                    }}
                >
                    <Picker.Item label="" value="key0" />
                    <Picker.Item label="Profile" value="Profile" />
                    <Picker.Item label="Logout" value="Scanner" /> 
                </Picker>*/}
            </Right>
        </Header>
        //     <Header
        //         leftComponent={{ icon: "menu", color: "#fff" }}
        //         centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        //         rightComponent={{ icon: "home", color: "#fff" }}
        //         style={{ flex: 1 }}
        //     />

        // <Header
        //     centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        // />
        // <Header
        //     leftComponent={{ icon: "menu", color: "#fff" }}
        //     centerComponent={{ text: "MY TITLE", style: { color: "#fff" } }}
        //     rightComponent={{ icon: "home", color: "#fff" }}
        // />
    );
};

export default CustomHeader;
