import { Dimensions, StyleSheet } from "react-native";
import { themas } from "../../global/themes";

export const style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    header: {
        width: "100%",
        height: Dimensions.get("window").height / 6,
        padding: 20,
        backgroundColor: themas.colors.primary
    },
    greeting: {
        fontSize: 20,
        color: "#fff",
        marginTop: 20
    },
    boxInput: {
        width: "80%"
    },
    boxList: {
        flex: 1,
        width: "100%"
    },
    card: {
        width: "100%",
        minHeight: 86,
        backgroundColor: "#fff",
        marginTop: 10,
        justifyContent: "center",
        padding: 14,
        borderWidth: 1,
        borderColor: themas.colors.lightGray,
        borderRadius: 12
    },
    rowCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    rowCardLeft: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    titleCard: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4
    },
    descriptionCard: {
        color: themas.colors.gray,
        fontSize: 13
    },
    button: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        minWidth: "100%",
        marginVertical: 10,
        borderRadius: 12,
        paddingVertical: 18,
    }
});