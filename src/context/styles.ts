import { StyleSheet } from "react-native";
import { themas } from "../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%"
    },
    header: {
        width: "100%",
        height: 40,
        paddingHorizontal: 40,
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    content: {
        width: "100%",
        paddingHorizontal: 20
    },
    containerFlag: {
        width: "100%",
        padding: 10
    },
    label: {
        fontWeight: "bold",
        color: "#000"
    },
    rowFlags: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10
    },
    toucheble: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        backgroundColor: themas.colors.lightGray,
        paddingHorizontal: 20,
        justifyContent: "center",
        marginTop: 10,
    },
    viewDateTimePicker: {
        flexDirection: "row",
        gap: 10,
        width: "100%" 
    },
    tituloInput: {
        width: "100%",
        height: 40,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 20,
        backgroundColor: themas.colors.lightGray,
        paddingHorizontal: 20,
        marginTop: 10,
        color: "#000",
    }
})