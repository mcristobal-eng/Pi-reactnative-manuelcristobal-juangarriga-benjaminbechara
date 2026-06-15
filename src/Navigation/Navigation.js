import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Home from "../screens/home"
import NewPost from "../screens/newposts"
import MiPerfil from "../screens/profile"
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
const Tab = createBottomTabNavigator();

function Navigation(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} options={
    { tabBarIcon: () => <FontAwesome name="home" size={20} color="black" /> }
} />
        <Tab.Screen name="NewPost" component={NewPost} options={
    { tabBarIcon: () => <MaterialIcons name="post-add" size={20} color="black" /> }
} />
        <Tab.Screen name="MiPerfil" component={MiPerfil} options={
    { tabBarIcon: () => <Ionicons name="person-circle" size={20} color="black" /> }
} />
        </Tab.Navigator>
    )
}

export default Navigation;

