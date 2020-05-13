import React from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {THEME} from "../theme";

export const Error = props => {
    return (
        <View style={styles.center}>
            <Text style={{color: THEME.DANGER_COLOR}}>{props.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
