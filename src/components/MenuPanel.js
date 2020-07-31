import React from 'react';
import PropTypes from 'prop-types';
import { Edit, Trash, Plus } from 'react-feather';
// import { NewProjectForm } from './Form';

const MenuPanel = ({ projects }) => {
	const projectList = projects.map((project) => {
		return (
			<li className="project-card" key={project.id}>
				<p>{project.title}</p>
				<button className="edit">
					<Edit />
				</button>
				<button className="remove">
					<Trash />
				</button>
			</li>
		);
	});

	return (
		<div className="menu-panel">
			<ul className="projects-container">
				<li className="project-card selected">
					<p>All tasks</p>
				</li>
				{projectList}
			</ul>
			<button className="new-project-btn">
				<Plus />
				<p>New project</p>
			</button>
			{/* <NewProjectForm /> */}
		</div>
	);
};

MenuPanel.propTypes = {
	projects: PropTypes.array,
};

export default MenuPanel;
