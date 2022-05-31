import {useState} from "react";
import { useEffect, useCallback } from "react"

export function useInput(initialValue){
    const [value, setValue] = useState(initialValue)
    function onChange(event) {
        setValue(event.target.value)
    }    function clear(){
        setValue('')
    }    return{
        bind:{value,onChange},
        value,
        clear
    }
}

export function useDebounceEffect(effect, deps, delay = 250) {
    const callback = useCallback(effect, deps)

    useEffect(() => {
        const timeout = setTimeout(callback, delay)
        return () => clearTimeout(timeout)
    }, [callback, delay])
}
