import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import Backdrop from './Backdrop';
import { SaveButton, CancelButton } from './FormComponents';

class NewProjectForm extends Component {
	state = {
		title: '',
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addProject(this.state);
		this.setState({
			title: '',
		});
		this.props.toggleProjectForm();
	};

	render() {
		return (
			<form name="project-form" onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Project name"
					value={this.state.title}
					required
					onChange={this.handleChange}
				></input>
				<SaveButton disabled={this.state.title ? false : true} />
				<CancelButton onClick={this.props.toggleProjectForm} />
			</form>
		);
	}
}

NewProjectForm.propTypes = {
	toggleProjectForm: PropTypes.func,
	addProject: PropTypes.func,
};

function EditProjectForm(props) {
	const [project, setProject] = useState(props.project);

	const handleChange = (e) => {
		const { value } = e.target;
		setProject({ ...project, title: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.editProject(project);
		props.closeForm();
	};

	return (
		<div>
			<Backdrop />
			<form name="edit-project" onSubmit={handleSubmit}>
				<h2>Edit project</h2>
				<div>
					<input
						type="text"
						name="title"
						value={project.title}
						onChange={handleChange}
					></input>
					<SaveButton
						disabled={
							project.title === props.project.title ? true : false
						}
					/>
					<CancelButton onClick={props.closeForm} />
				</div>
			</form>
		</div>
	);
}

EditProjectForm.propTypes = {
	closeForm: PropTypes.func,
	editProject: PropTypes.func,
	project: PropTypes.object,
};

function NewTaskForm(props) {
	const [task, setTask] = useState({
		title: '',
		description: '',
		project: 'default',
		priority: '3',
		dueDate: format(Date.now(), 'yyyy-MM-dd'),
		infoType: 'task',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setTask({ ...task, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addTask(task);
		props.closeForm();
	};

	return (
		<div>
			<Backdrop />
			<form name="new-task" className="task-form" onSubmit={handleSubmit}>
				<h2>New task</h2>
				<input
					type="text"
					name="title"
					value={task.title}
					placeholder="Task title"
					required
					onChange={handleChange}
				></input>
				<textarea
					name="description"
					value={task.description}
					placeholder="Task description"
					required
					onChange={handleChange}
				></textarea>
				<p>Project</p>
				<select
					name="project"
					required
					value={task.project}
					onChange={handleChange}
				>
					{props.projects.map((project) => {
						return (
							<option key={project.id} value={project.id}>
								{project.title}
							</option>
						);
					})}
				</select>
				<p>Priority</p>
				<select
					name="priority"
					value={task.priority}
					required
					onChange={handleChange}
				>
					<option value="3">Low priority</option>
					<option value="2">Medium priority</option>
					<option value="1">High priority</option>
				</select>
				<input
					type="date"
					name="dueDate"
					min={format(Date.now(), 'yyyy-MM-dd')}
					value={task.dueDate}
					required
					onChange={handleChange}
				></input>
				<SaveButton />
				<CancelButton onClick={props.closeForm} />
			</form>
		</div>
	);
}

NewTaskForm.propTypes = {
	closeForm: PropTypes.func,
	projects: PropTypes.array,
	addTask: PropTypes.func,
};

export { NewProjectForm, EditProjectForm, NewTaskForm };
