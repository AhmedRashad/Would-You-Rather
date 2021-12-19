export const NEW_AUTHED_USER = 'NEW_AUTHED_USER'
export const RESET_AUTHED_USER = 'RESET_AUTHED_USER';

export function newAuthedUser(id) {
    return {
        type: NEW_AUTHED_USER,
        id,
    };
}

export function resetAuthedUser() {
    return {
        type: RESET_AUTHED_USER,
    };
}