import React from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash } from 'react-feather';

function ProjectItem(props) {
	function handleClick(e) {
		e.stopPropagation();
		if (e.target.className === 'edit') {
			props.openEditForm(props.project);
		} else if (e.target.className === 'remove') {
			const userConfirm = window.confirm(
				'This action cannot be canceled. Are you sure?'
			);
			if (userConfirm === true) {
				props.deleteProject(props.project);
			}
		}
	}

	return (
		<li
			className={
				props.currentProject.id === props.project.id
					? 'project-card selected'
					: 'project-card'
			}
			onClick={() =>
				props.setCurrentProject(props.project.id, props.project.title)
			}
		>
			<p>{props.project.title}</p>
			{props.project.id !== 'default' ? (
				<div>
					<button className="edit" onClick={handleClick}>
						<Edit />
					</button>
					<button className="remove" onClick={handleClick}>
						<Trash />
					</button>
				</div>
			) : null}
		</li>
	);
}

ProjectItem.propTypes = {
	project: PropTypes.object,
	currentProject: PropTypes.object,
	setCurrentProject: PropTypes.func,
	openEditForm: PropTypes.func,
	deleteProject: PropTypes.func,
};

export default ProjectItem;
