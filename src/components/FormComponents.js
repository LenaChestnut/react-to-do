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

export { SaveButton };
