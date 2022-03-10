import { memo, useState } from "react"

export const UseMemoExample = () => {
    const [todos, setTodos] = useState<any>([])

    return (
        <div>
            <h1>Use Memo</h1>
            <input type="text" onInput={(e: any) => {
                setTodos([...todos, e.target.value])
            }}></input>

            {todos.map((todo: any) => <Child todo={todo} />)}
        </div>
    )
}

const Child = memo(({ todo }: any) => {
    return <p>{todo}</p>
})