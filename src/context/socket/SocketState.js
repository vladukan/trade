import React, {useReducer} from 'react'
import {SocketContext} from './SocketContext'
import {SocketReducer} from './SocketReducer'
import {
    SOCKET_CONNECT,
    SOCKET_DISCONNECT,
    SOCKET_ERROR,
    SOCKET_MSG,
    SOCKET_RECONNECT,
    SOCKET_SUB,
    SOCKET_UNSUB
} from '../types'
import io from 'socket.io-client';
import {SOCKET} from "../server";

export const SocketState = ({children}) => {

    const initialState = {
        connect: false,
        reconnect: false,
        disconnect: false,
        error: null,
        msg: null,
        client: {},
        arr: []
    }

    const [state, dispatch] = useReducer(SocketReducer, initialState)

    const open_socket = () => {
        state.client = io(SOCKET)
        event(state.client)
    }
    const close_socket = () => {
        state.client.emit('unsubscribe', state.subscribe);
        state.client.close()
    }


    const event = socket => {
        socket.on('connect', () => {
            console.log('Connect Socket');
            dispatch({type: SOCKET_DISCONNECT, payload: false})
            dispatch({type: SOCKET_CONNECT, payload: true})
            //socket.emit('subscribe', state.subscribe);
        });
        socket.on("quotes", (msg) => {
            state.arr[msg.msg.symbol] = {
                ask: msg.msg.ask,
                bid: msg.msg.bid,
                change: msg.msg.change,
                symbol: msg.msg.symbol
            }
            //console.log(msg.msg)
            dispatch({type: SOCKET_MSG, payload: msg.msg})
        });
        socket.on("error", (err) => {
            console.log("Socket error = " + err);
            error_socket(err)
        });
        socket.on("disconnect", (reason) => {
            console.log("Socket disconnected reason = " + reason);
            dispatch({type: SOCKET_CONNECT, payload: false})
            dispatch({type: SOCKET_DISCONNECT, payload: true})
            dispatch({type: SOCKET_RECONNECT, payload: false})
            socket.open();
        });
        socket.on('reconnect', (attemptNumber) => {
            console.log('Socket reconnect attempt number = ', attemptNumber);
            dispatch({type: SOCKET_RECONNECT, payload: true})
        });
    }

    const error_socket = error => {
        dispatch({type: SOCKET_ERROR, error})
    }

    const add_subscribe = name => {
        state.client.emit('subscribe', [name]);
    }
    const remove_subscribe = name => {
        delete state.arr[name]
        state.client.emit('unsubscribe', [name]);
    }

    return (
        <SocketContext.Provider value={{
            open_socket,
            close_socket,
            error_socket,
            add_subscribe,
            remove_subscribe,
            socket: state
        }}>
            {children}
        </SocketContext.Provider>
    )
}
