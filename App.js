import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { auth } from "./src/firebase/config";

import Register from "./src/screens/register";
import Login from "./src/screens/login";
import Home from "./src/screens/home";

const Stack = createNativeStackNavigator();

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => setUser(user));
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        {user ? (
          <Stack.Screen name="Home" component={Home} />
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