import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType,
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: tsarType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST' :
            return state.filter(el => el.id !== action.payload.todolistId)
        case "ADD-TODOLIST":
            let newTodolistId = action.payload.todolistId;
            let newTodolist: TodolistDomainType = {
                id: newTodolistId,
                filter: 'all',
                addedDate: '',
                order: 0,
                title: action.payload.newTodolistTitle
            }
            return [...state, newTodolist]
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id === action.payload.todolistId ? {
                ...el,
                title: action.payload.newTodolistTitle
            } : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.newFilter} : el)
        default :
            return state;
    }
}

type tsarType = removeTodolistACType | addTodolistACType | changeTodolistTitleACType | changeFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {todolistId}
    } as const
}

export type addTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistTitle: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            newTodolistTitle, todolistId: v1()
        }
    } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {todolistId, newTodolistTitle}
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId, newFilter
        }
    } as const
}