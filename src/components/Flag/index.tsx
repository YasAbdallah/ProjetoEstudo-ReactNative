import React from "react";
import { Text, View } from "react-native";
import { style } from "./styles";

type FlagProps = {
    caption: string;
    color: string;
    selected?: boolean;
};

export function Flag({caption, color, selected}: FlagProps){
     return (
        <View 
            style={
                [
                    style.container, 
                    { backgroundColor: color },
                    selected && {borderWidth: 2}
                ]
            }

        >
            <Text style={{ color: "#fff" }}>{caption}</Text>
        </View>
    );
}