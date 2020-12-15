import React from 'react';
import shortid from 'shortid';
import './Filter.css';

const filterIdInput = shortid.generate();

const Filter = ({ value, onFilterChange }) => {
    return (
        <div className="Filter">
            <label htmlFor={filterIdInput}>
                <p className="Filter-text">Find contacts by name</p>
                <input
                    id={filterIdInput}
                    className="Filter-input"
                    type="text"
                    value={value}
                    onChange={({ target: { value } }) => onFilterChange(value)}
                />
            </label>
        </div>
    );
};

export default Filter;
