import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { Text, View, Button, YellowBox } from "react-native";
import { firebase } from "./api/firebaseConfig";

import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator, HeaderTitle } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import RegisterScreen from "./src/screens/Register";
import LoginScreen from "./src/screens/LoginScreen";
import ProfileScreen from "./src/screens/Profile";

import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Root } from "native-base";

const Stack = createStackNavigator();

export default function App() {
    YellowBox.ignoreWarnings(["Setting a timer"]);

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async function () {
            await Font.loadAsync({
                Roboto: require("native-base/Fonts/Roboto.ttf"),
                Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                ...Ionicons.font,
            });
        })();

        const usersRef = firebase.firestore().collection("users");
        firebase.auth().onAuthStateChanged((user) => {
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

    const addUser = (user) => {
        setUser(user);
    };

    const logout = () => {
        firebase
            .auth()
            .signOut()
            .then(() => {
                setUser(null);
            });
    };

    if (loading) {
        return <View />;
    }

    return (
        <Root>
            <NavigationContainer>
                <Stack.Navigator>
                    {user ? (
                        <>
                            <Stack.Screen
                                name="Home"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <HomeScreen
                                        {...props}
                                        user={user}
                                        logout={logout}
                                    />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Details"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <DetailScreen {...props} user={user} />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Scanner"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <ScannerScreen {...props} user={user} />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Profile"
                                options={{
                                    headerShown: false,
                                }}
                            >
                                {(props) => (
                                    <ProfileScreen
                                        {...props}
                                        user={user}
                                        addUser={addUser}
                                    />
                                )}
                            </Stack.Screen>
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="Login"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <LoginScreen {...props} addUser={addUser} />
                                )}
                            </Stack.Screen>
                            <Stack.Screen
                                name="Register"
                                options={{ headerShown: false }}
                            >
                                {(props) => (
                                    <RegisterScreen
                                        {...props}
                                        addUser={addUser}
                                    />
                                )}
                            </Stack.Screen>
                        </>
                    )}
                </Stack.Navigator>
             </NavigationContainer>
        </Root>
    );
}
