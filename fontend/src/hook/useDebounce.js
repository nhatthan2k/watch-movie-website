import React, { useEffect, useState } from 'react';

function useDebounce(value, delay) {
    const [debouncevalue, setDebouncevalue] = useState(value);

    useEffect(() => {
        const handles = setTimeout(() => setDebouncevalue(value), delay);

        return () => clearTimeout(handles);
    }, [value]);

    return debouncevalue;
}

export default useDebounce;
