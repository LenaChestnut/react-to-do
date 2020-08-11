import React from 'react';
import { ChevronDown } from 'react-feather';

function TaskItem() {
	return (
		<div className="task-wrapper medium-priority">
			<div className="task-card">
				<button className="expand-btn">
					<ChevronDown />
				</button>
				<div>
					<p>Task text</p>
					<div className="task-info-container">
						<p className="task-info">Due: tomorrow</p>
					</div>
				</div>
				<input type="checkbox"></input>
				<label></label>
			</div>
		</div>
	);
}

export default TaskItem;
