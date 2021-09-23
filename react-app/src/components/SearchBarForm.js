import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { getKey } from '../store/key';
import { fetchStockData } from '../store/stocks';

const SearchBarForm = () => {
    const dispatch = useDispatch()
    const key = useSelector(state => state.key.key)
    const results = useSelector(state => Object.values(state.search))

    const [searchInput, setSearchInput] = useState('')

    useEffect(() => {
        dispatch(getKey())
    }, [dispatch])

    useEffect(() => {
        if (searchInput) {
            // API (comment back in for testing)
            // dispatch(fetchStockData(key, searchInput))
        }
    }, [searchInput, key, dispatch])

    const resetSearch = () => {
        setSearchInput('')
        dispatch(getKey())
    }

    let searchOutput
    if (searchInput.length === 0) {
        searchOutput = (<></>)
    } else if (results.length === 0 && searchInput.length > 0) {
        searchOutput = (
            <div>
                No stocks matching your search were found.
            </div>
        )
    } else if (results.length > 0) {
        searchOutput = (
            <>
                {results && results.map((result) => {
                    return (
                        <div key={result.symbol}>
                            <NavLink onClick={resetSearch} to={`/stocks/${result.symbol.toLowerCase()}`}>
                                <div>{result.symbol}</div>
                                <div>{result.name}</div>
                            </NavLink>
                        </div>
                    )
                })}
            </>
        )
    }

    return (
        <div>
            <div>search goes here</div>
            <input
                onChange={e => setSearchInput(e.target.value)}
                value={searchInput}
                placeholder="Search"
            />
            {searchOutput}
        </div>
    )
};

export default SearchBarForm;