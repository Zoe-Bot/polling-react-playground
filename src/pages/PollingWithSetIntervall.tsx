import { useEffect, useState } from "react"

/**
 * Do not use this: When a fetch takes longer than the interval this will cause issues.
 */
export const PollingWithSetIntervall = () => {
    const INTERVALL = 3000
    const [currentFileTime, setCurrentFileTime] = useState<number>()

    useEffect(() => {
        // For Cancelling Requests in Cleanup
        const controller = new AbortController()
        const signal = controller.signal

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
        fetchClockData()
        let interval = setInterval(fetchClockData, INTERVALL)

        return () => {
            // Cleanup
            clearInterval(interval)
            controller.abort()
        }
    }, [])

    return (
        <>
            <h1>Polling Interval</h1>
            <p>Current Filetime: {currentFileTime}</p>
        </>
    )
}