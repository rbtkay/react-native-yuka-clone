import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { firebase } from "../../api/firebaseConfig";

import { YellowBox } from "react-native";
import { Text, Button, Container, Form, Item, Input } from "native-base";

import styles from "../../assets/styles/style";
import CustomHeader from "../components/CustomHeader";

const ProfileScreen = ({ navigation, user, addUser }) => {
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);

    YellowBox.ignoreWarnings(["Setting a timer"]);

    const updateUser = () => {
        // check that at least one of the field is filled
        if (email || username) {
            const updatedEmail = email || user.email;
            const updatedUsername = username || user.username;

            firebase
                .firestore()
                .collection("users")
                .doc(user.id)
                .update({
                    email: updatedEmail,
                    username: updatedUsername,
                })
                .then(() => {
                    console.log("User Updated");
                });
        }

        navigation.navigate("Home");
    };

    return (
        <Container>
            <CustomHeader screen={"Profile"} />
            <Form>
                <Item>
                    <Input
                        placeholder={user.username}
                        value={username}
                        autoCapitalize="none"
                        onChangeText={(text) => setUsername(text)}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder={user.email}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </Item>
            </Form>

            <Button onPress={() => updateUser()}>
                <Text>Update Profile</Text>
            </Button>
        </Container>
    );
};

export default ProfileScreen;
