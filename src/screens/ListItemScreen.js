import React, {useEffect, useContext} from 'react'
import {View, StyleSheet, Text} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {ListContext} from "../context/listItem/ListContext";
import {Error} from "../components/error";
import {Loader} from "../components/loader";

export const ListItemScreen = ({navigation}) => {
    const {get_item,error_item, list} = useContext(ListContext)


    useEffect(() => {
        get_item(navigation.getParam('item'))
        return ()=>{
            error_item(null)
        }
        }, [])


    if (list.loading) {
        return <Loader/>
    }

    return (
        list.error_item == null ?
            <View style={styles.center}>
                <Text style={styles.title}>Name: {list.list_item.symbol}</Text>
                <Text style={styles.title}>digits: {list.list_item.digits}</Text>
                <Text style={styles.title}>ask: {list.list_item.ask}</Text>
                <Text style={styles.title}>bid: {list.list_item.bid}</Text>
                <Text style={styles.title}>change: {list.list_item.change}</Text>
                <Text style={styles.title}>lastTime: {Date(list.list_item.lasttime).toLocaleString()}</Text>
                <Text style={styles.title}>change24h: {list.list_item.change24h}</Text>
            </View>
            :   <Error text={list.error_item}/>

    )

}

ListItemScreen.navigationOptions = ({navigation}) => {
    const name = navigation.getParam('item')
    return {
        headerTitle: 'Информация о ' + name,
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title='Toggle Drawer'
                    iconName='ios-arrow-round-back'
                    onPress={() => navigation.goBack()}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    title: {
        textAlign:'left',
        color: '#000',
        fontFamily: 'open-bold',
        fontSize: 20
    }
})
