import { useState } from "react"
import { TodoTitle } from "../types"

interface Props {
    saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
    const [inputValue, setInputValue] = useState('')

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && inputValue !== '') {
            saveTodo && saveTodo({
                title: inputValue
            })
            setInputValue('')
        }
    }

    return (
        <input
            className="new-todo"
            value={inputValue}
            placeholder="What do you want to do?"
            autoFocus={true}
            onKeyDown={handleKeyDown}
            onChange={(e) => setInputValue(e.target.value)}
        />
    )
}