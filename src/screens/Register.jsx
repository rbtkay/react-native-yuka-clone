import React, { useState } from "react";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { View } from "react-native";
import { firebase } from "../../api/firebaseConfig";

import { YellowBox } from "react-native";
import { Text, Button, Container, Form, Item, Input } from "native-base";

import styles from "../../assets/styles/style";
import CustomHeader from "../components/CustomHeader";

const RegisterScreen = ({ navigation, addUser }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [confirm, setConfirm] = useState(null);
    const [username, setUsername] = useState(null);

    YellowBox.ignoreWarnings(["Setting a timer"]);

    const onRegisterPress = () => {
        if (password !== confirm) {
            alert("Password don't match");
            return;
        }

        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                const { uid } = userCredential.user;
                console.log("uid", userCredential);
                const data = {
                    id: uid,
                    email,
                    username,
                };

                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .set(data)
                    .then(() => {
                        addUser(data);
                    })
                    .catch((error) => {
                        alert(error);
                    });
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <Container>
            <CustomHeader screen={"Register"}/>
            <Form>
                <Item>
                    <Input
                        placeholder="Username"
                        value={username}
                        autoCapitalize="none"
                        onChangeText={(text) => setUsername(text)}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder="Email"
                        value={email}
                        autoCapitalize="none"
                        onChangeText={(text) => setEmail(text)}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder="Password"
                        value={password}
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        textContentType={"password"}
                    />
                </Item>
                <Item>
                    <Input
                        placeholder="Confirm password"
                        value={confirm}
                        autoCapitalize="none"
                        onChangeText={(text) => setConfirm(text)}
                        textContentType={"password"}
                    />
                </Item>
            </Form>
            <View
                style={styles.loginBtn}
            >
                <Button onPress={() => onRegisterPress()}>
                    <Text>Register</Text>
                </Button>
                <TouchableOpacity style={{paddingTop: 10}} onPress={() => navigation.navigate("Login")}>
                    <Text>Already a member ?</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default RegisterScreen;
