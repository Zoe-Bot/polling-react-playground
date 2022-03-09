import { useEffect, useRef, useState } from "react"

export const UseRefExample = () => {
    const [count, setCount] = useState(0)
    const timer = useRef<any>(0)

    const startTimer = () => {
        if (timer.current)
            return
        timer.current = setInterval(() => setCount(count => count + 1), 100)
    }

    const stopTimer = () => {
        clearInterval(timer.current)
        timer.current = 0
    }

    useEffect(() => {
        startTimer()

        return () => stopTimer()
    }, [])

    return (
        <>
            <p>Count: {count}</p>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
        </>
    )
}
