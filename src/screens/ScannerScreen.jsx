import React, { useEffect, useState } from "react";
import { View, Vibration } from "react-native";
import { Camera } from "expo-camera";

const { FlashMode: CameraFlashModes, Type: CameraTypes } = Camera.Constants;

import styles from "../../assets/styles/style";

import { addProduct, findOneProduct } from "../../api/products";
import { Container, Content, Button, Text, Toast } from "native-base";
import CustomHeader from "../components/CustomHeader";

const ScannerScreen = ({ navigation, user }) => {
    const [isFlashOn, toggleFlash] = useState(false);
    const [flashState, setFlashState] = useState(
        Camera.Constants.FlashMode.torch
    );
    const [cameraPermission, setCameraPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [scanned, setScanned] = useState(null);
    // const [isToastVisible, setVisibleToast] = useState(false);

    const userId = user.id;

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

                    findOneProduct(data, userId).then((status) => {
                        // if the product is not already scanned we add it the user's products
                        if (!status) {
                            addProduct(userId, data).then((isOk) => {
                                if (isOk) {
                                    navigation.navigate("Details", {
                                        product_id: data,
                                        isScanner: true,
                                    });
                                } else {
                                    alert(
                                        "Something went wrong when trying to add your product"
                                    );
                                }
                            });
                        } else {
                            navigation.navigate("Details", {
                                product_id: data,
                                isScanner: true,
                            });
                        }
                    });
                } else {
                    Toast.show({
                        text: "No products found!",
                        buttonText: "Ok",
                    });
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    //detect the change on visible toast and reset it to false
    // useEffect(() => setVisibleToast(false), [isToastVisible]);

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
        <Container>
            <CustomHeader screen={"Scanner"} />
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
                <Button
                    rounded
                    style={{ alignSelf: "center" }}
                    onPress={() => changeFlash()}
                >
                    <Text>Toggle Flash</Text>
                </Button>
            </Camera>
        </Container>
    );
};

{
    /* <Toast visible={isToastVisible} message="No products found!" /> */
}
{
    /*                 
                    <Button title={'Recommencer'} onPress={()=> this.setState({scanned: null})} /> */
}

export default ScannerScreen;
