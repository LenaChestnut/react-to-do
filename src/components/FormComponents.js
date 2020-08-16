import React, { useState } from 'react';
import { format } from 'date-fns';
import { Plus, X } from 'react-feather';
import PropTypes from 'prop-types';

function SaveButton(props) {
	return (
		<button type="submit" className="save" disabled={props.disabled}>
			<Plus />
		</button>
	);
}

SaveButton.propTypes = {
	disabled: PropTypes.bool,
};

function CancelButton(props) {
	return (
		<button type="reset" className="cancel" onClick={props.onClick}>
			<X />
		</button>
	);
}

CancelButton.propTypes = {
	onClick: PropTypes.func,
};

function TaskForm(props) {
	const data = props.props;

	const taskDefault = data.task || {
		title: '',
		description: '',
		project: {
			id: data.currentProject.id,
			title: data.currentProject.title,
		},
		priority: '3',
		dueDate: format(Date.now(), 'yyyy-MM-dd'),
		infoType: 'task',
	};

	const [task, setTask] = useState(taskDefault);

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (name !== 'project') {
			setTask({ ...task, [name]: value });
		} else {
			const { id, title } = JSON.parse(value);
			setTask({ ...task, project: { id, title } });
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (data.formName === 'new-task') {
			data.addTask(task);
			data.closeForm();
		} else {
			data.editTask(task);
			data.closeForm();
		}
	};

	return (
		<form
			name={data.formName}
			className="task-form"
			onSubmit={handleSubmit}
		>
			<h2>{data.formHeader}</h2>
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
				value={JSON.stringify(task.project)}
				onChange={handleChange}
			>
				{data.projects.map((project) => {
					return (
						<option
							key={project.id}
							value={JSON.stringify({
								id: project.id,
								title: project.title,
							})}
						>
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
			<CancelButton onClick={data.closeForm} />
		</form>
	);
}

TaskForm.propTypes = {
	props: PropTypes.object,
};

export { SaveButton, CancelButton, TaskForm };
