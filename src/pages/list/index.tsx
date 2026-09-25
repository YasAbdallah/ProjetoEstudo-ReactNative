import React, { useContext, useRef } from "react";
import { FlatList, Text, View } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/Input";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { themas } from "../../global/themes";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";
import { AuthContextList } from "../../context/authContextList";
import { AuthContextType, PropCard } from "../../global/Props";
import Swipeable, { SwipeableMethods } from 'react-native-gesture-handler/ReanimatedSwipeable';

const getFlagColor = (flag: PropCard["flag"]) => flag === "urgente" ? themas.colors.red : themas.colors.lightBlue; 


export default function List() {
    const { taskList, handleEdit, handleDelete } = useContext<AuthContextType>(AuthContextList);
    const swipeableRef = useRef<SwipeableMethods>(null);


    const renderRightActions = () => {
        return (
            <View style={[style.button, { backgroundColor: "#ef4444" }]}>
                <MaterialIcons
                    name="delete"
                    size={28}
                    color={"#fff"}
                />
            </View>
        );
    }

    const renderLeftActions = () => {
        return (
            <View style={[style.button, { backgroundColor: "#3b82f6" }]}>
                <MaterialIcons
                    name="edit"
                    size={28}
                    color={"#fff"}
                />
            </View>
        );
    }

    const handleSwipeOpen = (direction: "right" | "left", item: PropCard) => {
        if (direction === "left") {
            handleDelete(item);
        }

        if (direction === "right") {
            handleEdit(item);
        }

        swipeableRef.current?.close();
    }

    const _renderCard = (Props: PropCard, index: any) => {
        const color = getFlagColor(Props.flag);

        return (
            <Swipeable
                ref={(ref) => {swipeableRef.current = ref}}
                key={index}
                renderRightActions={renderRightActions}
                renderLeftActions={renderLeftActions}
                onSwipeableOpen={(direction) => handleSwipeOpen(direction, Props)}
            >
                <View style={style.card}>
                    <View style={style.rowCard}>
                        <View style={style.rowCardLeft}>
                            <Ball color={color} />
                            <View style={{ flex: 1 }}>
                                <Text style={style.titleCard}>{Props.title}</Text>
                                <Text style={style.descriptionCard}>{Props.description}</Text>
                                <Text style={style.descriptionCard}>
                                    {Props.timeLimit ? `Até: ${new Date(Props.timeLimit).toLocaleString("pt-BR")}` : "Até: --"}
                                </Text>
                            </View>
                            <Flag caption={Props.flag} color={color} />
                        </View>
                    </View>
                </View>
            </Swipeable>
        );
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Text style={style.greeting}>Bom dia, <Text style={{fontWeight: "bold"}}>Yasser I.</Text></Text>
                <View style={style.boxInput}>
                    <Input
                        IconLeft={MaterialIcons}
                        iconName="search"
                        iconColor={themas.colors.gray}
                        iconSize={20}
                    />
                </View>
            </View>
            <View style={style.boxList}>
                <FlatList 
                    data={taskList}
                    style={{marginTop:40, paddingHorizontal: 30}}
                    keyExtractor={(item) => item.item.toString()}
                    renderItem={({ item, index }) => _renderCard(item, index)}
                />
            </View>
        </View>
    );
}