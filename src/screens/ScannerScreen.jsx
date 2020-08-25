import React, { useEffect, useState } from "react";
import { View, Text, Button, Vibration } from "react-native";
import { Camera } from "expo-camera";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

import styles from "../../assets/styles/style";

const ScannerScreen = ({ navigation }) => {
    const [isFlashOn, toggleFlash] = useState(false);
    const [flashState, setFlashState] = useState(
        Camera.Constants.FlashMode.torch
    );
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(null);

    const changeFlash = () => {
        isFlashOn ? toggleFlash(false) : toggleFlash(true);
    };

    const handleBarCodeScanned = ({ type, data }) => {
        Vibration.vibrate();
        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                if (responseJson.status > 0) {
                    setScanned(true);

                    navigation.navigate("Details", {
                        product_id: data,
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        Camera.requestPermissionsAsync().then(({ status }) => {
            setCameraPermission(status === "granted");
        });
    }, []);

    if (cameraPermission === null) {
        return <View />;
    }
    if (cameraPermission === false) {
        return (
            <View>
                <Text>No access to camera</Text>
            </View>
        );
    }
    return (
        <View style={{ flex: 1 }}>
            <Camera
                type={cameraType}
                flashMode={
                    isFlashOn
                        ? Camera.Constants.FlashMode.torch
                        : Camera.Constants.FlashMode.off
                }
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={styles.camera}
            >
                <Button title={"Flash"} onPress={() => changeFlash()} />
                {/*                 
                    <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} /> */}
            </Camera>
        </View>
    );
};

export default ScannerScreen;
