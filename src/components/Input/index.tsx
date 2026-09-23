import React, {forwardRef } from "react";
import { StyleProp, Text, TextInput, TextInputProps, TextStyle, TouchableOpacity, View } from 'react-native';
import { style } from "./styles";
import  MaterialIcons  from '@react-native-vector-icons/material-icons';


type IconComponent = React.ComponentType<React.ComponentProps<typeof MaterialIcons>>;

type inputProps = TextInputProps & {
    text?: string;
    iconName?: React.ComponentProps<typeof MaterialIcons>["name"]; 
    IconLeft ?: IconComponent;
    IconRight ?: IconComponent;
    iconColor?: string;
    iconSize?: number;
    onIconPress?: () => void;
    height?: number;
    labelStyle?: StyleProp<TextStyle>
}; 

export const Input = forwardRef<TextInput, inputProps>(
    (Props:inputProps, ref) => {

    const {text, iconName, IconLeft, IconRight, iconColor, iconSize, onIconPress, height, labelStyle, ...rest} = Props;
    
    const calculateSizeWidth = () => {
        if(IconLeft && IconRight){return "80%"}
        if(IconLeft || IconRight){return "90%"}
        return "100%";
    }
     const calculateSizePadding = () => {
        if(IconLeft && IconRight){return 0}
        if(IconLeft || IconRight){return 10}
        return 20;
    }

    return (
        <>
            {text && (<Text style={[style.titleInput, labelStyle]}>{text} </Text>)}
            <View style={[
                style.boxInput, 
                {
                    padding: calculateSizePadding(),
                    height: height || 40
                }
            ]}>
                {IconLeft && iconName &&(
                    <TouchableOpacity 
                        onPress={onIconPress} 
                        style={style.buttom}
                    >
                        <IconLeft 
                            name={iconName} 
                            size={iconSize} 
                            color={iconColor} 
                            style={style.Icon}
                        />
                    </TouchableOpacity>
                )}

                <TextInput
                    ref={ref}
                    style={[
                        style.inputText, 
                        {
                            width: calculateSizeWidth()
                        }
                    ]}
                    {...rest}
                />
                {IconRight && iconName &&(
                    <TouchableOpacity 
                        onPress={onIconPress}
                    >
                        <IconRight 
                            name={iconName} 
                            size={iconSize} 
                            color={iconColor} 
                            style={style.Icon}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </>
    );
});