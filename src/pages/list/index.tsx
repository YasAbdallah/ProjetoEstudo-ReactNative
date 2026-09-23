import React from "react";

import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import { Input } from "../../components/Input";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { themas } from "../../global/themes";
import { Ball } from "../../components/Ball";
import { Flag } from "../../components/Flag";

type PropCard = {
    item: number,
    title: string,
    description: string,
    flag: "urgente" | "opcional"
}

const data:Array<PropCard> = [
    {
        item: 0,
        title: "Realizar a locao de casa!",
        description: "Pagina 10 a 20",
        flag: "urgente"
    },
    {
        item: 1,
        title: "Passear com o cachorro!",
        description: "Ele adora.",
        flag: "urgente"
    },
    {
        item: 2,
        title: "Sair para tomar acai!",
        description: "La no the Beast pq sim.",
        flag: "urgente"
    }
]

export default function List() {

    const _renderCard = (item:PropCard) => {
        return (
            <TouchableOpacity style={style.card}>
                <View style={style.rowCard}>
                    <View style={style.rowCardLeft}>
                        <Ball color="red"/>
                        <View>
                            <Text style={style.titleCard}>{item.title} Teste</Text>
                            <Text style={style.descriptionCard}>{item.description}</Text>
                        </View>
                        <Flag caption={item.flag} color={themas.colors.red}/>
                    </View>
                </View>
            </TouchableOpacity>
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
                    data={data}
                    style={{marginTop:40, paddingHorizontal: 30}}
                    keyExtractor={(item, index) => item.item.toString()}
                    renderItem={({item}) => {
                        return (_renderCard(item))
                    }}
                />
            </View>
        </View>
    );
}