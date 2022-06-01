import {useRef, useState} from "react";
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
export function useEventListener(eventName, handler, element = window) {
    const savedHandler = useRef();
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);
    useEffect(
        () => {
            const isSupported = element && element.addEventListener;
            if (!isSupported) return;
            const eventListener = (event) => savedHandler.current(event);
            element.addEventListener(eventName, eventListener);
            return () => {
                element.removeEventListener(eventName, eventListener);
            };
        },
        [eventName, element]
    );
}

