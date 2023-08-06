import { useState } from "react";
import { type ListOfTodos, type Todo as TodoType, type TodoId } from "../types";
import { Todo } from "./Todo";
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Props {
    todos: ListOfTodos;
    removeTodo: ({ id }: TodoId) => void;
    setTitle: (params: Omit<TodoType, 'completed'>) => void
    setCompleted: ({ id, completed }: Pick<TodoType, "id" | "completed">) => void;
}

export const Todos: React.FC<Props> = (
    {   
        todos,
        setTitle,
        removeTodo,
        setCompleted
    }
) => {
    const [isEditing, setIsEditing] = useState('')
    const [parent] = useAutoAnimate()

    return (
        <ul className="todo-list" ref={parent}>
            {todos.map((todo) => (
                <li
                    key={todo.id}
                    onDoubleClick={() => { setIsEditing(todo.id) }}
                    className={`
                        ${todo.completed ? 'completed' : ''}
                        ${isEditing === todo.id ? 'editing' : ''}
                    `}
                >
                    <Todo
                        key={todo.id}
                        id={todo.id}
                        title={todo.title}
                        completed={todo.completed}
                        setCompleted={setCompleted}
                        setTitle={setTitle}
                        removeTodo={removeTodo}
                        isEditing={isEditing}
                        setIsEditing={setIsEditing}
                    />
                </li>
            ))}
        </ul>
    );
}
