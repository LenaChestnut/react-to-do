import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Backdrop from './Backdrop';
import { SaveButton, CancelButton } from './FormComponents';

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
				<SaveButton disabled={this.state.title ? false : true} />
				<CancelButton onClick={this.props.toggleProjectForm} />
			</form>
		);
	}
}

NewProjectForm.propTypes = {
	toggleProjectForm: PropTypes.func,
	addProject: PropTypes.func,
};

class EditProjectForm extends Component {
	state = {};

	render() {
		return (
			<div>
				<Backdrop />
				<form name="edit-project">
					<h2>Edit project</h2>
					<div>
						<input type="text" name="title"></input>
						<SaveButton
							disabled={this.state.title ? false : true}
						/>
						<CancelButton onClick={this.props.closeForm} />
					</div>
				</form>
			</div>
		);
	}
}

EditProjectForm.propTypes = {
	closeForm: PropTypes.func,
};

export { NewProjectForm, EditProjectForm };
