import React, {useReducer} from 'react'
import {ListContext} from './ListContext'
import {ListReducer} from './ListReducer'
import {
    ERROR_ITEM,
    ERROR_LIST,
    LOAD_LIST,
    LOAD_LIST_ITEM,
    LOAD_LIST_SEARCH,
    LOAD_PAGE_LIST,
    LOAD_PAGE_NEXT_PREV,
    LOADING_LIST
} from '../types'
import {Http} from "../../http";
import {SERVER} from "../server";
//import * as io from "socket.io-client";

export const ListState = ({children}) => {

    const initialState = {
        loading: false,
        error: null,
        error_item: null,
        list: [],
        page: 0,
        count: 10,
        page_list:[],
        list_item:[],
        search:[]
    }

    const [state, dispatch] = useReducer(ListReducer, initialState)

    const sort_list= (data=[])=>{
        let arr=[]
        for(let i=0;
            i<((state.page+state.count)>=data.length?data.length:(state.page+state.count));
            i++){
            arr.push(data[i])
        }
        return arr
    }

    const get_list = async () => {
        loading(true)
        error_list(null)
        try {
            const response = await Http.get(`${SERVER}/api/quotesList`)
            //console.log(response.quotesList)
            if(response.quotesList.length>0){
                dispatch({type: LOAD_LIST, payload: response.quotesList})
                dispatch({type: LOAD_PAGE_LIST, arr: sort_list(response.quotesList)})
            }else{
                error_list('Нет данных на сервере')
            }
            loading(false)

        } catch (e) {
            console.log(e)
            loading(false)
            error_list('Ошибка загрузки с сервера')
        }
    }
    const get_item = async name => {
        loading(true)
        error_item(null)
        try {
            const response = await Http.get(`${SERVER}/api/quotesTick/?q=${name}`)
            //console.log(response)
            if(response.length>0){
                dispatch({type: LOAD_LIST_ITEM, payload: response[0]})
            }else{
                error_item('Информация отсуствует на сервере')
            }
            loading(false)
        } catch (e) {
            console.log(e)
            loading(false)
            error_item('Ошибка загрузки с сервера')
        }
    }

    const get_next_prev=type=>{
        loading(true)
        let page
        if(type){
            page=state.page+state.count
        }else{
            page=state.page-state.count
        }
        if (page<0){loading(false);return}
       // console.log(page)
        let arr=[]
        for(let i=page; i<((page+state.count)>=state.list.length?state.list.length:(page+state.count)); i++){
            arr.push(state.list[i])
        }
        dispatch({type: LOAD_PAGE_NEXT_PREV, arr,page})
        loading(false)
    }
    const get_search=text=>{
        loading(true)
        if (text==''||text.trim().length < 2) {
            dispatch({type: LOAD_LIST_SEARCH, payload: []})
            loading(false)
            return }
        let arr= state.list.filter(item=>item.symbol.toUpperCase().indexOf(text.toUpperCase())>-1)
        //console.log(arr)
        dispatch({type: LOAD_LIST_SEARCH, payload: arr})
        loading(false)
    }

    // const get_socket=()=>{
    //     const client =  io('https://qrtm1.ifxid.com:8443');
    //     event(client)
    // }
    //
    //
    // const event=(socket)=>{
    //     socket.on('connect', () => {
    //         console.log('Connect Socket');
    //         socket.emit('subscribe', ['GOLD','USDCAD']);
    //     });
    //     socket.on("message", (msg) => {
    //         console.log(msg);
    //     });
    //     socket.on("quotes", (msg) => {
    //         console.log(msg.msg);
    //     });
    //     socket.on("error", (err) => {
    //         console.log("Socket error = " + err);
    //     });
    //     socket.on("disconnect", (reason) => {
    //         console.log("Socket disconnected reason = " + reason);
    //     });
    //     socket.on('reconnect', (attemptNumber) => {
    //         console.log('Socket reconnect attempt number = ', attemptNumber);
    //     });
    // }


    const loading = type => {
        dispatch({type: LOADING_LIST, loading: type})
    }

    const error_list = error => {
        dispatch({type: ERROR_LIST, error})
    }
    const error_item = error => {
        dispatch({type: ERROR_ITEM, error})
    }
    return (
        <ListContext.Provider value={{
            get_list,
            error_list,
            get_item,
            get_next_prev,
            get_search,
            error_item,
            list: state
        }}>
            {children}
        </ListContext.Provider>
    )
}
