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
                <Text>💬 Comentar</Text>
            </Pressable>

        </View>
    );
}
export default Post;

const styles = StyleSheet.create({
    card: { padding: 15, marginBottom: 20 }
})