import React from 'react';
import Navbar from './components/Navbar';
import MenuPanel from './components/MenuPanel';
import { EditProjectForm } from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import projects from './data/data';

class App extends React.Component {
	state = {
		projects: projects,
		isMenuOpen: false,
		isEditingProject: false,
		itemToEdit: {},
	};

	toggleMenu = () => {
		this.setState((prevState) => {
			return {
				isMenuOpen: !prevState.isMenuOpen,
			};
		});
	};

	addProject = (project) => {
		project.id = uuidv4();
		project.infoType = 'project';
		this.setState((prevState) => {
			return {
				projects: [...prevState.projects, project],
			};
		});
		localStorage.setItem(
			'projects',
			JSON.stringify([...this.state.projects, project])
		);
	};

	editProject = (editedProject) => {
		const updatedProjects = this.state.projects.map((project) => {
			if (project.id === editedProject.id) {
				return { ...project, title: editedProject.title };
			}
			return { ...project };
		});
		this.setState({
			projects: updatedProjects,
		});
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	openEditForm = (item) => {
		if (item.infoType === 'project') {
			this.setState({
				isEditingProject: true,
				itemToEdit: item,
			});
		}
	};

	closeForm = () => {
		this.setState({
			isEditingProject: false,
			itemToEdit: {},
		});
	};

	render() {
		return (
			<div className="App">
				{this.state.isEditingProject ? (
					<EditProjectForm
						closeForm={this.closeForm}
						editProject={this.editProject}
						project={this.state.itemToEdit}
					/>
				) : null}
				<Navbar toggleMenu={this.toggleMenu} />
				<MenuPanel
					projects={this.state.projects}
					isMenuOpen={this.state.isMenuOpen}
					addProject={this.addProject}
					openEditForm={this.openEditForm}
				/>
			</div>
		);
	}
}

export default App;
