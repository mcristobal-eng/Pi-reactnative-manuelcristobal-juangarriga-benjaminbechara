import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { auth } from "./src/firebase/config";

import Register from "./src/screens/register";
import Login from "./src/screens/login";
import Home from "./src/screens/home";
import MiPerfil from "./src/screens/profile";
import NewPost from "./src/screens/newposts";



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (

    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="NewPost" component={NewPost} />
      <Tab.Screen name="MiPerfil" component={MiPerfil} />
    </Tab.Navigator>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        {user ? (
          <Stack.Screen name="Principal" component={TabNavigator} options={{ headerShown: false }} />

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