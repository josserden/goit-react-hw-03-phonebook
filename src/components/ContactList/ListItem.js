import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ name, number, onDelete }) => {
    return (
        <li className="ListItem">
            <p className="ListItem-text">
                {name}:<span>{number}</span>
            </p>

            <button className="Button" type="submit" onClick={onDelete}>
                Delete
            </button>
        </li>
    );
};

ListItem.propTypes = {
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
};

export default ListItem;
