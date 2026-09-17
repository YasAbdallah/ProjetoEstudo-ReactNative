import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../pages/user";
import List from "../pages/list";

export default function BottomRoutes(){
    const Tab = createBottomTabNavigator();

    return(
        <Tab.Navigator>
            <Tab.Screen 
                name="list"
                component={List}
            />
            <Tab.Screen 
                name="user"
                component={User}
            />
        </Tab.Navigator>
    );
}