import React from 'react';
import PropTypes from 'prop-types';
import ProjectItem from './ProjectItem';

function ProjectList(props) {
	const projectList = props.projects.map((item) => {
		return (
			<ProjectItem
				key={item.id}
				project={item}
				editProject={props.editProject}
			/>
		);
	});

	return <div>{projectList}</div>;
}

ProjectList.propTypes = {
	projects: PropTypes.array,
	editProject: PropTypes.func,
};

export default ProjectList;
