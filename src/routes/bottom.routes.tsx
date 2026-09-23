import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import User from "../pages/user";
import List from "../pages/list";
import CustomTabBar from "../components/CustomTabBar";
import { AuthProviderList } from "../context/authContextList";

export default function BottomRoutes() {
    const Tab = createBottomTabNavigator();

    return (
        <AuthProviderList>
            <Tab.Navigator
                screenOptions={{
                    headerShown: false
                }}
                tabBar={prop => <CustomTabBar {...prop} />}
            >
                <Tab.Screen
                    name="list"
                    component={List}
                />
                <Tab.Screen
                    name="user"
                    component={User}
                />
            </Tab.Navigator>

        </AuthProviderList>
    );
}