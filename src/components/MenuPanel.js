import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'react-feather';
import { NewProjectForm } from './Form';
import ProjectList from './ProjectList';

function MenuPanel(props) {
	const [isFormVisible, setVisibility] = useState(false);

	const toggleProjectForm = () => {
		setVisibility(!isFormVisible);
	};

	useEffect(() => {
		if (!props.isMenuOpen) {
			setVisibility(false);
		}
	}, [props.isMenuOpen]);

	// Change menu classes when the menu button in navbar is clicked
	let menuClasses = ['menu-panel'];
	if (props.isMenuOpen) {
		menuClasses = [...menuClasses, 'open'];
	}

	// Check if form should be open
	let projectForm;
	if (isFormVisible) {
		projectForm = (
			<NewProjectForm
				toggleProjectForm={toggleProjectForm}
				addProject={props.addProject}
			/>
		);
	} else {
		projectForm = (
			<button className="new-project-btn" onClick={toggleProjectForm}>
				<Plus />
				<p>New project</p>
			</button>
		);
	}

	return (
		<div className={menuClasses.join(' ')}>
			<ul className="projects-container">
				{/* <li className="project-card selected">
					<p>All tasks</p>
				</li> */}
				<ProjectList
					projects={props.projects}
					openEditForm={props.openEditForm}
					deleteProject={props.deleteProject}
				/>
			</ul>
			{projectForm}
		</div>
	);
}

MenuPanel.propTypes = {
	projects: PropTypes.array,
	isMenuOpen: PropTypes.bool,
	addProject: PropTypes.func,
	openEditForm: PropTypes.func,
	deleteProject: PropTypes.func,
};

export default MenuPanel;
