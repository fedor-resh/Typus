import {useState} from "react";

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