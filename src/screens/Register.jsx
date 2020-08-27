import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Button, View, Text } from "react-native";
import { firebase } from "../../api/firebaseConfig";

import { YellowBox } from "react-native";

const RegisterScreen = ({ navigation }) => {
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

        console.log([email, password, confirm]);

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
                        navigation.navigate("Home", { user: data });
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
        <View style={{backgroundColor: 'red'}}>
            <View><Text>Hello IOS</Text></View>
            <TextInput
                style={{ backgroundColor: "#ededed", height: 60 }}
                placeholder="username"
                value={username}
                autoCapitalize="none"
                onChangeText={(text) => setUsername(text)}
            />
            <TextInput
                placeholder="email"
                value={email}
                autoCapitalize="none"
                onChangeText={(text) => setEmail(text)}
            />
            <TextInput
                placeholder="password"
                value={password}
                autoCapitalize="none"
                onChangeText={(text) => setPassword(text)}
            />
            <TextInput
                placeholder="confirm password"
                value={confirm}
                autoCapitalize="none"
                onChangeText={(text) => setConfirm(text)}
            />
            <Button title="Register" onPress={() => onRegisterPress()} />
            <Button
                title="login"
                onPress={() => navigation.navigate("Login")}
            />
        </View>
    );
};

export default RegisterScreen;
