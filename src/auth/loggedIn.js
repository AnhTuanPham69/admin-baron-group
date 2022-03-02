export default function loggedIn() {
    const token = sessionStorage.getItem("__token__");
    const userToken = JSON.parse(token);
    if(!userToken) return false;
    return true;
  }