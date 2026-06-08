import React, { Component } from 'react';
import { View, Text, FlatList, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { db, auth } from '../../firebase/config';

class MiPerfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
            misPosteos: [],
            loading: true
        };
    }

    componentDidMount() {
        db.collection('posts')
            .where('owner', '==', auth.currentUser.email)
            .onSnapshot(docs => {
                let posteos = [];

                docs.forEach(doc => {
                    posteos.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });

                this.setState({
                    misPosteos: posteos,
                    loading: false
                });
            });
    }

    handleLogout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate('Login'))
            .catch(error => console.log(error));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Mi Perfil</Text>

                <Text>Email: {auth.currentUser.email}</Text>

                <Pressable
                    style={styles.logoutBtn}
                    onPress={() => this.handleLogout()}
                >
                    <Text>Cerrar Sesión</Text>
                </Pressable>

                {this.state.loading ? (
                    <ActivityIndicator size="large" color="blue" />
                ) : (
                    <FlatList
                        data={this.state.misPosteos}
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
}

export default MiPerfil;