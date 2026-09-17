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
        borderRadius: 20,
        justifyContent: "center",
        backgroundColor: themas.colors.lightGray,
    },
    input: {
        flex: 1,
        height: "100%",
        color: "#000000",
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