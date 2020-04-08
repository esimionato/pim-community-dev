import React, {FC, useEffect, useState} from 'react';

const DEBOUNCE_TIME = 300;

type Props = {
    value: string;
    onSearch: (value: string) => void;
    placeholder: string;
};

const SearchInput: FC<Props> = ({value, onSearch, placeholder}) => {
    const [searchValue, setSearchValue] = useState<string>(value);

    useEffect(() => {
        const timeoutId = setTimeout(() => onSearch(searchValue), DEBOUNCE_TIME);

        return () => clearTimeout(timeoutId);
    }, [onSearch, searchValue]);

    return (
        <input
            type='text'
            value={searchValue}
            onChange={event => setSearchValue(event.target.value)}
            placeholder={placeholder}
        />
    );
};

export {SearchInput};
