import { useEffect, useState } from "react"

export const PollingWithSetTimeout = () => {
    const INTERVALL = 3000
    const [currentFileTime, setCurrentFileTime] = useState<number>()
    let timeout: NodeJS.Timeout

    const fetchClockData = async (timeout: NodeJS.Timeout | number) => {
        try {
            const res = await fetch('http://worldclockapi.com/api/json/est/now')
            const response = await res.json()

            setCurrentFileTime(response.currentFileTime)

            timeout = setTimeout(fetchClockData, INTERVALL)
        } catch (error) {
            // Backoff
            console.error('Error while fetching worldclockapi', error)
        }
    }

    useEffect(() => {
        fetchClockData(timeout)

        return () => clearTimeout(timeout)
    }, [])

    return (
        <>
            <h1>Polling Timeout</h1>
            <p>Current Filetime: {currentFileTime}</p>
        </>
    )
}