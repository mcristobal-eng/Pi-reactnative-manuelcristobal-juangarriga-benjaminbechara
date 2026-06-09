import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../../firebase/config';

function MiPerfil(props) {
    const [misPosteos, setMisPosteos] = useState([]);
    const [loading, setLoading] = useState(true);
    let email = '';
    if (auth.currentUser) {
        email = auth.currentUser.email;
    }

    useEffect(() => {
        db.collection('posteos')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let posts = [];

                docs.forEach(doc => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                setMisPosteos(posts);
                setLoading(false);
            });
    }, []);

    const manejoLogout = () => {
        auth.signOut()
            .then(() => props.navigation.navigate('Login'))
            .catch(error => console.log(error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.email}>Mi Perfil</Text>

            <Text>Email: {email}</Text>

            <Pressable
                style={styles.logoutBtn}
                onPress={manejoLogout}
            >
                <Text style={styles.textoBtn}>Cerrar Sesión</Text>
            </Pressable>

            {loading ? (
                <ActivityIndicator size="large" color="blue" />
            ) : (
                <FlatList
                    data={misPosteos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.postCard}>
                            <Text>{item.data.description}</Text>
                        </View>
                    )}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f2f2f2'
    },
    email: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 10
    },
    logoutBtn: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 4,
        marginTop: 10
    },
    textoBtn: {
        color: 'white',
        fontWeight: 'bold'
    },
    postCard: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10
    }
});

export default MiPerfil;