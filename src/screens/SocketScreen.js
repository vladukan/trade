import React, {useEffect, useContext, useState} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {THEME} from '../theme'
import {ListContext} from "../context/listItem/ListContext";
import {Error} from "../components/error";
import {ListSocket} from "../components/ListSocket";
import {SocketContext} from "../context/socket/SocketContext";

export const SocketScreen = ({navigation}) => {
    const {get_list, get_search, list} = useContext(ListContext)
    const {close_socket,open_socket, error_socket,socket} = useContext(SocketContext)
    const [search, setSearch] = useState('')

    useEffect(() => {
        get_list()
        open_socket()
        return () => {
            error_socket(null)
            close_socket()
        }
    }, [])
    const SearchList = (text) => {
        setSearch(text)
        get_search(text)
    }
    if(list.error !== null ){
        return <Error text={list.error}/>
    }
    if(socket.error !== null ){
        return <Error text={socket.error}/>
    }
    return (
            <View style={styles.center}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {
                            SearchList(text)
                        }}
                        value={search}
                        placeholder='Поиск...'
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <ListSocket data={list.search.length > 0 ? list.search : list.list}/>
            </View>
    )
}

SocketScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Задание 2. Подписка',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Toggle Drawer'
                iconName='ios-menu'
                onPress={() => navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        position: 'absolute',
        top: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    title: {
        color: '#fff',
        fontFamily: 'open-bold',
        fontSize: 20
    },
    input: {
        fontFamily: 'open-bold',
        fontSize: 20,
        width: '100%',
        color: '#000',
        padding: 10,
        borderStyle: 'solid',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: THEME.MAIN_COLOR,
        borderRadius: 10
    }
})
