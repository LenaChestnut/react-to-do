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
			/>
		);
	});

	return <div>{projectList}</div>;
}

ProjectList.propTypes = {
	projects: PropTypes.array,
	openEditForm: PropTypes.func,
	deleteProject: PropTypes.func,
};

export default ProjectList;
