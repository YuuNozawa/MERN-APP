import React, { Component } from 'react'

const Context = React.createContext()

const reducer = (prevState, action) =>{
    switch(action.type) {
        case "TOGGLE": 
        // {
        //     const { todos } = prevState;
        //     const todoId = action.payload;

        //     const nextTodos = todos.map(todo => {
        //         if (todo.id === todoId) {
        //             return {
        //                 ...todo,
        //                 complete: !todo.complete
        //             }
        //         }
        //         return todo;
        //     });
        //     return {
        //         ...prevState,
        //         todos: nextTodos,
        //     }
        // }
        return {
            todos: prevState.todos.map(t => {
                if(t.id === action.payload) {
                    // make the copy of current todo for next state
                    //const nextTodo = Object.assign({}, t);
                    //nextTodo.complete = !t.complete;
                    //return nextTodo;

                    return {
                        ...t,
                        complete : !t.complete
                    }
                };
                return t;
            })
        }

        case "REMOVE":
            return { todos: prevState.todos.filter(todo => todo.id !== action.payload ) }

        case "ADD":
            return { todos: [...prevState.todos, action.payload] }

        default:
            return prevState
    }
}


export class Provider extends Component {
    state={
        todos:[
            {
                id:1,
                title:"浜田さんにメール",
                complete:false
            },
            {
                id:2,
                title:"松本さんに電話",
                complete:false
            },
            {
                id:3,
                title:"スケジュールの確認",
                complete:false
            }
        ],
        dispatch: (action) => this.setState(prevState => reducer(prevState,action))
    }
    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer