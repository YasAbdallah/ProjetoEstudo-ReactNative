import MaterialIcons from "@react-native-vector-icons/material-icons";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Dimensions, Text, TextInput, TouchableOpacity, View, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import { Modalize } from "react-native-modalize";
import { Input } from "../components/Input";
import { themas } from "../global/themes";
import { Flag } from "../components/Flag";
import { style } from "./styles";
import CustomDateTimePicker from "../components/CustomDateTimePicker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType } from "../global/Props";

export const AuthContextList = createContext<AuthContextType>({} as AuthContextType);

const flags = [
    { caption: "urgente", color: themas.colors.red },
    { caption: "opcional", color: themas.colors.lightBlue },
]

export const AuthProviderList = (props: any): any => {
    const modalizeRef = useRef<Modalize>(null);

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedFlag, setSelectedFlag] = useState<string>("urgente");
    const [selectedDateValue, setSelectedDateValue] = useState<Date>(new Date());
    const [selectedTimeValue, setSelectedTimeValue] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<string>("");
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [item, setItem] = useState<number>(0);
    const [taskList, setTaskList] = useState<Array<any>>([]);


    const [showDataPicker, setShowDataPicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onOpen = () => {
        modalizeRef.current?.open();
    }

    const onClose = () => {
        modalizeRef.current?.close();
    }

    useEffect(() => {
        getTaskList();
    }, [])

    const _renderFlags = () => {
        return flags.map((flag, index) => (
            <TouchableOpacity key={index}
                onPress={() => setSelectedFlag(flag.caption)}
            >
                <Flag caption={flag.caption} color={flag.color} selected={selectedFlag === flag.caption} />
            </TouchableOpacity>
        ));
    }

    const handleDateChange = (date: Date) => {
        const nextDate = new Date(date);
        setSelectedDateValue(nextDate);
        setSelectedDate(nextDate.toLocaleDateString());
    }

    const handleTimeChange = (time: Date) => {
        const nextTime = new Date(time);
        setSelectedTimeValue(nextTime);
        setSelectedTime(nextTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }

    const clearFields = () => {
        setTitle("");
        setDescription("");
        setSelectedFlag("urgente");
        setSelectedDateValue(new Date());
        setSelectedTimeValue(new Date());
        setSelectedDate("");
        setSelectedTime("");
        setItem(0);
    }

    const handleOpen = () => {
        clearFields();
        onOpen();
    }

    const handleSave = async () => {
        if(!title || !description || !selectedFlag ) {
            Alert.alert("Por favor, preencha todos os campos.");
            return;
        }

        try {
            const newItem = {
                item:  Date.now(),
                title: title,
                description: description,
                flag: selectedFlag,
                timeLimit: new Date(selectedDateValue.getFullYear(), selectedDateValue.getMonth(), selectedDateValue.getDate(), selectedTimeValue.getHours(), selectedTimeValue.getMinutes()).toISOString()
            }

            await AsyncStorage.setItem("taskList", JSON.stringify(newItem));

            setTaskList(prevList => [...prevList, newItem]);
            Alert.alert("Tarefa criada com sucesso!");
            handleOpen();
            onClose();

        } catch (error) {
            Alert.alert(`Erro ao criar tarefa.` );
        }
    }

    const handleEdit = () => {return};
    const handleDelete = () => {return};

    async function getTaskList() {
        try {
            const storageData = await AsyncStorage.getItem("taskList");
            const taskList = storageData ? JSON.parse(storageData): [];
            setTaskList(taskList);
        } catch (error) {
            Alert.alert("Ocorreu um erro ao listar as tarefas.");
        }
    }


    const _container = () => {
        return (
            <KeyboardAvoidingView
                style={style.container}
                behavior={Platform.OS === "ios" ? "padding" : "padding"}
            >
                <View style={style.header}>
                    <TouchableOpacity onPress={() => onClose()}>
                        <MaterialIcons
                            name="close"
                            size={30}
                        ></MaterialIcons>
                    </TouchableOpacity>
                    <Text style={style.title}>Criar Tarefa</Text>
                    <TouchableOpacity onPress={() => {handleSave()}}>
                        <MaterialIcons
                            name="check"
                            size={30}
                        ></MaterialIcons>
                    </TouchableOpacity>
                </View>
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={style.content}>
                        <Text style={style.label}>Titulo:</Text>
                        <TextInput
                            value={title}
                            onChangeText={setTitle}
                            placeholder="Digite o título"
                            placeholderTextColor="#999"
                            style={style.tituloInput}
                        />
                        <Input
                            text="Descricao:"
                            labelStyle={style.label}
                            placeholder="Digite a descrição"
                            placeholderTextColor="#999"
                            height={100}
                            multiline
                            numberOfLines={5}
                            value={description}
                            onChangeText={setDescription}
                            textAlignVertical="top"
                        />

                        <View style={style.viewDateTimePicker}>
                            <View style={{ flex: 1 }}>
                                <Text style={style.label}>Data Limite:</Text>
                                <TouchableOpacity
                                    onPress={() => setShowDataPicker(true)}
                                    style={style.toucheble}
                                >
                                    <Text style={{ color: selectedDate ? "#000" : "#999" }}>
                                        {selectedDate || "Selecione a data"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={style.label}>Hora Limite:</Text>
                                <TouchableOpacity
                                    onPress={() => setShowTimePicker(true)}
                                    style={style.toucheble}
                                >
                                    <Text style={{ color: selectedTime ? "#000" : "#999" }}>
                                        {selectedTime || "Selecione a hora"}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <CustomDateTimePicker
                            type={"date"}
                            value={selectedDateValue}
                            show={showDataPicker}
                            setShow={setShowDataPicker}
                            onDateChange={handleDateChange}
                        />
                        <CustomDateTimePicker
                            type={"time"}
                            value={selectedTimeValue}
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
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }

    return (
        <AuthContextList.Provider value={{ onOpen, taskList, handleEdit, handleDelete }}>
            {props.children}
            <Modalize
                ref={modalizeRef}
                modalHeight={Dimensions.get("window").height * 0.8}
                panGestureEnabled={false}
                tapGestureEnabled={false}
                avoidKeyboardLikeIOS={true}
                keyboardAvoidingBehavior="padding"
                keyboardAvoidingOffset={Platform.OS === "ios" ? 20 : 0}
                disableScrollIfPossible={false}
                scrollViewProps={{
                    keyboardShouldPersistTaps: "always",
                    showsVerticalScrollIndicator: false,
                }}
                childrenStyle={{ flex: 1 }}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);