import React from 'react';
import { parseISO } from 'date-fns';
import TaskItem from './TaskItem';
import { Plus } from 'react-feather';
import PropTypes from 'prop-types';

function TaskList(props) {
	const project = props.projects.filter((project) =>
		project.id === props.currentProject.id ? project : null
	)[0];

	const sortTasks = (tasks) => {
		return tasks
			.sort((task1, task2) => {
				if (JSON.parse(task1.priority) < JSON.parse(task2.priority)) {
					return 1;
				} else {
					return -1;
				}
			})
			.sort((task1, task2) => {
				if (parseISO(task1.dueDate) > parseISO(task2.dueDate)) {
					return 1;
				} else {
					return -1;
				}
			});
	};

	let taskItems;

	if (project.id === 'default') {
		const tasks = props.projects
			.map((project) => project.tasks)
			.reduce((acc, val) => acc.concat(val));

		const sortedTasks = sortTasks(tasks);

		taskItems = sortedTasks.map((task) => (
			<TaskItem
				key={task.id}
				task={task}
				projectTitle={task.project.title}
				deleteTask={props.deleteTask}
				currentProject={props.currentProject}
			/>
		));
	} else {
		const sortedTasks = sortTasks(project.tasks);

		taskItems = sortedTasks.map((task) => (
			<TaskItem
				key={task.id}
				task={task}
				projectTitle={task.project.title}
				deleteTask={props.deleteTask}
				currentProject={props.currentProject}
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
	deleteTask: PropTypes.func,
};

export default TaskList;
