import React, { useState, useEffect } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { firebase } from "../../api/firebaseConfig";

import { YellowBox } from "react-native";
import { Text, Button, Container, Form, Item, Input, H2 } from "native-base";

import styles from "../../assets/styles/style";
import CustomHeader from "../components/CustomHeader";
import { useIsFocused } from "@react-navigation/native";

const ProfileScreen = ({ navigation, user, addUser }) => {
    YellowBox.ignoreWarnings(["Setting a timer"]);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);

    const [userEmail, setUserEmail] = useState(null);
    const [userUsername, setUserUsername] = useState(null);

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log(isFocused);
        setUserEmail(user.email);
        setUserUsername(user.username);
    }, [isFocused]);

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
                    const newUser = {
                        id: user.id,
                        email: updatedEmail,
                        username: updatedUsername,
                    };

                    addUser(newUser);
                });
        }

        navigation.navigate("Home");
    };

    return (
        <Container>
            <CustomHeader screen={"Profile"} />
            <H2 style={styles.title}>Your profile</H2>
            <Form>
                <Item>
                    <Input
                        placeholder={userUsername}
                        value={username}
                        autoCapitalize="none"
                        onChangeText={(text) => setUsername(text)}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder={userEmail}
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </Item>
            </Form>
            <View style={styles.loginBtn}>
                <Button onPress={() => updateUser()}>
                    <Text>Update Profile</Text>
                </Button>
            </View>
        </Container>
    );
};

export default ProfileScreen;
