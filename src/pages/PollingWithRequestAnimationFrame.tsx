import { useEffect, useState } from "react"

export const PollingWithRequestAnimationFrame = () => {
    const INTERVALL = 3000
    const [currentFileTime, setCurrentFileTime] = useState<number>()

    useEffect(() => {
        // For Cancelling Requests in Cleanup
        const controller = new AbortController()
        const signal = controller.signal
        let timer: number = 0

        const fetchClockData = async () => {
            try {
                const res = await fetch('http://worldclockapi.com/api/json/est/now', {
                    signal: signal
                })
                const response = await res.json()

                setCurrentFileTime(response.currentFileTime)
            } catch (error: any) {
                // Backoff
                // When Cleanup (Cancel Request) it would throw an abort error so we catch this here
                if (error.name === 'AbortError') {
                    console.log('Successfully aborted!')
                } else {
                    console.error('Error while fetching worldclockapi', error)
                }
            }
        }

        let timeToMakeNewRequest = 0
        const rafTimer = async (time: number) => {
            if (timeToMakeNewRequest <= time) {
                await fetchClockData()
                timeToMakeNewRequest = time + INTERVALL
            }

            timer = requestAnimationFrame(rafTimer)
        }

        timer = requestAnimationFrame(rafTimer)

        return () => {
            // Cleanup
            controller.abort()
            cancelAnimationFrame(timer)
        }
    }, [])

    return (
        <>
            <h1>Polling Request Animation Frame</h1>
            <p>Current File Time: {currentFileTime}</p>
        </>
    )
}