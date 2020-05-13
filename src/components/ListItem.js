import React from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import {THEME} from "../theme";

export const ListItem = props => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => props.onOpen(props.text)}
        >
        <View style={styles.button} >
            <Text style={styles.title}>{props.text}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.MAIN_COLOR,

    },
    title: {
        color: '#fff',
        fontFamily: 'open-bold',
        fontSize: 20
    }
})
