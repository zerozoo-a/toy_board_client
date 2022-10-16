export function Logout() {
  localStorage.removeItem("at");
  return <div>You successfully Logged Out !</div>;
}
