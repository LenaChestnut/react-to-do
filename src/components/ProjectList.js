import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

function ProjectList(props) {
	const projectList = props.projects.map((item) => {
		return (
			<ProjectItem
				key={item.id}
				project={item}
				openEditForm={props.openEditForm}
				deleteProject={props.deleteProject}
				currentProject={props.currentProject}
				setCurrentProject={props.setCurrentProject}
			/>
		);
	});

	return <div>{projectList}</div>;
}

ProjectList.propTypes = {
	projects: PropTypes.array,
	currentProject: PropTypes.string,
	setCurrentProject: PropTypes.func,
	openEditForm: PropTypes.func,
	deleteProject: PropTypes.func,
};

export default ProjectList;
