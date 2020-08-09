import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Plus, X } from 'react-feather';

class NewProjectForm extends Component {
	state = {
		title: '',
	};

	handleChange = (e) => {
		const { name, value } = e.target;
		this.setState({
			[name]: value,
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.addProject(this.state);
		this.setState({
			title: '',
		});
	};

	render() {
		return (
			<form name="project-form" onSubmit={this.handleSubmit}>
				<input
					type="text"
					name="title"
					placeholder="Project name"
					value={this.state.title}
					required
					onChange={this.handleChange}
				></input>
				<button
					type="submit"
					className="save"
					disabled={this.state.title ? false : true}
				>
					<Plus />
				</button>
				<button
					type="reset"
					className="cancel"
					onClick={this.props.toggleProjectForm}
				>
					<X />
				</button>
			</form>
		);
	}
}

NewProjectForm.propTypes = {
	toggleProjectForm: PropTypes.func,
	addProject: PropTypes.func,
};

export { NewProjectForm };
