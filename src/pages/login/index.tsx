import React, { useState } from "react";
import { ActivityIndicator, Alert, Image, Text, TouchableOpacity, View } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo.png";
import { themas } from "../../global/themes";
import { Input } from "../../components/Input";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { Button } from "../../components/Button";
import {useNavigation} from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    BottomRoutes: undefined,
}

type NavigationProp = StackNavigationProp<RootStackParamList, keyof RootStackParamList>;

export default function Login(){
    const navigation = useNavigation<NavigationProp>();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(true);
    const [loading, setLoading] = useState(false);

    async function getLogin(){
        try {
            setLoading(true);
            if(!email || !password){
                return Alert.alert("Atencao", "Informe os campos obrigatorios.");
            }
            navigation.navigate("BottomRoutes");
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Image source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                />
                <Text style={style.text}>Bem Vindo de volta!</Text>
            </View>
            <View style={style.boxMid}>
                <Input 
                    onChangeText={setEmail}
                    value={email}
                    text="Email:" 
                    IconRight={MaterialIcons}
                    iconName="email"
                    iconColor={themas.colors.gray} 
                    iconSize={20}

                />
                <Input 
                    onChangeText={setPassword}
                    value={password}
                    text="Senha:" 
                    IconRight={MaterialIcons}
                    iconName={showPassword? "visibility-off": "visibility"} 
                    iconColor={themas.colors.gray} 
                    iconSize={20}
                    secureTextEntry={showPassword}
                    onIconPress={() => setShowPassword(!showPassword)}
                />
                
            </View>
            <View style={style.boxBottom}>
                <Button text="Entrar" loading={loading} onPress={() => getLogin()}/>            
            </View>
            <Text style={style.textBottom}>Nao tem conta? <Text style={style.textBottomCreate}>Crie Agora.</Text></Text>
        </View>
    );
}