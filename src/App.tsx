import './App.css';
import {useEffect, useReducer, useRef, useState} from "react";
import Editor from "./components/Editor";
import {Todo} from "./types";
import TodoItem from "./components/TodoItem";

type Action =
    | { type: "CREATE", data: Todo }
    | { type: "DELETE", data: Omit<Todo, "content"> };


function reducer(state: Todo[], action: Action) {
    switch (action.type) {
        case "CREATE":
            return [...state, action.data];
        case "DELETE":
            return state.filter(todo => todo.id !== action.data.id);
        default:
            return state;
    }
}

function App() {
    const [todos, dispatch] = useReducer(reducer, []);
    const idRef = useRef(0);

    const onClickAdd = (text: string) => {
        dispatch({
            type: "CREATE",
            data: {
                id: idRef.current++,
                content: text,
            }
        })
    };

    const onClickDelete = (id: number) => {
        dispatch({
            type: "DELETE",
            data: {
                id: id,
            }
        })
    };

    useEffect(() => {
        console.log(todos);
    }, [todos]);
    return (
        <div className="App">
            <h1>TODO</h1>
            <Editor onClickAdd={onClickAdd}/>
            <div>
                {todos.map(todo =>
                    (<TodoItem key={todo.id} {...todo} onClickDelete={onClickDelete}/>)
                )}
            </div>
        </div>
    );
}

export default App;
