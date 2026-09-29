import MaterialIcons from "@react-native-vector-icons/material-icons";
import React from "react";

import { Alert, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    login: undefined,
}
type NavigationProp = StackNavigationProp<RootStackParamList, keyof RootStackParamList>;

export default function User() {
    const navigation = useNavigation<NavigationProp>();

    const handleLogout = () => {
        Alert.alert("Até logo!", "Espero te ver de volta logo.")
        return navigation.reset({routes: [{name: "login"}]})
    }

    return (
        <View style={style.container}>
            <Text style={style.name}>Yasser Ibrahim</Text>
            <TouchableOpacity style={style.logoutButton} onPress={handleLogout}>
                <MaterialIcons
                    name="exit-to-app"
                    style={{color: "gray"}}
                    size={40}
                ></MaterialIcons>
            </TouchableOpacity>
        </View>
    );
}