export default function isAuthenticated(state = "", action) {
    switch (action.type) {
        case "AUTHENTICATE":
            console.log(action);
            return action.payload;
        default:
            return state;
    }
}