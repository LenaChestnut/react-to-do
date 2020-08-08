import React, { Component, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Plus } from 'react-feather';
import { NewProjectForm } from './Form';
import ProjectList from './ProjectList';

// class MenuPanel extends Component {
// 	state = {
// 		isFormVisible: false,
// 	};

// 	toggleProjectForm = () => {
// 		this.setState((prevState) => {
// 			return {
// 				isFormVisible: !prevState.isFormVisible,
// 			};
// 		});
// 	};

// 	useEffect(() => {
// 		if (this.state.isFormVisible && !this.props.isMenuOpen) {

// 		}
// 	}, [this.props.isMenuOpen]);

// 	render() {
// 		// Change menu classes when the menu button in navbar is clicked
// 		let menuClasses = ['menu-panel'];
// 		if (this.props.isMenuOpen) {
// 			menuClasses = [...menuClasses, 'open'];
// 		}

// 		// Check if form should be open
// 		let projectForm;
// 		if (this.state.isFormVisible) {
// 			projectForm = (
// 				<NewProjectForm toggleProjectForm={this.toggleProjectForm} />
// 			);
// 		} else {
// 			projectForm = (
// 				<button
// 					className="new-project-btn"
// 					onClick={this.toggleProjectForm}
// 				>
// 					<Plus />
// 					<p>New project</p>
// 				</button>
// 			);
// 		}

// 		return (
// 			<div className={menuClasses.join(' ')}>
// 				<ul className="projects-container">
// 					<li className="project-card selected">
// 						<p>All tasks</p>
// 					</li>
// 					<ProjectList projects={this.props.projects} />
// 				</ul>
// 				{projectForm}
// 			</div>
// 		);
// 	}
// }

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
		projectForm = <NewProjectForm toggleProjectForm={toggleProjectForm} />;
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
				<li className="project-card selected">
					<p>All tasks</p>
				</li>
				<ProjectList projects={props.projects} />
			</ul>
			{projectForm}
		</div>
	);
}

MenuPanel.propTypes = {
	projects: PropTypes.array,
	isMenuOpen: PropTypes.bool,
};

export default MenuPanel;
