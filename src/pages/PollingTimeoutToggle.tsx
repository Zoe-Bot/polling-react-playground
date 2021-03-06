import { useEffect, useState } from "react"

export const PollingTimeoutToggle = () => {
    const INTERVALL = 3000
    const [currentFileTime, setCurrentFileTime] = useState<number>()
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    // For Cancelling Requests in Cleanup
    const controller = new AbortController()
    const signal = controller.signal

    let timeout: NodeJS.Timeout

    const fetchClockData = async () => {
        try {
            console.log("fetch start")
            const res = await fetch('http://worldclockapi.com/api/json/est/now', {
                signal: signal
            })
            const response = await res.json()
            console.log("fetch end")

            setCurrentFileTime(response.currentFileTime)
            if (isUpdating) {
                timeout = setTimeout(fetchClockData, INTERVALL)
                console.log("set Timout")
            }
        } catch (error: any) {
            // When Cleanup (Cancel Request) it would throw an abort error so we catch this here
            if (error.name === 'AbortError') {
                console.log('Successfully aborted!')
            } else {
                console.error('Error while fetching worldclockapi', error)
            }
        }
    }

    useEffect(() => {
        if (isUpdating)
            fetchClockData()

        return () => {
            // Cleanup
            console.log("Cleanup")
            clearTimeout(timeout)
            controller.abort()
        }
    }, [isUpdating]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchClockData()

        return () => {
            // Cleanup
            console.log("Cleanup Init Fetch")
            controller.abort()
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <>
            <h1>Polling Timeout</h1>
            <p>Current Filetime: {currentFileTime}</p>
            {console.log(isUpdating)}
            <button onClick={() => setIsUpdating(!isUpdating)}>{isUpdating ? "Live ON" : "Live OFF"}</button>
        </>
    )
}