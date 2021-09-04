export default function isAuthenticated(state = false, action) {
    switch (action.type) {
        case "AUTHENTICATE":
            return action.payload;
        default:
            return state;
    }
}