import React from 'react'
import {View, StyleSheet, FlatList} from 'react-native'
import {THEME} from "../theme";
import {ListItemSocket} from "./ListItemSocket";

export const ListSocket = ({data}) => {

    return (
        <View style={styles.wrapper}>

            <FlatList
                data={data}
                keyExtractor={item => item.symbol.toString()}
                renderItem={
                    ({item}) =>
                        <ListItemSocket text={item.symbol}/>
                }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10,
        flex:1,
        paddingTop:60,
        width:'100%'
    },
    noItems: {
        fontFamily: 'open-regular',
        textAlign: 'center',
        marginVertical: 10,
        fontSize: 18
    },
    textWrap: {

        paddingVertical: 5,
        alignItems: 'center',
        width: '100%'
    },
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
    title:{
        color:'#fff',
        fontFamily: 'open-bold',
        fontSize: 20
    },
    header_footer_style: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        backgroundColor: '#CCC',
        alignItems: 'center',
        padding: 10
    },
})
