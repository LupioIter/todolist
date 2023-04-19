import React from "react";
import {EditableSpan} from "../Components/EditableSpan";
import {ComponentMeta, ComponentStory} from "@storybook/react";
import {action} from "@storybook/addon-actions";
import {ReduxStoreProviderDecorator} from "./ decorators/ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof EditableSpan>

const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args}/>;

export const EditableSpanStory = Template.bind({})
EditableSpanStory.args = {
    onChange: action('EditableSpan value changed')
}