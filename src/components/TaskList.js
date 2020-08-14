import React from 'react';
import TaskItem from './TaskItem';
import { Plus } from 'react-feather';
import PropTypes from 'prop-types';

function TaskList(props) {
	// const taskItems = props.projects
	// 	.map((project) => {
	// 		return { ...project.tasks };
	// 	})
	// 	.reduce((accumulator, value) => accumulator.concat(value), []);

	const project = props.projects.filter((project) =>
		project.id === props.currentProject ? project : null
	)[0];

	const taskItems = project.tasks.map((task) => (
		<TaskItem key={task.id} task={task} projectTitle={project.title} />
	));

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
	currentProject: PropTypes.string,
	openNewTaskForm: PropTypes.func,
};

export default TaskList;
