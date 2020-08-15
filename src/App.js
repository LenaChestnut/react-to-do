import React from 'react';
import Navbar from './components/Navbar';
import MenuPanel from './components/MenuPanel';
import TaskList from './components/TaskList';
import { EditProjectForm, NewTaskForm } from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import projects from './data/data';

class App extends React.Component {
	state = {
		projects: projects,
		isMenuOpen: false,
		isEditingProject: false,
		itemToEdit: {},
		isTaskFormOpen: false,
		currentProject: { id: 'default', title: 'All tasks' },
	};

	toggleMenu = () => {
		this.setState((prevState) => {
			return {
				isMenuOpen: !prevState.isMenuOpen,
			};
		});
	};

	setCurrentProject = (projectId, projectTitle) => {
		this.setState({
			currentProject: { id: projectId, title: projectTitle },
		});
	};

	updateStorage = (data) => {
		this.setState({
			projects: data,
		});
		localStorage.setItem('projects', JSON.stringify(data));
	};

	// TASK CONTROL

	addTask = (task) => {
		task.id = uuidv4();
		const updatedProjects = this.state.projects.map((project) => {
			if (project.id === task.project.id) {
				return { ...project, tasks: [...project.tasks, task] };
			}
			return { ...project };
		});

		this.updateStorage(updatedProjects);
	};

	deleteTask = (deletedTask) => {
		const updatedProjects = this.state.projects.map((project) => {
			if (project.id === deletedTask.project.id) {
				const index = project.tasks.indexOf(deletedTask);
				return {
					...project,
					tasks: [
						...project.tasks.slice(0, index),
						...project.tasks.slice(index + 1),
					],
				};
			}
			return project;
		});
		this.updateStorage(updatedProjects);
	};

	editTask = (editedTask) => {
		console.log(editedTask);
	};

	// PROJECT CONTROL
	addProject = (project) => {
		project.id = uuidv4();
		project.infoType = 'project';
		project.tasks = [];
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
		// editedProject.tasks.forEach((task) => this.editTask(task));
		const updatedProjects = this.state.projects.map((project) => {
			if (project.id === editedProject.id) {
				return {
					...project,
					title: editedProject.title,
					tasks: editedProject.tasks,
				};
			}
			return { ...project };
		});

		this.updateStorage(updatedProjects);
	};

	deleteProject = (deletedProject) => {
		if (deletedProject.id === this.state.currentProject.id) {
			this.setState({
				currentProject: { id: 'default', title: 'All tasks' },
			});
		}
		const updatedProjects = this.state.projects.filter((project) => {
			if (project.id !== deletedProject.id) {
				return { ...project };
			}
			return null;
		});

		this.updateStorage(updatedProjects);
	};

	// FORMS
	openNewTaskForm = () => {
		this.setState({
			isTaskFormOpen: true,
		});
	};

	openEditForm = (item) => {
		if (item.infoType === 'project') {
			this.setState({
				isEditingProject: true,
				itemToEdit: item,
			});
		}
	};

	closeForm = (formState) => {
		this.setState({
			[formState]: false,
			itemToEdit: {},
		});
	};

	render() {
		return (
			<div className="App">
				{this.state.isEditingProject ? (
					<EditProjectForm
						project={this.state.itemToEdit}
						closeForm={() => {
							this.closeForm('isEditingProject');
						}}
						editProject={this.editProject}
						editTask={this.editTask}
					/>
				) : null}
				{this.state.isTaskFormOpen ? (
					<NewTaskForm
						projects={this.state.projects}
						currentProject={this.state.currentProject}
						closeForm={() => {
							this.closeForm('isTaskFormOpen');
						}}
						addTask={this.addTask}
					/>
				) : null}
				<Navbar toggleMenu={this.toggleMenu} />
				<div
					className={
						this.state.isMenuOpen
							? 'underlayer widened'
							: 'underlayer'
					}
				></div>
				<MenuPanel
					projects={this.state.projects}
					currentProject={this.state.currentProject}
					setCurrentProject={this.setCurrentProject}
					isMenuOpen={this.state.isMenuOpen}
					addProject={this.addProject}
					openEditForm={this.openEditForm}
					deleteProject={this.deleteProject}
				/>
				<TaskList
					projects={this.state.projects}
					currentProject={this.state.currentProject}
					openNewTaskForm={this.openNewTaskForm}
					deleteTask={this.deleteTask}
				/>
			</div>
		);
	}
}

export default App;
