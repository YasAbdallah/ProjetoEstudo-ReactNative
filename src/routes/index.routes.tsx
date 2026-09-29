import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../pages/login";
import BottomRoutes from "./bottom.routes";

export default function Routes(){
    const Stack = createStackNavigator();

    return(
        <Stack.Navigator 
            initialRouteName="login"
            screenOptions={{
                headerShown: false,
                cardStyle: {
                    backgroundColor: "#fff"
                }
            }}
        >
            <Stack.Screen 
                name="login"
                component={Login}
            />
            <Stack.Screen 
                name="BottomRoutes"
                component={BottomRoutes}
            />
        </Stack.Navigator>
    );
}