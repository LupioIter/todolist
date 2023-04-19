import React from "react";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {Task} from "@mui/icons-material";
import {action} from "@storybook/addon-actions";

export default {
    title: 'Todolist/Task',
    component: Task,
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button inside Task was clicked')

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback,
}

const Template: ComponentStory<typeof Task> = (args) => <Task {...args}/>;

/*
export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
    ...baseArgs,
    task: {id: '1', isDone: true, title: 'JS'},
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
    ...baseArgs,
    task: {id: '2', isDone: false, title: 'HTML'},
    todolistId: 'todolistId1'
}*/
