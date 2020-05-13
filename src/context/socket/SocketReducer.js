import {
    SOCKET_CONNECT,
    SOCKET_DISCONNECT,
    SOCKET_ERROR,
    SOCKET_MSG,
    SOCKET_RECONNECT
} from "../types";

const handlers = {
    [SOCKET_CONNECT]: (state,action) => ({...state,connect:action.payload,page:0}),
    [SOCKET_DISCONNECT]: (state,action) => ({...state,disconnect:action.payload}),
    [SOCKET_RECONNECT]: (state,action) => ({...state,reconnect:action.payload}),
    [SOCKET_ERROR]: (state,action) => ({...state,error:action.error}),
    [SOCKET_MSG]: (state,action) => ({...state,msg:action.payload}),
    DEFAULT: state => state
}

export const SocketReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
