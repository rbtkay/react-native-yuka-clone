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
    cameraBtn: {
        width: "100%",
        height: "50%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 25,
    },
    loginBtn: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        paddingTop: 50,
    },
    title: { textAlign: "center", paddingTop: 40, paddingBottom: 50 },
    notFound: {
        paddingTop: 40,
        paddingBottom: 50,
        textAlign: "center",
    },
    detailContent: { paddingRight: 10, paddingLeft: 10 },
});

export default styles;
