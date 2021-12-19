import { getQuestions, } from './questions'
import { getUsers } from './users'
import { getInitialData } from '../utils/api';

export function handleInitialData() {
    return (dispatch) => {
        return getInitialData()
            .then(({ questions, users }) => {
                dispatch(getQuestions(questions))
                dispatch(getUsers(users))
            })
    }
}