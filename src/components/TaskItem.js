import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Check } from 'react-feather';
import PropTypes from 'prop-types';

function TaskItem(props) {
	const [isCompleted, setIsCompleted] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);
	const [hover, setHover] = useState(false);

	const handleClick = () => {
		setIsCompleted((isCompleted) => !isCompleted);
	};

	return (
		<li className="task-wrapper low-priority">
			<div className="task-card">
				<button
					className="expand-btn"
					onClick={() => {
						setIsExpanded((isExpanded) => !isExpanded);
					}}
				>
					{isExpanded ? <ChevronUp /> : <ChevronDown />}
				</button>
				<div>
					<p>{props.task.title}</p>
					<div className="task-info-container">
						<p className="task-info">Due: {props.task.dueDate}</p>
					</div>
				</div>
				<input
					type="checkbox"
					checked={isCompleted}
					onChange={() => null}
				></input>
				<label
					onClick={handleClick}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					{isCompleted || hover ? <Check /> : null}
				</label>
			</div>
			{isExpanded ? (
				<div className="expanded-info-container">
					<p className="task-project-info">{props.projectTitle}</p>
					<p>{props.task.description}</p>
					<button className="edit">Edit task</button>
				</div>
			) : null}
		</li>
	);
}

TaskItem.propTypes = {
	task: PropTypes.object,
	projectTitle: PropTypes.string,
};

export default TaskItem;
