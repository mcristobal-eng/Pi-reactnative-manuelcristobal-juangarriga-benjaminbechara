import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';

function MiPerfil() {
    const [misPosteos, setMisPosteos] = useState([]);
    const [loading, setLoading] = useState(true);
    let email = '';
    if (auth.currentUser) {
        email = auth.currentUser.email;
    }

    useEffect(() => {
        const nosuscripto = db.collection('posts')
            .where('email', '==', auth.currentUser.email)
            .onSnapshot(
                docs => {
                    let posts = [];
                    docs.forEach(doc => {
                        posts.push({ 
                            id: doc.id, 
                            data: doc.data() });
                    });
                    setMisPosteos(posts);
                    setLoading(false);
                },
                error => {
                    console.log(error);
                    setLoading(false);
                }
            );

        return () => nosuscripto();
    }, []);

    const manejoLogout = () => {
        auth.signOut().catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Mi Perfil</Text>
            <Text>Email: {email}</Text>

            <Pressable style={styles.logoutBtn} onPress={manejoLogout}>
                <Text style={styles.textoBtn}>Cerrar Sesión</Text>
            </Pressable>

            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <FlatList
                    data={misPosteos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.postCard}>
                            <Text>{item.data.descriptionPost}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: '#f2f2f2' },
    titulo: { fontSize: 20, fontWeight: 'bold', marginBottom: 5 },
    logoutBtn: { backgroundColor: 'red', padding: 10, borderRadius: 4, marginTop: 10 },
    textoBtn: { color: 'white', fontWeight: 'bold' },
    postCard: { padding: 10, borderWidth: 1, borderColor: '#ccc', marginBottom: 10 }
});

export default MiPerfil;