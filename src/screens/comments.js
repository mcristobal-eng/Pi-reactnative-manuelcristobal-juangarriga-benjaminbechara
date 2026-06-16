import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Pressable, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

function Comentarios(props) {
    const { postId } = props.route.params;
    const [comentario, setComentario] = useState('');
    const [comentarios, setComentarios] = useState([]);

    useEffect(() => {
        const unsub = db.collection('posts')
            .doc(postId)
            .collection('comments')
            .orderBy('createdAt', 'desc')
            .onSnapshot(docs => {
                let lista = [];
                docs.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                setComentarios(lista);
            });

        return () => unsub();
    }, []);

    function enviarComentario() {
        if (comentario === '') {
            return;
        }

        db.collection('posts')
            .doc(postId)
            .collection('comments')
            .add({
                email: auth.currentUser.email,
                texto: comentario,
                createdAt: Date.now(),
            })
            .then(() => {
                setComentario('');
            })
            .catch(error => console.log(error));
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={comentarios}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.comentarioCard}>
                        <Text style={styles.autor}>{item.data.email}</Text>
                        <Text>{item.data.texto}</Text>
                    </View>
                )}
            />
            <TextInput
                style={styles.input}
                placeholder="Escribí un comentario..."
                value={comentario}
                onChangeText={text => setComentario(text)}
            />
            <Pressable style={styles.btn} onPress={() => enviarComentario()}>
                <Text style={styles.btnTxt}>Enviar</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 15 },
    comentarioCard: { padding: 10, borderBottomWidth: 1, borderColor: '#eee', marginBottom: 8 },
    autor: { fontWeight: 'bold', color: '#FF6B35', marginBottom: 2 },
    input: { borderWidth: 1, borderColor: '#FF6B35', borderRadius: 6, padding: 10, marginBottom: 10 },
    btn: { backgroundColor: '#FF6B35', padding: 10, borderRadius: 6, alignItems: 'center' },
    btnTxt: { color: '#fff', fontWeight: 'bold' },
});

export default Comentarios;