import React from 'react';
import PropTypes from 'prop-types';

function Backdrop(props) {
	return <div className="backdrop" onClick={props.closeForm}></div>;
}

Backdrop.propTypes = {
	closeForm: PropTypes.func,
};

export default Backdrop;
