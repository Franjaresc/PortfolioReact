import { useEffect, useRef, useState } from 'react';
import { type TodoId, type Todo as TodoType } from '../types';

interface Props extends TodoType {
    id: TodoId['id']
    title: string
    completed: boolean
    setCompleted: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
    setTitle: (params: Omit<TodoType, 'completed'>) => void
    isEditing: string
    setIsEditing: (completed: string) => void
    removeTodo: ({ id }: TodoId) => void;
}

export const Todo: React.FC<Props> = (
    {
        id,
        title,
        completed,
        setCompleted,
        setTitle,
        removeTodo,
        isEditing,
        setIsEditing,
    }
) => {
    const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCompleted && setCompleted({
            id,
            completed: e.target.checked,
        });
    }

    const [editedTitle, setEditedTitle] = useState(title)
    const inputEditTitle = useRef<HTMLInputElement>(null)

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if (e.key === 'Enter') {
            setEditedTitle(editedTitle.trim())

            if (editedTitle !== title) {
                setTitle({ id, title: editedTitle })
            }

            if (editedTitle === '') removeTodo({ id })

            setIsEditing('')
        }

        if (e.key === 'Escape') {
            setEditedTitle(title)
            setIsEditing('')
        }
    }

    useEffect(() => {
        inputEditTitle.current?.focus()
    }, [isEditing])

    return (
        <>
            <div className="view">
                <input
                    className="toggle"
                    type="checkbox"
                    checked={completed}
                    onChange={handleChangeCheckbox}
                />
                <label>{title}</label>
                <button
                    className="destroy"
                    onClick={() => {
                        removeTodo && removeTodo({ id })
                    }}
                ></button>
            </div>
            <input
                className='edit'
                value={editedTitle}
                onChange={(e) => { setEditedTitle(e.target.value) }}
                onKeyDown={handleKeyDown}
                onBlur={() => { setIsEditing('') }}
                ref={inputEditTitle}
            />
        </>
    )
}