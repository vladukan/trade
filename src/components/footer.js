import React,{useContext} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {THEME} from "../theme";
import {ListContext} from "../context/listItem/ListContext";

export const Footer = () => {
    const {get_next_prev, list} = useContext(ListContext)
    return (
        <View style={styles.footer}>
            <Button
                title="Prev"
                disabled={list.page == 0}
                onPress={() => get_next_prev(false)}
            />
            <Text
                style={styles.title}>
                {list.page == 0 ? (list.page + 1) : list.page}
                ..
                {(list.page + list.count) + ' '}
                of {list.list.length}
            </Text>
            <Button
                title="Next"
                disabled={(list.page + list.count) >= list.list.length}
                onPress={() => get_next_prev(true)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        color: '#fff',
        fontFamily: 'open-bold',
        fontSize: 20
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        backgroundColor: THEME.MAIN_COLOR,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
})
