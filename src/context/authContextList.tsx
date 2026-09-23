import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { createContext, useContext, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, Platform } from "react-native";
import { Modalize } from "react-native-modalize";
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import CustomDateTimePicker from "../components/CustomDateTimePicker";


type formProps = {
    title: string;
    description: string;
    selectedFlag: string;
    selectedDate: Date;
    selectedTime: Date;
}

export const AuthContextList = createContext({});

const flags = [
    { caption: "urgente", color: themas.colors.red },
    { caption: "opcional", color: themas.colors.lightBlue },
]

export const AuthProviderList = (props: any): any => {
    const modalizeRef = useRef<Modalize>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedFlag, setSelectedFlag] = useState<string>("urgente");
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [selectedTime, setSelectedTime] = useState<Date>(new Date());


    const [showDataPicker, setShowDataPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onOpen = () => {
        modalizeRef.current?.open();
    }

    const onClose = () => {
        modalizeRef.current?.close();
    }

    const _renderFlags = () => {
        return flags.map((flag, index) => (
            <TouchableOpacity key={index}>
                <Flag caption={flag.caption} color={flag.color} />
            </TouchableOpacity>
        ));
    }

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    }

    const handleTimeChange = (time: Date) => {
        setSelectedTime(time);
    }

    const _container = () => {
        return (
            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={style.header}>
                    <TouchableOpacity onPress={() => onClose()}>
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
                        value={title}
                        onChangeText={setTitle}
                    />
                    <Input
                        text="Descricao:"
                        labelStyle={style.label}
                        height={100}
                        multiline
                        numberOfLines={5}
                        value={description}
                        onChangeText={setDescription}
                        textAlignVertical="top"
                    />

                    <View style={{ flexDirection: "row", gap: 10, width: "100%" }}>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setShowDataPicker(true)}
                        >
                            <Input
                                text="Data Limite:"
                                labelStyle={style.label}
                                editable={false}
                                value={selectedDate.toLocaleDateString()}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => setShowTimePicker(true)}
                        >
                            <Input
                                text="Hora Limite:"
                                labelStyle={style.label}
                                editable={false}
                                value={selectedTime.toLocaleTimeString()}
                            />
                        </TouchableOpacity>
                    </View>
                    <CustomDateTimePicker
                        type={"date"}
                        show={showDataPicker}
                        setShow={setShowDataPicker}
                        onDateChange={handleDateChange}
                    />
                    <CustomDateTimePicker
                        type={"time"}
                        show={showTimePicker}
                        setShow={setShowTimePicker}
                        onDateChange={handleTimeChange}
                    />
                </View>
                <View style={style.containerFlag}>
                    <Text style={style.label}>Flags: </Text>
                    <View style={style.rowFlags}>
                        {_renderFlags()}
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    return (
        <AuthContextList.Provider value={{ onOpen }}>
            {props.children}
            <Modalize
                ref={modalizeRef}
                childrenStyle={{ height: Dimensions.get("window").height * 1.7 }}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);

const style = StyleSheet.create({
    container: {
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
    },
    rowFlags: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10
    }
})