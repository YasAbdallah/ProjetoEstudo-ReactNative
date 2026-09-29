import React, { useContext } from "react";
import { TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { MaterialIcons } from '@react-native-vector-icons/material-icons';
import { themas } from "../../global/themes";
import { AuthContextList } from "../../context/authContextList";

type Props = {
    state: { index: Number };
    navigation: { navigate: (screenName: string) => void };
}

export default ({ state, navigation }: Props) => {
    const { onOpen } = useContext<any>(AuthContextList);

    const go = (screenName: string) => {
        navigation.navigate(screenName);
    }

    return (
        <View style={style.tabArea}>
            <TouchableOpacity style={style.item} onPress={() => go("list")}>
                <MaterialIcons
                    name="list"
                    style={{ opacity: state.index === 0 ? 1 : 0.5, color: themas.colors.primary, fontSize: 32 }}
                />
            </TouchableOpacity>
            <TouchableOpacity style={style.tabItemButton} onPress={() => onOpen()}>
                <View style={{ width: "100%", left: 10, top: 4 }}>
                    <MaterialIcons
                        name="add"
                        size={40}
                        color={"#fff"}
                    />
                </View>
                <View style={{ flexDirection: "row-reverse", width: "100%", right: 10, bottom: 4 }}>
                    <MaterialIcons
                        name="edit"
                        size={30}
                        color={"#fff"}
                    />
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={style.item} onPress={() => go("user")}>
                <MaterialIcons
                    name="supervised-user-circle"
                    style={{ opacity: state.index === 1 ? 1 : 0.5, color: themas.colors.primary, fontSize: 32 }}
                />
            </TouchableOpacity>
        </View>
    );
}