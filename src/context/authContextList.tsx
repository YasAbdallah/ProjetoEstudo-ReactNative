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
import { AuthContextType, PropCard } from "../global/Props";

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
    const [taskList, setTaskList] = useState<PropCard[]>([]);


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


    const handleSave = async () => {
        if(!title || !description || !selectedFlag || !selectedDate || !selectedTime) {
            return Alert.alert("Atenção!","Por favor, preencha todos os campos.");
        }

        try {
            const timeLimit = new Date(
                selectedDateValue.getFullYear(),
                selectedDateValue.getMonth(),
                selectedDateValue.getDate(),
                selectedTimeValue.getHours(),
                selectedTimeValue.getMinutes()
            ).toISOString();

            const newItem: PropCard = {
                item: item !== 0 ? item : Date.now(),
                title,
                description,
                flag: selectedFlag as PropCard["flag"],
                timeLimit,
            };

            const storageData = await AsyncStorage.getItem("taskList");
            const taskList:PropCard[] = storageData ? JSON.parse(storageData) as PropCard[] : [];

            const index = taskList.findIndex((task) => task.item === newItem.item);
            const nextTaskList = [...taskList];

            if(index === -1){
                nextTaskList.push(newItem);
            }else{
                nextTaskList[index] = newItem;
            }

            await AsyncStorage.setItem("taskList", JSON.stringify(nextTaskList));

            setTaskList(nextTaskList);
            clearFields();
            onClose();

            Alert.alert("Tarefa criada com sucesso!");
        } catch (error) {
            Alert.alert("Erro ao criar tarefa.", `${error}` );
        }
    }

    const handleEdit = async (itemUpdate:PropCard) => {
        try {
            setTitle(itemUpdate.title);
            setDescription(itemUpdate.description);
            setItem(itemUpdate.item);

            const timeLimit = new Date(itemUpdate.timeLimit);
            setSelectedDate(timeLimit.toLocaleDateString());
            setSelectedTime(timeLimit.toLocaleTimeString());

            onOpen();
        } catch (error) {
            Alert.alert("Erro ao tentar recuperar dados.", "Ocorreu um erro ao tentar recuperar dados para editar o item.");
        }
    };

    const handleDelete = async (itemDelete:PropCard) => {
        try {
            const storageData = await AsyncStorage.getItem("taskList");
            const taskList:Array<PropCard> = storageData ? JSON.parse(storageData) : [];

            const updatedTaskList = taskList.filter(item => item.item !== itemDelete.item);
            await AsyncStorage.setItem("taskList", JSON.stringify(updatedTaskList));
            setTaskList(updatedTaskList);
        } catch (error) {
            Alert.alert("Erro ao excluir o item.", "Ocorreu um erro inesperado ai tentar excluir o item.")
        }
    };

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
        <AuthContextList.Provider value={{ onOpen, taskList, handleSave, handleEdit, handleDelete }}>
            {props.children}
            <Modalize
                ref={modalizeRef}
                childrenStyle={{height: Dimensions.get("window").height / 1.7}}
                adjustToContentHeight={true}
            >
                {_container()}
            </Modalize>
        </AuthContextList.Provider>
    )
}

export const useAuth = () => useContext(AuthContextList);