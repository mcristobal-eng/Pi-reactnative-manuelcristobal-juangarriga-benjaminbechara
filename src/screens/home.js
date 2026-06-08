import React from "react";
import { View, Text, Pressable } from "react-native";
import { auth } from "../firebase/config";

function Home() {
    return (
        <View>
            <Text>Home</Text>


            <Pressable onPress={() => auth.signOut()}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}

export default Home;



