import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { firebase } from "./api/firebaseConfig";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "./assets/styles/style";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import RegisterScreen from "./src/screens/Register";
import LoginScreen from "./src/screens/LoginScreen";
import { YellowBox } from "react-native";
const Stack = createStackNavigator();

export default function App() {
    YellowBox.ignoreWarnings(["Setting a timer"]);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("useEffect");
        const usersRef = firebase.firestore().collection("users");
        firebase.auth().onAuthStateChanged((user) => {
            console.log(user);
            if (user) {
                usersRef
                    .doc(user.uid)
                    .get()
                    .then((document) => {
                        const userData = document.data();
                        setLoading(false);
                        setUser(userData);
                    })
                    .catch((error) => {
                        setLoading(false);
                    });
            } else {
                setLoading(false);
            }
        });
    }, []);

    if (loading) {
        return <View />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {user ? (
                    <>
                        <Stack.Screen name="Home" component={HomeScreen} />
                        <Stack.Screen name="Details" component={DetailScreen} />
                        <Stack.Screen
                            name="Scanner"
                            component={ScannerScreen}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Register"
                            component={RegisterScreen}
                        />
                        <Stack.Screen name="Login" component={LoginScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
