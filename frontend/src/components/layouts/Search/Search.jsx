import React, { useState, useEffect, useRef } from 'react';
import './Search.css';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchResult from '../Search_Result/SearchResult';

const Search = ({ placeholder }) => {
    const [filteredData, setfilteredData] = useState([]);
    const [filteredDataSaved, setfilteredDataSaved] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const navigate = useNavigate();
    const menuRef = useRef();

    const handleFilter = (e) => {
        const searchWord = e.target.value;
        setWordEntered(searchWord);

        axios.get(process.env.REACT_APP_LOCAL + `search?q=${searchWord}`)
            .then((value) => {
                searchWord === "" ? setfilteredData([]) : addData(value.data.q);
            });
    }

    const addData = (toAdd) => {
        setfilteredData(toAdd);
        setfilteredDataSaved(toAdd);
    };

    const clearBtn = () => {
        setfilteredData([]);
        setWordEntered("");
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && filteredData[0] != null) {
            navigate("/stock", { state: { symbol: filteredData[0].symbol } })
            setfilteredData([]);
        }
    };

    const searchResultClicked = () => {
        setfilteredData([]);
    };

    useEffect(() => {
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setfilteredData([]);
            }
            else if (menuRef.current.contains(e.target) && wordEntered !== "") {
                setfilteredData(filteredDataSaved);
            }
        };

        document.addEventListener('mousedown', handler);

        return () => {
            document.removeEventListener('mousedown', handler);
        }
    });

    return (
        <div ref={menuRef} className="search">
            <div className="search-input">
                <input type="text" className="search_input" placeholder={placeholder} value={wordEntered} onChange={handleFilter} onKeyPress={handleKeyPress}></input>
                <div className="search-icon">
                    {wordEntered.length === 0 ?
                        <SearchIcon fontSize="small" />
                        :
                        <ClearIcon fontSize="small" id="clear-input-Btn" onClick={clearBtn} />
                    }
                </div>
            </div>
            {filteredData.length !== 0 && (
                <SearchResult data={filteredData} onClick={searchResultClicked} />
            )}
        </div>
    )
}

export default Search;
