import React, { useEffect, useState } from "react";
import { Modal, View, Platform } from "react-native";
import { DateTimePicker } from '@expo/ui/community/datetime-picker';
import { style } from "./styles";

type CustomDateTimePickerProps = {
    type: "date" | "time";
    onDateChange: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
}

const CustomDateTimePicker = ({type, onDateChange, show, setShow}: CustomDateTimePickerProps) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        if (onDateChange) {
            onDateChange(date);
        }
    }, [date, onDateChange]);

    const onChange = (event: any, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false);
    }

    return (
        <Modal
            transparent={true}
            visible={show}
            onRequestClose={() => setShow(false)}
        >
            <View style={style.modalOverlay}>
                <View style={[
                        style.container,
                        Platform.OS === 'android' && {backgroundColor: "transparent"}
                    ]}>
                        <DateTimePicker
                            value={date}
                            mode={type}
                            display={Platform.OS === 'ios' ? 'inline' : 'default'}
                            onValueChange={onChange}
                        />
                </View>
            </View>

        </Modal>
    );
}


export default CustomDateTimePicker;