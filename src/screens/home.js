import React, { useEffect, useState } from "react";
import { View, Text, Pressable, FlatList, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";
import Post from '../components/postcard';

function Home(props) {
    const [posteos, setPosteos] = useState([])
    useEffect(() => {
        const unfollow = db.collection('posts')
            .orderBy('createdAt', 'desc')
            .onSnapshot(
                docs => {
                    let postsCargados = [];
                    docs.forEach(doc => {
                        postsCargados.push({
                            id: doc.id,
                            data: doc.data()
                        })
                    })
                    setPosteos(postsCargados);
                },

            );

    }, [])
    return (
        <View style={styles.container}>

            <Text style={styles.title}>Home</Text>
            <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Post data={item} navigation={props.navigation} />}

            />


            <Pressable onPress={() => auth.signOut()}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 }
});

export default Home;



