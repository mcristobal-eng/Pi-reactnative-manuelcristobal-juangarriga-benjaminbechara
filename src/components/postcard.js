import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function Post(props){
    return(
        <View style = {styles.card}>
            <Text style={styles.user}>{props.data.data.email} dijo:</Text>
            <Text style={styles.desc}>{props.data.data.descriptionPost}</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    card: {padding: 15, marginBottom: 20}
})