import React from 'react';
import Navbar from './components/Navbar';
import MenuPanel from './components/MenuPanel';
import { v4 as uuidv4 } from 'uuid';
import projects from './data/data';

class App extends React.Component {
	state = {
		projects: projects,
		isMenuOpen: false,
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
		const updatedProjects = [...this.state.projects, project];
		this.setState((prevState) => {
			return {
				projects: [...prevState.projects, project],
			};
		});
		localStorage.setItem('projects', JSON.stringify(updatedProjects));
	};

	render() {
		return (
			<div className="App">
				<Navbar toggleMenu={this.toggleMenu} />
				<MenuPanel
					projects={this.state.projects}
					isMenuOpen={this.state.isMenuOpen}
					addProject={this.addProject}
				/>
			</div>
		);
	}
}

export default App;
