import React from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash } from 'react-feather';

function ProjectItem(props) {
	function handleClick(e) {
		if (e.target.className === 'edit') {
			props.openEditForm(props.project);
		} else {
			const userConfirm = window.confirm(
				'This action cannot be canceled. Are you sure?'
			);
			if (userConfirm === true) {
				props.deleteProject(props.project);
			}
		}
	}

	return (
		<li className="project-card">
			<p>{props.project.title}</p>
			<button className="edit" onClick={handleClick}>
				<Edit />
			</button>
			<button className="remove" onClick={handleClick}>
				<Trash />
			</button>
		</li>
	);
}

ProjectItem.propTypes = {
	project: PropTypes.object,
	openEditForm: PropTypes.func,
	deleteProject: PropTypes.func,
};

export default ProjectItem;
