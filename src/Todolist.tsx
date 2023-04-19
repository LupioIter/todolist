import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from './AppWithRedux';
import {AddItemForm} from './Components/AddItemForm';
import {EditableSpan} from './Components/EditableSpan';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton';
import {Delete} from '@mui/icons-material';
import {useAppSelector} from "./state/store";
import {useDispatch} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasksReducer";
import {changeFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolistsReducer";


type TodolistReduxPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}

export const TodolistRedux = ({todolistId, title, filter}: TodolistReduxPropsType) => {

    let tasks = useAppSelector(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = () => {
        const action = removeTodolistAC(todolistId);
        dispatch(action);
    }
    const changeTodolistTitle = (title: string) => {
        const action = changeTodolistTitleAC(todolistId, title);
        dispatch(action);
    }

    const addTask = useCallback((title: string) => {
        const action = addTaskAC(title, todolistId);
        dispatch(action);
    },[dispatch, todolistId]);

    const onAllClickHandler = () => dispatch(changeFilterAC(todolistId, 'all'));
    const onActiveClickHandler = () => dispatch(changeFilterAC(todolistId, 'active'));
    const onCompletedClickHandler = () => dispatch(changeFilterAC(todolistId, 'completed'));

    if (filter === "active") {
        tasks = tasks.filter(t => !t.status);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.status);
    }

    return <div>
        <h3> <EditableSpan title={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks && tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, todolistId))
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        dispatch(changeTaskStatusAC(t.id, newIsDoneValue,todolistId));
                    }
                    const onTitleChangeHandler = (newTitle: string) => {
                        dispatch(changeTaskTitleAC(t.id, newTitle, todolistId));
                    }

                    return <div key={t.id}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan title={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'default'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
}


