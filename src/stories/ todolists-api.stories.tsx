import React, {useEffect, useState} from 'react'
import axios from "axios";
import {todolistsApi} from "../api/todolists-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': "7676deb2-5d5b-4073-a248-c600675ae2b3"
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = 'Yoyo'
            todolistsApi.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
            todolistsApi.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])


    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ""
        const title = 'Yoyo'
        todolistsApi.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}


export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = ''
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [taskId, setTaskId] = useState<string>('')
    const [todolistId, setTodolistId] = useState<string>('')
    const deleteTask = () => {
        const todolistId = '';
        const taskId = '';
        todolistsApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            })
    }
    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId} onChange={(e)=>{setTodolistId(e.currentTarget.value)}}/>
            <input placeholder={"taskId"} value={taskId} onChange={(e)=>{setTaskId(e.currentTarget.value)}}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '';
        const taskId = '';
        const model = {
            title: "",
            description: "",
            status: 1,
            priority: 1,
            startDate: "",
            deadline: ""
        };
        todolistsApi.updateTask(todolistId, taskId, model)
            .then((res) => {
                setState(res.data);
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

