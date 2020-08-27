import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../api/firebaseConfig";
import { Container, Button, Text, Form, Item, Input, Label } from "native-base";
import CustomHeader from "../components/CustomHeader";

import styles from "../../assets/styles/style";

import { login } from "../../api/user";

const LoginScreen = ({ navigation, addUser }) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const onLoginPress = () => {
        login(email, password).then((user) => {
            addUser(user);
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
                        secureTextEntry={true}
                        placeholder="Password"
                        value={password}
                        autoCapitalize="none"
                        onChangeText={(text) => setPassword(text)}
                        textContentType={"password"}
                    />
                </Item>
            </Form>

            <View style={styles.loginBtn}>
                <Button onPress={() => onLoginPress()}>
                    <Text>Login</Text>
                </Button>
                <TouchableOpacity
                    style={{ paddingTop: 10 }}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text>New member ?</Text>
                </TouchableOpacity>
            </View>
        </Container>
    );
};

export default LoginScreen;
