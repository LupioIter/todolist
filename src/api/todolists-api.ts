import axios from "axios";

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': "7676deb2-5d5b-4073-a248-c600675ae2b3"
    }
}

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.1/`,
    ...settings
})

export type TodolistType = {
    id: string,
    title: string,
    addedDate: string,
    order: number
}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

export enum TaskStatuses {
    New,
    InProgress,
    Completed,
    Draft
}

export enum TaskPriorities {
    Low,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string,
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todolistId: string
    order: number
    addedDate: string
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

type GetTaskResponse = {
    error: string | null
    totalCount: number
    items: Array<TaskType>
}

export const todolistsApi = {
    getTodolists() {
        return  instance.get<Array<TodolistType>>(`todo-lists`)
    },
    createTodolist (title: string) {
        return  instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`, {tittle: title})
    },
    deleteTodolist(id: string) {
        return  instance.delete<ResponseType>(`todo-lists/${id}`)
    },
    updateTodolist(id: string, title: string) {
        return instance.post<ResponseType>(`todo-lists/${id}`, {tittle: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTaskResponse>(`todo-lists/${todolistId}/tasks`)
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.post<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    }

}