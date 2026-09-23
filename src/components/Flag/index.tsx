import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { style } from "./styles";

type FlagProps = {
    caption: string;
    color: string;
};

export function Flag({caption, color}: FlagProps){
     return (
        <TouchableOpacity style={[style.container, { backgroundColor: color }]}>
            <Text style={{ color: "#fff" }}>{caption}</Text>
        </TouchableOpacity>
    );
}