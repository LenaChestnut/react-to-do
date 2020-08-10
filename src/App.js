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
		const updatedProjects = [...this.state.projects, project];
		this.setState((prevState) => {
			return {
				projects: [...prevState.projects, project],
			};
		});
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	openEditForm = (item) => {
		if (item.infoType === 'project') {
			this.setState({
				isEditingProject: true,
			});
		}
	};

	closeForm = () => {
		this.setState({
			isEditingProject: false,
		});
	};

	render() {
		return (
			<div className="App">
				{this.state.isEditingProject ? (
					<EditProjectForm closeForm={this.closeForm} />
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
