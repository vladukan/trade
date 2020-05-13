import React,{useContext} from 'react'
import {View, StyleSheet, Text, Button} from 'react-native'
import {THEME} from "../theme";
import {SocketContext} from "../context/socket/SocketContext";
import { AntDesign } from '@expo/vector-icons';

export const ListItemSocket = ({text}) => {
    const {socket, add_subscribe, remove_subscribe} = useContext(SocketContext)


    return (
        <View style={styles.button} >
            <Text style={styles.title}>{text}</Text>
            <Text style={styles.small}>{socket.arr[text]===undefined ?'-': socket.arr[text].bid}</Text>
            <Text style={{...styles.small,color:socket.arr[text]===undefined ?'#fff':socket.arr[text].change>0?THEME.UP:THEME.DOWN}}>
                {socket.arr[text]===undefined ?null: socket.arr[text].change>0?'+':null}
                {socket.arr[text]===undefined ?'-': socket.arr[text].change}
            </Text>
            <Text style={{...styles.small,color:socket.arr[text]===undefined ?'#fff':socket.arr[text].change>0?THEME.UP:THEME.DOWN}}>
                {socket.arr[text]===undefined ?null: socket.arr[text].change>0?'+':null}
                {socket.arr[text]===undefined ?'-': Math.round(((socket.arr[text].change/socket.arr[text].bid)*100)*10000)/10000+'%'}
            </Text>
            { socket.arr[text]===undefined ?null:
                <AntDesign
                    name={socket.arr[text].change>0?'caretup':"caretdown" }
                    size={16}
                    color={socket.arr[text].change>0?THEME.UP:THEME.DOWN }
                />
            }
            {
                socket.arr[text]===undefined ?
                    <Button
                        title="+"
                        color={THEME.UP}
                        onPress={() => add_subscribe(text)}
                    />
                :
                    <Button
                        title="-"
                        color={THEME.DOWN}
                        onPress={() => remove_subscribe(text)}
                    />

            }
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        margin: 5,
        padding: 10,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: THEME.MAIN_COLOR,

    },
    title: {
        color: '#fff',
        fontFamily: 'open-bold',
        fontSize: 20
    },
    small: {
        color: '#fff',
        fontFamily: 'open-bold',
        fontSize: 14
    }
})
