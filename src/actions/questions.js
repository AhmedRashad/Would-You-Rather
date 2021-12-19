import { saveQuestion, saveQuestionAnswer } from '../utils/api'

export const GET_QUESTIONS = 'GET_QUESTIONS'
export const NEW_QUESTION = 'NEW_QUESTION';
export const NEW_ANSWER = 'NEW_ANSWER'

export function getQuestions(questions) {
    return {
        type: GET_QUESTIONS,
        questions
    }
}

function newQuestion({ id, timestamp, author, optionOne, optionTwo }) {
    return {
        type: NEW_QUESTION,
        id,
        timestamp,
        author,
        optionOne,
        optionTwo
    }
}

export function handleNewQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {

        const { authedUser } = getState()

        const questionInfo = {
            optionOneText,
            optionTwoText,
            author: authedUser
        }



        return saveQuestion(questionInfo)
            .then((question) => {
                console.log('created QUESTION', question);
                dispatch(newQuestion(question))
            })
            .catch((error) => {
                console.log('problem in saving question.')
                alert('There was a problem creating new question. Try again ')
            })
    }
}

function newAnswer({ authedUser, qid, answer }) {
    return {
        type: NEW_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleNewAnswer(info) {
    return (dispatch) => {

        dispatch(newAnswer(info))
        return saveQuestionAnswer(info)
            .then(() => console.log('recorded answer'))
            .catch((error) => {
                console.log('There was a problem saving question.');
            })
    }
}