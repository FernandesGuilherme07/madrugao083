
import React, { useState } from 'react';
import styles from './styles.module.css';
import { SearchIcon } from './searchIcon';
import { observer } from 'mobx-react-lite';
import { establishmentMock } from 'src/mocks/establishmentMock';
type Props = {
    onSearch: (searchValue: string) => void;
}

export const SearchInput = observer(({ onSearch }: Props) => {

    const [focused, setFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSearch(searchValue);
        }
    }

    return (
        <div
            className={styles.container}
            style={{ borderColor:establishmentMock.primaryColor }}
        >
            <div
                className={styles.button}
                onClick={() => onSearch(searchValue)}
            >
                <SearchIcon color={establishmentMock.primaryColor}/>
            </div>
            <input
                type="text"
                className={styles.input}
                placeholder="Busque um produto"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onKeyUp={handleKeyUp}
            />
        </div>
    );
})