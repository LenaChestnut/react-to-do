import React from 'react';
import TaskItem from './TaskItem';
import { Plus } from 'react-feather';

function TaskList(props) {
	return (
		<div className="task-list">
			<TaskItem />
			<button className="new-task-btn">
				<Plus />
				<p>New task</p>
			</button>
		</div>
	);
}

export default TaskList;
