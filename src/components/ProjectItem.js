import React from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash } from 'react-feather';

function ProjectItem(props) {
	return (
		<li className="project-card">
			<p>{props.project.title}</p>
			<button className="edit">
				<Edit />
			</button>
			<button className="remove">
				<Trash />
			</button>
		</li>
	);
}

ProjectItem.propTypes = {
	project: PropTypes.object,
};

export default ProjectItem;
