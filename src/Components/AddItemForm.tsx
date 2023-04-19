import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo ((props: AddItemFormPropsType) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<boolean>(false)

    const addItem = () => {
        console.log('fff')
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError(true);
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error != null) {
            setError(false);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return (
        <div>
            <TextField
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                // error={error ?'Title is required' : ''}
                error={error}
                size={'small'}
                id="outlined-basic"
                label={error ? "Title is required" : "Add title"}
                variant="outlined"
            />

            {/*<button onClick={addTask}>+</button>*/}
            <IconButton onClick={addItem} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
})