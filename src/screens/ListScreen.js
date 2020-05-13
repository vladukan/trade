import React, {useEffect, useContext, useState} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import {AppHeaderIcon} from '../components/AppHeaderIcon'
import {THEME} from '../theme'
import {List} from "../components/List";
import {ListContext} from "../context/listItem/ListContext";
import {Footer} from "../components/footer";
import {Error} from "../components/error";
import {Loader} from "../components/loader";

export const ListScreen = ({navigation}) => {
    const {get_list, get_search,error_list, list} = useContext(ListContext)
    const [search, setSearch] = useState('')

    useEffect(() => {
        get_list()
        return ()=>error_list(null)
    }, [])

    if (list.loading) {
        return <Loader/>
    }
    const onOpen = text => {
        navigation.navigate('ListItem', {
            item: text
        })
    }
    const SearchList = (text) => {
        setSearch(text)
        get_search(text)
    }


    return (
        list.error == null ?
            <View style={styles.center}>
                <View style={styles.header}>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => {SearchList(text)}}
                        value={search}
                        placeholder='Поиск...'
                        autoCorrect={false}
                        autoCapitalize='none'
                    />
                </View>
                <List data={list.search.length > 0 ? list.search : list.list_page} onOpen={(onOpen)}/>

                {list.search.length > 0 ? null : <Footer/>}

            </View>
            :   <Error text={list.error}/>
    )

}

ListScreen.navigationOptions = ({navigation}) => ({
    headerTitle: 'Задание 1',
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
