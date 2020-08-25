import 'react-native-gesture-handler';

import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import firebaseConfig from "./api/firebaseConfig";
import * as firebase from "firebase";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import styles from "./assets/styles/style";

import HomeScreen from "./src/screens/HomeScreen";
import DetailScreen from "./src/screens/DetailScreen";
import ScannerScreen from "./src/screens/ScannerScreen";

const Stack = createStackNavigator();

export default function App() {
    // firebase.initializeApp(firebaseConfig);

    return (
      <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Details" component={DetailScreen} />
            <Stack.Screen name="Scanner" component={ScannerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
}
