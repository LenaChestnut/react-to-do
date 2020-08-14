import React from 'react';
// import TaskItem from './TaskItem';
import { Plus } from 'react-feather';
import PropTypes from 'prop-types';

function TaskList(props) {
	// const taskItems = props.projects
	// 	.map((project) => {
	// 		return { ...project.tasks };
	// 	})
	// 	.reduce((accumulator, value) => accumulator.concat(value), []);

	return (
		<div className="task-list">
			{/* {taskItems.map((task) => (
				<TaskItem task={task} key={uuidv4()} />
			))} */}
			<button className="new-task-btn" onClick={props.openNewTaskForm}>
				<Plus />
				<p>New task</p>
			</button>
		</div>
	);
}

TaskList.propTypes = {
	projects: PropTypes.array,
	openNewTaskForm: PropTypes.func,
};

export default TaskList;
