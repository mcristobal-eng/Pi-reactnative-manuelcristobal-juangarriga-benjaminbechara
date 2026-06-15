import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from 'react-native';
import { db, auth } from "../firebase/config";

function Register({ navigation }) {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [register, setRegister] = useState(false);
    const [registerError, setRegisterError] = useState('');

    const onSubmit = () => {
        auth.createUserWithEmailAndPassword(email, password)
            .then(response => {
                setRegister(true);
                db.collection('users').add({
                    email: email,
                    nombreUsuario: username,
                    createdAt: Date.now(),
                })
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    setRegisterError('Este email ya está registrado.');
                } else {
                    setRegisterError('Falló el registro. Intentá de nuevo.');
                }
            });
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/logo_plato.png')}
                style={styles.logo}
            />
            <Text style={styles.slogan}>Compartí lo que cocinás</Text>

            <TextInput
                style={styles.input}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
                value={email}
            />

            <TextInput
                style={styles.input}
                placeholder='Nombre de usuario'
                onChangeText={text => setUsername(text)}
                value={username}
            />

            <TextInput
                style={styles.input}
                placeholder='Contraseña'
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
                value={password}
            />

            {registerError ? <Text style={styles.error}>{registerError}</Text> : null}

            <Pressable style={styles.button} onPress={() => onSubmit()}>
                <Text style={styles.buttonText}>Registrate</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Login')}>
                <Text style={styles.link}>¿Ya tenés cuenta? Iniciá sesión</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 8,
    },
    slogan: {
        color: '#888',
        fontSize: 13,
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#FF6B35',
        borderStyle: 'solid',
        borderRadius: 6,
        marginVertical: 10,
    },
    button: {
        width: '100%',
        backgroundColor: '#FF6B35',
        paddingHorizontal: 10,
        paddingVertical: 6,
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#FF6B35',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
    },
    error: {
        color: 'red',
    },
    link: {
        marginTop: 14,
        color: '#FF6B35',
        fontSize: 13,
    },
});

export default Register;