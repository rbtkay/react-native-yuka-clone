import React, { useState } from "react";
import { View, Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { firebase } from "../../api/firebaseConfig";

const LoginScreen = ({navigation}) => {
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
                        navigation.navigate("Home", { user });
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
        <View>
            <TextInput
                placeholder="email"
                value={email}
                onChangeText={(text)=> setEmail(text)}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="password"
                value={password}
                autoCapitalize="none"
                onChangeText={(text)=> setPassword(text)}
            />
            <Button title="Login" onPress={() => onLoginPress()} />
        </View>
    );
};

export default LoginScreen;
