import React, {useCallback} from 'react';
import './App.css';
import {TodolistRedux} from './Todolist';
import {AddItemForm} from "./Components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {addTodolistAC,} from "./state/todolistsReducer";
import {useDispatch} from "react-redux";
import {useAppSelector} from "./state/store";
import {TaskType} from "./api/todolists-api";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWithRedux() {
    const dispatch = useDispatch();
    const todolists = useAppSelector( state => state.todolists);

    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);
    }, [dispatch]);

    return (
        <div className="App">
            <AppBar position='static'>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} aria-label={"menu"}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={ {padding: "20px"} }>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists && todolists.map((el) => {
                            return <Grid key={el.id} item>
                                <Paper style={ {padding: "15px"} }>
                                    <TodolistRedux
                                        todolistId={el.id}
                                        title={el.title}
                                        filter={el.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWithRedux;
