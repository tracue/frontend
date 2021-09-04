const initState = {
    isAuthenticate: 0
}

const rootReducer = (state = initState, action) => {
    if (action.type == 'AUTHENTICATE') {
        console.log(action);
        return {
            isAuthenticate: 1
        }
    } else if (action.type == 'DISAUTHENTICATE') {
        console.log(action);
        return {
            isAuthenticate: -1
        }
    }
    return state;
}

export default rootReducer;