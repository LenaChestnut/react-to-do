import React, { useState } from 'react';
import { ChevronDown, Check } from 'react-feather';

function TaskItem() {
	const [completed, setCompleted] = useState(false);
	const [hover, setHover] = useState(false);

	const handleClick = () => {
		setCompleted((completed) => !completed);
	};

	return (
		<div className="task-wrapper low-priority">
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
				<input type="checkbox" checked={completed}></input>
				<label
					onClick={handleClick}
					onMouseEnter={() => setHover(true)}
					onMouseLeave={() => setHover(false)}
				>
					{completed || hover ? <Check /> : null}
				</label>
			</div>
		</div>
	);
}

export default TaskItem;
