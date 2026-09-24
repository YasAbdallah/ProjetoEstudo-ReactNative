import React from "react";
import { Modal, View, Platform } from "react-native";
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { style } from "./styles";

type CustomDateTimePickerProps = {
    type: "date" | "time";
    value?: Date;
    onDateChange: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

const CustomDateTimePicker = ({type, value, onDateChange, show, setShow}: CustomDateTimePickerProps) => {
    const onValueChange = (_event: any, selectedDate?: Date) => {
        const currentDate = selectedDate ? new Date(selectedDate) : value ? new Date(value) : new Date();
        onDateChange(currentDate);
        setShow(false);
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            animationType="slide"
            statusBarTranslucent={true}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}>
                <View style={[
                        style.container,
                        Platform.OS === 'android' && {backgroundColor: "transparent"}
                    ]}>
                        <DateTimePicker
                            value={value ?? new Date()}
                            mode={type}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onValueChange={onValueChange}
                            onDismiss={() => setShow(false)}
                        />
                </View>
            </View>

        </Modal>
    );
}


export default CustomDateTimePicker;