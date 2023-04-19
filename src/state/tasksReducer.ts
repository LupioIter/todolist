import {v1} from "uuid";
import {TasksStateType} from "../AppWithRedux";
import {addTodolistACType, removeTodolistACType} from "./todolistsReducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/todolists-api";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>

type ActionsType = RemoveTaskActionType | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | addTodolistACType | removeTodolistACType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
            };
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case 'REMOVE-TODOLIST' :
            const copyState = {...state};
            delete copyState[action.payload.todolistId];
            return copyState;
        case "ADD-TASK":
            const newTask: TaskType = {
                id: v1(),
                title: action.title,
                status: TaskStatuses.Completed,
                startDate: '',
                todolistId: action.todolistId,
                addedDate: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: "",
                deadline: ''
            }
            return {...state, [action.todolistId]: [newTask, ...state[action.todolistId]]}
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, status: TaskStatuses} : task)
            };
        }
        case "CHANGE-TITLE": {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId ? {...task, title: action.newTitle} : task)
            };
        }
        default:
            return state;
    }
}


export const removeTaskAC = (taskId: string, todolistId: string) => {
    return {type: 'REMOVE-TASK', taskId, todolistId} as const
}

export const addTaskAC = (title: string, todolistId: string) => {
    return {type: 'ADD-TASK', title, todolistId} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return {type: 'CHANGE-STATUS', taskId, isDone, todolistId} as const
}

export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string) => {
    return {type: 'CHANGE-TITLE', taskId, newTitle, todolistId} as const
}
