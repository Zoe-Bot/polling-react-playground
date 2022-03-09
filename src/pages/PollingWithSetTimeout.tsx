import { useEffect, useState } from "react"

export const PollingWithSetTimeout = () => {
    const INTERVALL = 3000
    const [currentFileTime, setCurrentFileTime] = useState<number>()

    useEffect(() => {
        let timeout: NodeJS.Timeout
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
                timeout = setTimeout(fetchClockData, INTERVALL)
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

        return () => {
            // Cleanup
            clearTimeout(timeout)
            controller.abort()
        }
    }, [])

    return (
        <>
            <h1>Polling Timeout</h1>
            <p>Current Filetime: {currentFileTime}</p>
        </>
    )
}