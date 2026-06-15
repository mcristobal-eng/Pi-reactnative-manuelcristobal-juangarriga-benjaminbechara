import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from '../firebase/config';

function NewPost(props) {
    const [description, setDescription] = useState('');
    function manejoPost() {
        if (description.length > 0) {
            db.collection('posts').add({
                email: auth.currentUser.email,
                descriptionPost: description,
                createdAt: Date.now(),
                likes: []
            })
                .then(() => {
                    setDescription('');
                    props.navigation.navigate('Home')
                })
        } else {
            alert("El post debe contar con al menos un caracter")
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title} >Nuevo Post</Text>
            <TextInput
                style={styles.input}
                placeholder="texto post"
                onChangeText={text => setDescription(text)}
                value={description}
            />
            <Pressable style={styles.btn} onPress={manejoPost}>
                <Text style={styles.txtBtn}>Postear</Text>
            </Pressable>

        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },

});

export default NewPost;