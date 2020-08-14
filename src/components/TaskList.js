import React from 'react';
import TaskItem from './TaskItem';
import { Plus } from 'react-feather';
import PropTypes from 'prop-types';

function TaskList(props) {
	const project = props.projects.filter((project) =>
		project.id === props.currentProject.id ? project : null
	)[0];

	let taskItems;

	if (project.id === 'default') {
		const tasks = props.projects
			.map((project) => project.tasks)
			.reduce((acc, val) => acc.concat(val));
		console.log(tasks);
		taskItems = tasks.map((task) => (
			<TaskItem
				key={task.id}
				task={task}
				projectTitle={task.project.title}
			/>
		));
	} else {
		taskItems = project.tasks.map((task) => (
			<TaskItem
				key={task.id}
				task={task}
				projectTitle={task.project.title}
			/>
		));
	}

	return (
		<ul className="task-list">
			{taskItems}
			<button className="new-task-btn" onClick={props.openNewTaskForm}>
				<Plus />
				<p>New task</p>
			</button>
		</ul>
	);
}

TaskList.propTypes = {
	projects: PropTypes.array,
	currentProject: PropTypes.object,
	openNewTaskForm: PropTypes.func,
};

export default TaskList;
