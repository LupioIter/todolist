import {combineReducers, legacy_createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>
export const store = legacy_createStore(rootReducer);
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
//@ts-ignore
window.store = store;