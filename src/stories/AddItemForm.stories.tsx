import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AddItemForm } from '../Components/AddItemForm';
import {action} from "@storybook/addon-actions";
import {IconButton, TextField} from "@mui/material";
import {ControlPoint} from "@mui/icons-material";

export default {
    title: 'Todolist/AddItemForm',
    component: AddItemForm,
    argTypes: {
        addItem: {
            description: 'Button clicked inside form'
        },
    },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args) => <AddItemForm {...args}/>;

const TemplateWithError: ComponentStory<typeof AddItemForm> = (args) => {
    {
        let [title, setTitle] = useState("")
        let [error, setError] = useState<string | null>("Title is required")

        const addItem = () => {
            console.log('fff')
            if (title.trim() !== "") {
                args.addItem(title.trim());
                setTitle("");
            } else {
                setError("Title is required");
            }
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            setTitle(e.currentTarget.value)
        }

        const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
            if (error != null) {
                setError(null);
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
                    error={!!error}
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
    }
}

export const AddItemFormStory = Template.bind({});
AddItemFormStory.args = {
    addItem: action('Button clicked inside form')
};

export const AddItemFormStoryWithError = TemplateWithError.bind({});
AddItemFormStoryWithError.args = {
    addItem: action('Button clicked inside form')
};