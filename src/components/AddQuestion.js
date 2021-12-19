import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { handleNewQuestion } from '../actions/questions'
import { Form, Button } from 'react-bootstrap'

class AddQuestion extends Component {
	state = {
		optionOneText: '',
		optionTwoText: '',
		toHome: false
	};

	handleInputChange = (event, type) => {
		const value = event.target.value;

		this.setState((state) => {
			return type === 'option1' ? { ...state, optionOneText: value } : { ...state, optionTwoText: value }
		});
	}

	handleSubmit = (event) => {
		event.preventDefault();

		const { dispatch } = this.props
		const { optionOneText, optionTwoText } = this.state

		dispatch(handleNewQuestion(
			optionOneText,
			optionTwoText
		))

		this.setState({
			optionOneText: '',
			optionTwoText: '',
			toHome: true
		})
	}

	render() {
		const { toHome } = this.state;

		if (toHome) {
			//console.log('redirecting...')
			return <Redirect to='/Home' />
		}

		return (
			<div className="title-item new-question">
				<div className="title-header">Create New Question</div>

				<Form onSubmit={this.handleSubmit}>
					<Form.Group className="mb-3" controlId="formBasicEmail">
						<Form.Label>Would you rather...</Form.Label>
						<Form.Control name="optionOneText"
							type="text"
							placeholder="Enter Option One Text Here"
							value={this.state.optionOneText}
							onChange={(event) => this.handleInputChange(event, 'option1')} />

					</Form.Group>

					<Form.Group className="mb-3" controlId="formBasicPassword">
						<Form.Label>Or</Form.Label>
						<Form.Control name="optionTwoText"
							type="text"
							placeholder="Enter Option Two Text Here"
							value={this.state.optionTwoText}
							onChange={(event) => this.handleInputChange(event, 'option2')} />
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		)
	}
}

export default connect()(AddQuestion);