import { useEffect, useState } from 'react'

export const useDebounce = (inputString, delay = 300) => {
    const [debounceString, setDebounceString] = useState("")

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebounceString(inputString)
        }, delay)

        return () => {
            if (timer) clearTimeout(timer)
        }
    }, [delay, inputString])


    return debounceString
}
