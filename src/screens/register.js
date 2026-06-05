import React, { useState } from "react"; 
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { db, auth } from "../components/firebase/config";

function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [ register, setRegister] = useState(false);
       

     const onSubmit = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                setRegister (true);

                db.collection('users').add({
                    email: email, 
                    nombreUsuario: username,
                    createdAt: Date.now(),

                })
               
                navigation.navigate('Login');
            })
            .catch(error => {
                Alert.alert('Error', error.message);
            });


        
    };
    

    return (
        <View style={styles.container}>
            <Text>Register</Text>

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            
            <TextInput
                style={styles.input}
                placeholder='nombre de usuario'
                onChangeText={text => setUsername(text)}
                value={username}
            />

            <TextInput
                style={styles.input}
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Registrate</Text>
            </Pressable>

            <View>
                <Text>Email: {email}</Text>
                <Text>Usuario: {username}</Text>
                <Text>Contraseña: {password}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#28a745',
    },
    buttonText: {
        color: '#fff',
    },
});

export default Register; 
