import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { } from 'react-bootstrap/Button';

class Nav extends Component {
    render() {
        const { user, authedUser } = this.props
        const avatar = user ? user.avatarURL : 'placeholder.png'
        const name = user ? user.name : ''
        return (


            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/Home' exact >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' exact >
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderboard' exact >
                            Leader Board
                        </NavLink>
                    </li>
                    {
                        authedUser
                        && <li className="user-info">
                            <NavLink to='/' exact >
                                <div className="nav-user">
                                    <span>Hello {name}</span>
                                    <img
                                        src={avatar}
                                        alt={`Avatar of ${authedUser}`}
                                        className='nav-avatar'
                                    />
                                    <span>Logout</span>
                                </div>
                            </NavLink>
                        </li>
                    }
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ authedUser, users }, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(Nav)