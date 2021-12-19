import { NEW_AUTHED_USER, RESET_AUTHED_USER } from '../actions/authedUser'

export default function authedUser(state = null, action) {
    switch (action.type) {
        case NEW_AUTHED_USER:
            return action.id
        case RESET_AUTHED_USER:
            return null;
        default:
            return state;
    }
}