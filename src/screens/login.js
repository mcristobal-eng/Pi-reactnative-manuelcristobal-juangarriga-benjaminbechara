import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";


function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const onSubmit = () => {
        if (password.length < 6) {
            setError('La contraseña debe tener una longitud mínima de 6 caracteres');
            return;
        }
        auth.signInWithEmailAndPassword(email, password)
            .then(response => {
                setError('');
                
            })
            .catch(error => {
                setError('Credenciales incorrectas');
            });

    };


    return (
        <View style={styles.container}>
            <Text>Login</Text>

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder='password'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null} //muestra si el email está mal escrito. 

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text>¿No tenés cuenta? Registrate</Text>
            </Pressable>

            <View>
                <Text>Email: {email}</Text>
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

export default Login;