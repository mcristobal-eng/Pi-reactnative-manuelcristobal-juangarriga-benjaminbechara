import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { auth } from "./src/firebase/config";
import { ActivityIndicator } from "react-native";

import Register from "./src/screens/register";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import MiPerfil from "./src/screens/profile";
import NewPost from "./src/screens/newposts";
import Comentarios from "./src/screens/comments";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} options={
        { tabBarIcon: () => <FontAwesome name='home' size={20} color='black' /> }
      } />
      <Tab.Screen name="NewPost" component={NewPost}
        options={
          { tabBarIcon: () => <MaterialIcons name='post-add' size={20} color='black' /> }
        } />
      <Tab.Screen name="MiPerfil" component={MiPerfil} options={
        { tabBarIcon: () => <Ionicons name='person-circle' size={20} color='black' /> }
      } />
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="blue" style={{ flex: 1 }} />;

  return (
    <NavigationContainer>
      <Stack.Navigator >
        {user ? (
          <>
            <Stack.Screen name="Principal" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Comentarios" component={Comentarios} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;