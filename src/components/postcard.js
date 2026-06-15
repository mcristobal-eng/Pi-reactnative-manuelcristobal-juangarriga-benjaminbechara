import React from "react";
import { View, Text, StyleSheet, Pressable } from 'react-native';
import firebase from 'firebase';
import { db, auth } from '../firebase/config';

function Post(props) {
    const { id, data } = props.data;
    const userEmail = auth.currentUser.email;
    const likes = data.likes;
    const yaLikeo = likes.includes(userEmail)

    function manejoLike() {
        if (yaLikeo) {
            db.collection('posts')
                .doc(id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayRemove(userEmail)
                });
        } else {
            db.collection('posts')
                .doc(id)
                .update({
                    likes: firebase.firestore.FieldValue.arrayUnion(userEmail)
                });
        }
    }
    return (
        <View style={styles.card}>
            <Text style={styles.user}>{props.data.data.email} Dijo:</Text>
            <Text style={styles.desc}>{props.data.data.descriptionPost}</Text>
            <Pressable onPress={() => manejoLike()}>

                <Text style={yaLikeo ? styles.likeActivo : styles.like}>
                    {yaLikeo ? '❤️ Me gusta' : '🤍 Me gusta'} ({likes.length})
                </Text>
            </Pressable>
            <Pressable onPress={() => props.navigation.navigate('Comentarios', { postId: id })}>
                <Text style={styles.comentar}>💬 Comentar</Text>
            </Pressable>

        </View>
    );
}
export default Post;

const styles = StyleSheet.create({
    card: { padding: 15, marginBottom: 10, backgroundColor: 'white', borderRadius: 8, borderWidth: 1, borderColor: '#ddd' },
    user: { fontWeight: 'bold', color: '#FF6B35', marginBottom: 5 },
    desc: { fontSize: 14, marginBottom: 10, color: '#333' },
    like: { color: 'gray', marginBottom: 5 },
    likeActivo: { color: '#FF6B35', marginBottom: 5 },
    comentar: { color: '#555' }
})