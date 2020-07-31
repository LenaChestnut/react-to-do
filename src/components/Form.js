import React, { Component } from 'react';
import { Plus, X } from 'react-feather';

class NewProjectForm extends Component {
	state = {
		title: null,
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state);
	};

	render() {
		return (
			<form name="project-form" onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="project-name"
					id="title"
					placeholder="Project name"
					required
					onChange={this.handleChange}
				></input>
				<button type="submit" className="save" disabled>
					<Plus />
				</button>
				<button type="reset" className="cancel">
					<X />
				</button>
			</form>
		);
	}
}

export { NewProjectForm };
