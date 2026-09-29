import React, { useState } from "react";
import { Alert, Image, Text, View } from "react-native";
import { style } from "./styles";
import Logo from "../../assets/logo2.png";
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
            navigation.reset({routes: [{name: "BottomRoutes"}]});
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <View style={style.container}>
            <View style={style.boxTop}>
                <Text style={style.text}>Bem vindo ao</Text>
                <Image source={Logo}
                    style={style.logo}
                    resizeMode="contain"
                    
                />
            </View>
            <View style={style.boxMid}>
                <Input 
                    onChangeText={setEmail}
                    value={email}
                    text="Email:" 
                    IconRight={MaterialIcons}
                    iconName="email"
                    iconColor={themas.colors.primary} 
                    iconSize={20}

                />
                <Input 
                    onChangeText={setPassword}
                    value={password}
                    text="Senha:" 
                    IconRight={MaterialIcons}
                    iconName={showPassword? "visibility-off": "visibility"} 
                    iconColor={themas.colors.primary} 
                    iconSize={20}
                    secureTextEntry={showPassword}
                    onIconPress={() => setShowPassword(!showPassword)}
                />
                
            </View>
            <View style={style.boxBottom}>
                <Button text="Entrar" loading={loading} onPress={() => getLogin()}/>            
            </View>
            <Text style={style.textBottom}>Não tem conta? <Text style={style.textBottomCreate}>Crie Agora.</Text></Text>
        </View>
    );
}