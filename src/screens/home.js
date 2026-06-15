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

            <View style={styles.header}>
            <Text style={styles.headerText}>Home</Text>
            </View>
            <FlatList
                data={posteos}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <Post data={item} navigation={props.navigation} />}

            />


            <Pressable style={styles.logoutBtn} onPress={() => auth.signOut()}>
                <Text style={styles.logoutText}>Logout</Text>
            </Pressable>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 10 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    header: { backgroundColor: '#FF6B35', padding: 15, alignItems: 'center' },
    headerText: { color: 'white', fontSize: 22, fontWeight: 'bold' },
    logoutBtn: { backgroundColor: 'red', padding: 10, borderRadius: 4, margin: 10 },
    logoutText: { color: 'white', fontWeight: 'bold', textAlign: 'center' }
});

export default Home;



