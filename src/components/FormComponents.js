import React from 'react';
import { Plus, X } from 'react-feather';
import PropTypes from 'prop-types';

function SaveButton(props) {
	return (
		<button type="submit" className="save" disabled={props.disabled}>
			<Plus />
		</button>
	);
}

SaveButton.propTypes = {
	disabled: PropTypes.bool,
};

function CancelButton(props) {
	return (
		<button type="reset" className="cancel" onClick={props.onClick}>
			<X />
		</button>
	);
}

CancelButton.propTypes = {
	onClick: PropTypes.func,
};

export { SaveButton, CancelButton };
