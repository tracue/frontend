const initState = {
    isAuthenticate: false
}

const rootReducer = (state = initState, action) => {
    if (action.type == 'AUTHENTICATE') {
        return {
            isAuthenticate: true
        }
    } else if (action.type == 'DISAUTHENTICATE') {
        console.log(action);
        return {
            isAuthenticate: false
        }
    }
    return state;
}

export default rootReducer;