import {
    ERROR_ITEM,
    ERROR_LIST,
    LOAD_LIST,
    LOAD_LIST_ITEM,
    LOAD_LIST_SEARCH,
    LOAD_PAGE_LIST,
    LOAD_PAGE_NEXT_PREV,
    LOADING_LIST
} from "../types";

const handlers = {
    [LOAD_LIST]: (state,action) => ({...state,list:action.payload,page:0}),
    [LOAD_LIST_SEARCH]: (state,action) => ({...state,search:action.payload}),
    [LOAD_LIST_ITEM]: (state,action) => ({...state,list_item:action.payload}),
    [LOAD_PAGE_NEXT_PREV]: (state,action) => ({...state,list_page:action.arr,page:action.page}),
    [LOAD_PAGE_LIST]: (state,action) => ({...state,list_page:action.arr}),
    [LOADING_LIST]: (state,action) => ({...state,loading:action.loading}),
    [ERROR_LIST]: (state,action) => ({...state,error:action.error}),
    [ERROR_ITEM]: (state,action) => ({...state,error_item:action.error}),
    DEFAULT: state => state
}

export const ListReducer = (state, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}
