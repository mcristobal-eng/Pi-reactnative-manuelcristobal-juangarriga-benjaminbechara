import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { auth } from "../firebase/config";
import Login from "../screens/login"
import Register from "../screens/register"
import TabNavigator from "../Navigation/Navigation"
import Comentarios from "../screens/comments"
const Stack = createNativeStackNavigator();

function StackNavigation(){
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            setUsuario(user)
            setLoading(false)
        });
    }, []);

if (loading) return null

    return (
        <Stack.Navigator>
            {usuario ? (
                <>
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
                <Stack.Screen name="Comentarios" component={Comentarios} />
                </>
            ) : (
                <>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Register" component={Register}/>
                
                </>
            )}
        </Stack.Navigator>
    );
}

export default StackNavigation;