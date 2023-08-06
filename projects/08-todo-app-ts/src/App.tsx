import { useState } from "react"
import { Todos } from "./components/Todos"
import { type Todo as TodoType, type TodoId, FilterValue, TodoTitle } from "./types"
import { TODO_FILTERS } from "./consts"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"

const mockTodos = [
  {
    id: '1',
    title: 'Learn React',
    completed: true,
  },
  {
    id: '2',
    title: 'Learn TypeScript',
    completed: false,
  },
  {
    id: '3',
    title: 'Learn GraphQL',
    completed: false,
  },
]


const App: React.FC = () => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FilterValue>(() => {
    // read from url query params using URLSearchParams
    const params = new URLSearchParams(window.location.search)
    const filter = params.get('filter') as FilterValue | null
    if (filter === null) return TODO_FILTERS.ALL
    // check filter is valid, if not return ALL
    return Object
      .values(TODO_FILTERS)
      .includes(filter)
      ? filter
      : TODO_FILTERS.ALL
  })

  const handleRemove = ({ id }: TodoId): void => {
    const newTodos = todos.filter((todo) => todo.id !== id)
    setTodos(newTodos)
  }

  const handleComplete = (
    { id, completed }: Pick<TodoType, 'id' | 'completed'>)
    : void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterChange = (filter: FilterValue): void => {
    setFilterSelected(filter)
    const params = new URLSearchParams(window.location.search)
    params.set('filter', filter)
    window.history.pushState({}, '', `${window.location.pathname}?${params.toString()}`)
  }

  const activeCount = todos.filter((todo) => !todo.completed).length
  const completedCount = todos.filter((todo) => todo.completed).length

  const filteredTodos = todos.filter((todo) => {
    if (filterSelected === TODO_FILTERS.ACTIVE) return !todo.completed
    if (filterSelected === TODO_FILTERS.COMPLETED) return todo.completed
    return todo
  })

  const handleClearCompleted = (): void => {
    const newTodos = todos.filter((todo) => !todo.completed)
    setTodos(newTodos)
  }
  
  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      id: crypto.randomUUID(),
      title,
      completed: false
    }
    const newTodos = [...todos, newTodo]
    setTodos(newTodos)
  }

  const handleUpdateTitle = ({ id, title }: { id: string, title: string }): void => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          title
        }
      }

      return todo
    })

    setTodos(newTodos)
  }

  return (
    <div className="todoapp">
      <Header saveTodo={handleAddTodo} />
      <Todos
        setCompleted={handleComplete}
        removeTodo={handleRemove}
        todos={filteredTodos}
        setTitle={handleUpdateTitle}
      />
      <Footer
        filterSelected={filterSelected}
        handleFilterChange={handleFilterChange}
        activeCount={activeCount}
        completedCount={completedCount}
        onClearCompleted={handleClearCompleted
        }
      />
    </div>
  )
}

export default App
