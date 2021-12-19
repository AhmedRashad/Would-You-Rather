import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Question from './Question'

class Home extends Component {
    state = {
        answered: false
    }
    filterQuestions = (answered) => {
        this.setState((state) => {
            return { answered: answered }
        })

    }
    render() {
        const { answered } = this.state;
        const { questions, authedUser } = this.props
        const questionsArray = Object.values(questions)
        const selectQuestions = questionsArray.filter(function (question) {
            const Content = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return answered ? Content : !Content;
        });
        const sortQuestions = selectQuestions.sort((a, b) => b.timestamp - a.timestamp);
        return (
            <div>
                <div className="button-group">
                    <button className={!answered ? 'button-selected' : 'button-default'} onClick={(e) => this.filterQuestions(false)}>Unanswered Questions</button>
                    <button className={answered ? 'button-selected' : 'button-default'} onClick={(e) => this.filterQuestions(true)}>Answered Questions</button>
                </div>

                <ul className="question-list">
                    {sortQuestions.map((question) => (
                        <li key={question.id}>
                            <Link to={`question/${question['id']}`}>
                                <Question id={question.id} />
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        authedUser,
        questions,
    }
}

export default connect(mapStateToProps)(Home);