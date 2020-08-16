import React from 'react';
import Navbar from './components/Navbar';
import MenuPanel from './components/MenuPanel';
import TaskList from './components/TaskList';
import { EditProjectForm, NewTaskForm, EditTaskForm } from './components/Form';
import { v4 as uuidv4 } from 'uuid';
import projects from './data/data';

class App extends React.Component {
	state = {
		projects: projects,
		isMenuOpen: false,
		isEditingProject: false,
		isEditingTask: false,
		itemToEdit: {},
		isCreatingTask: false,
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

	getTaskIndex = (tasks, currentTask) => {
		return tasks.findIndex((task) => task.id === currentTask.id);
	};

	updateStorage = (data) => {
		this.setState({
			projects: data,
		});
		localStorage.setItem('projects', JSON.stringify(data));
	};

	// TASK CONTROL

	addTask = (task) => {
		task.id = task.id || uuidv4();
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
			if (this.getTaskIndex(project.tasks, deletedTask) !== -1) {
				const index = this.getTaskIndex(project.tasks, deletedTask);
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
		const updatedProjects = this.state.projects
			.map((project) => {
				if (this.getTaskIndex(project.tasks, editedTask) !== -1) {
					const index = this.getTaskIndex(project.tasks, editedTask);
					return {
						...project,
						tasks: [
							...project.tasks.slice(0, index),
							...project.tasks.slice(index + 1),
						],
					};
				}
				return project;
			})
			.map((project) => {
				if (project.id === editedTask.project.id) {
					return {
						...project,
						tasks: [...project.tasks, editedTask],
					};
				}
				return { ...project };
			});

		this.updateStorage(updatedProjects);
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
			isCreatingTask: true,
		});
	};

	openEditForm = (item) => {
		if (item.infoType === 'project') {
			this.setState({
				isEditingProject: true,
				itemToEdit: item,
			});
		} else if (item.infoType === 'task') {
			this.setState({
				isEditingTask: true,
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
				{this.state.isCreatingTask ? (
					<NewTaskForm
						projects={this.state.projects}
						currentProject={this.state.currentProject}
						closeForm={() => {
							this.closeForm('isCreatingTask');
						}}
						addTask={this.addTask}
					/>
				) : null}
				{this.state.isEditingTask ? (
					<EditTaskForm
						projects={this.state.projects}
						task={this.state.itemToEdit}
						currentProject={this.state.currentProject}
						closeForm={() => {
							this.closeForm('isEditingTask');
						}}
						editTask={this.editTask}
					/>
				) : null}
				<Navbar
					toggleMenu={this.toggleMenu}
					currentProject={this.state.currentProject}
					setCurrentProject={this.setCurrentProject}
				/>
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
					openEditForm={this.openEditForm}
					deleteTask={this.deleteTask}
				/>
			</div>
		);
	}
}

export default App;
