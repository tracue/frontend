export default function authenticate(value) {
    return { type: "AUTHENTICATE", payload: value };
}