import { StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    titleInput: {
        color: themas.colors.gray,
        marginTop: 20
    },
    boxInput: {
        width: "100%",
        borderWidth: 1,
        marginTop: 10,
        borderColor: '#ccc',
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 20,
        backgroundColor: themas.colors.lightGray,
    },
    inputText: {
        flex: 1,
        color: "#000",
        fontSize: 16,
        padding: 0,
        textAlignVertical: "center",
        includeFontPadding: false,
    },
    Icon: {
        width: "100%"
    },
    buttom: {
        width: "10%"
    }
});