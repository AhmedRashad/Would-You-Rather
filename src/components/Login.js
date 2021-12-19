import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import { newAuthedUser, resetAuthedUser } from '../actions/authedUser';
import { FloatingLabel, Form, Button } from 'react-bootstrap'

class Login extends Component {
	state = {
		userId: null,
		toHome: false,
	}

	handleSelectionChanged = function (event) {
		const userId = event.target.value;

		this.setState(function (previousState) {
			return {
				...previousState,
				userId,
			};
		});
	}

	handleLogin = function (event) {
		const { userId } = this.state;
		const { dispatch } = this.props;

		dispatch(newAuthedUser(userId));

		this.setState(function (previousState) {
			return {
				...previousState,
				toHome: true,
			};
		});
	}

	componentDidMount() {
		this.props.dispatch(resetAuthedUser())
	}

	render() {
		const { userId, toHome } = this.state;
		const { users } = this.props;
		const { from } = this.props.location.state || { from: { pathname: '/Home' } }
		const selected = userId ? userId : -1


		if (toHome) {
			return <Redirect to={from} />
		}

		return (
			<div className='title-item login'>
				<div className="title-header"><div>Welcome To Would You Rather App</div></div>
				<div className='user-select'>

					<div>Please sign in </div>
					<FloatingLabel controlId="floatingSelect" label="Works with selects" >
						<Form.Select aria-label="Floating label select example" value={selected} onChange={(event) => this.handleSelectionChanged(event)}>
							<option value="-1" disabled>Open this select menu</option>
							{Object.keys(users).map(function (key) {
								return (
									<option value={users[key].id} key={key}>
										{users[key].name}
									</option>
								);
							})}

						</Form.Select>
					</FloatingLabel>

					<Button variant="primary" disabled={userId === null}
						onClick={(event) => this.handleLogin(event)}>
						Login
					</Button>
					{/* {redirect && <div>You must log in to view this page</div>} */}

				</div>


			</div>
		);
	}
}

function mapStateToProps({ users }) {
	return {
		users,
	};
}

export default withRouter(connect(mapStateToProps)(Login));