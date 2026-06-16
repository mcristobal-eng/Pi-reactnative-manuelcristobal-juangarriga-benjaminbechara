import React, { useState } from "react";
import { View, Text, Pressable, TextInput, StyleSheet, Image } from 'react-native';
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
            <Image
                source={require('../../assets/logo_plato.png')}
                style={styles.logo}
            />
            <Text style={styles.slogan}>Compartí lo que cocinás</Text>

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

            {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

            <Pressable style={styles.button} onPress={onSubmit}>
                <Text style={styles.buttonText}>Login</Text>
            </Pressable>

            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text>¿No tenés cuenta? Registrate</Text>
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
    link: {
        marginTop: 14,
        color: '#FF6B35',
        fontSize: 13,
    },
});

export default Login;