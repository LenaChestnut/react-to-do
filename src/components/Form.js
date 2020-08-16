import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import { SaveButton, CancelButton, TaskForm } from './FormComponents';

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
		const updatedTasks = project.tasks.map((task) => {
			return { ...task, project: { ...task.project, title: value } };
		});
		setProject({ ...project, title: value, tasks: updatedTasks });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.editProject(project);
		props.closeForm();
	};

	return (
		<div>
			<Backdrop closeForm={props.closeForm} />
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
	editTask: PropTypes.func,
	project: PropTypes.object,
};

function NewTaskForm(props) {
	return (
		<div>
			<Backdrop />
			<TaskForm
				props={{
					...props,
					formName: 'new-task',
					formHeader: 'New task',
				}}
			/>
		</div>
	);
}

function EditTaskForm(props) {
	return (
		<div>
			<Backdrop />
			<TaskForm props={{ ...props }} />
		</div>
	);
}

export { NewProjectForm, EditProjectForm, NewTaskForm, EditTaskForm };
