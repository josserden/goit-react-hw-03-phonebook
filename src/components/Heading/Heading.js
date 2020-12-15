import React from 'react';
import PropTypes from 'prop-types';
import './Heading.css';

const Heading = ({ text }) => {
    return <h2 className="Heading">{text}</h2>;
};

Heading.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Heading;
