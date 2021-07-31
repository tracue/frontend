export let isAuthenticated = false;
export const login = () => {
  isAuthenticated = true;
}
export const signOut = () => {
  isAuthenticated = false;
}