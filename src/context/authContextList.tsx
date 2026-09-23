import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { createContext, useContext, useRef } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Modalize } from "react-native-modalize";
import { Input } from "../components/Input";

export const AuthContextList = createContext({});

export const AuthProviderList = (props: any):any => {
    const modalizeRef = useRef<Modalize>(null);

    const onOpen = () => {
        modalizeRef.current?.open();
    }

    const _container = () => {
        return (
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity>
                        <MaterialIcons
                            name="close"
                            size={30}
                        ></MaterialIcons>
                    </TouchableOpacity>
                    <Text style={style.title}>Criar Tarefa</Text>
                    <TouchableOpacity>
                        <MaterialIcons
                            name="check"
                            size={30}
                        ></MaterialIcons>
                    </TouchableOpacity>
                </View>
                <View style={style.content}>
                    <Input 
                        text="Titulo:"
                        labelStyle={style.label}
                    />
                    <Input 
                        text="Descricao:"
                        labelStyle={style.label}
                        height={100}
                        multiline
                        numberOfLines={5}
                    />
                    
                    <View style={{width:"40%"}}>
                        <Input 
                            text="Tempo limite:"
                            labelStyle={style.label}
                        />
                    </View>
                    <View style={style.containerFlag}>
                        <Text style={style.label}>Flags: </Text>
                        <View style={{}}></View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <AuthContextList.Provider value={() => onOpen()}>
            {props.children}
            <Modalize 
                ref={modalizeRef}
                childrenStyle={{height: Dimensions.get("window").height / 1.3}}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);

const style = StyleSheet.create({
    container:{
        width: "100%"
    },
    header: {
        width: "100%",
        height: 40,
        paddingHorizontal: 40,
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold"
    },
    content: {
        width: "100%",
        paddingHorizontal: 20
    },
    containerFlag: {
        width: "100%",
        padding: 10
    },
    label: {
        fontWeight: "bold",
        color: "#000"
    }
})