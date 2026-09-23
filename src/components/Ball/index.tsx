import React from "react";
import { View } from "react-native";
import { style } from "./styles";

type BallProps = {
    color: string;
};

export function Ball(Props: BallProps){
    return  (
        <View style={[style.ball, {borderColor: Props.color || "gray"}]} />
    );
}