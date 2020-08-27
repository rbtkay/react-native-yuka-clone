import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    lineContainer: {
        height: 40,
        padding: 10,
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: "stretch",
    },
    camera: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end",
    },
    cameraBtn:{
        width: '100%',
        height: '30%',
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center'
     }
});

export default styles;
