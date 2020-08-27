import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../api/firebaseConfig";
import { Container, Button, Text, Form, Item, Input, Label } from "native-base";
import CustomHeader from "../components/CustomHeader";

import styles from "../../assets/styles/style";

const LoginScreen = ({ navigation, addUser }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onLoginPress = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((response) => {
                console.log(response);
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection("users");
                usersRef
                    .doc(uid)
                    .get()
                    .then((firestoreDocument) => {
                        if (!firestoreDocument.exists) {
                            alert("User does not exist anymore.");
                            return;
                        }
                        const user = firestoreDocument.data();
                        addUser(user); //add user to the state of App
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
            <CustomHeader screen={"Login"} />
            <Form>
                <Item>
                    <Input
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        autoCapitalize="none"
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
            </Form>

            <View
                style={styles.loginBtn}
            >
                <Button onPress={() => onLoginPress()}>
                    <Text>Login</Text>
                </Button>
                <TouchableOpacity style={{paddingTop: 10}} onPress={() => navigation.navigate("Register")}>
                    <Text>New member ?</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default LoginScreen;
