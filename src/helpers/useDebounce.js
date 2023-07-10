import React, {useEffect, useState} from "react";


const useDebounce = (value, delay)=>{
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(()=>{
        const searchValue = setTimeout(()=>{
            // console.clear();
            // console.log("Setting new timeout", value);
            setDebouncedValue(value);
        }, delay)
        return ()=>{
            // console.log("clear timeout");
            clearTimeout(searchValue);
        }
    },[value, delay]);
    return debouncedValue;
}

export default useDebounce