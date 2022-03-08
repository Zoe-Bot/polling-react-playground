import { useEffect, useState } from "react"

export const PollingWithSetTimeout = () => {
    const [data, setData] = useState<any>()

    const fetchData = async () => {
        const res = await fetch('http://worldclockapi.com/api/json/est/now')
        const response = await res.json()

        setData(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <h1>Polling Timeout</h1>
            <p>{data && data.currentFileTime}</p>
        </>
    )
}