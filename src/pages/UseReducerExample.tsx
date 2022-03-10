import { useReducer } from "react"

enum ACTIONS {
    INCREASE = "INCREASE",
    DECREASE = "DECREASE",
    INCREASEBYNUMBER = "INCREASEBYNUMBER"
}

type ACTION = {
    type: ACTIONS.INCREASEBYNUMBER
    payload: number
} | {
    type: ACTIONS.INCREASE | ACTIONS.DECREASE,
}

type Person = {
    name: string
    age: number
}

export const UseReducerExample = () => {
    const reducer = (state: Person, action: ACTION): Person => {
        switch (action.type) {
            case ACTIONS.INCREASE:
                return { ...state, age: state.age + 1 }
            case ACTIONS.DECREASE:
                return { ...state, age: state.age - 1 }
            case ACTIONS.INCREASEBYNUMBER:
                return { ...state, age: state.age + action.payload }
            default:
                return state
        }
    }

    const [{ name, age }, dispatch] = useReducer(reducer, { name: "Joy", age: 20 })

    return (
        <>
            <p>{name}: {age}</p>
            <button onClick={() => dispatch({ type: ACTIONS.INCREASE })}>Increase</button>
            <button onClick={() => dispatch({ type: ACTIONS.DECREASE })}>Decrease</button>
            <button onClick={() => dispatch({ type: ACTIONS.INCREASEBYNUMBER, payload: 10 })}>Increase by 10</button>
            <button onClick={() => dispatch({ type: ACTIONS.INCREASEBYNUMBER, payload: 20 })}>Increase by 20</button>
            <button onClick={() => dispatch({ type: ACTIONS.INCREASEBYNUMBER, payload: 50 })}>Increase by 50</button>
        </>
    )
}
